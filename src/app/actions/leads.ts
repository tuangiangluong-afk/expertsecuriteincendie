"use server";

import { createSupabaseAdmin, createSupabaseServerClient } from "@/lib/supabase-server";
import { Resend } from "resend";
import { Database } from "@/types/database.types";
import { PartnerCompanyInfo, PartnerTransaction, PartnerWithMeta } from "@/types/partners";
import { revalidatePath } from "next/cache";

async function requireAuth() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    return user;
}

export async function updateLeadStatus(leadId: string, status: string) {
    await requireAuth();
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
        .from("leads")
        .update({ status })
        .eq("id", leadId)
        .select();

    if (error) {
        console.error("Error updating lead status:", error);
        throw new Error(error.message);
    }

    revalidatePath("/admin/leads");
    return data;
}

export async function updateLeadDetails(leadId: string, updates: { notes?: string, price?: number, status?: string, is_paid?: boolean }) {
    await requireAuth();
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
        .from("leads")
        .update(updates)
        .eq("id", leadId)
        .select();

    if (error) {
        console.error("Error updating lead details:", error);
        throw new Error(error.message);
    }

    revalidatePath("/admin/leads");
    return data;
}

export async function getLeadAssignments(leadId: string) {
    await requireAuth();
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
        .from("lead_assignments")
        .select(`
            *,
            partners (
                name,
                email
            )
        `)
        .eq("lead_id", leadId)
        .order("assigned_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
}

export async function verifyPartnerEmail(email: string) {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
        .from("partners")
        .select("id, name, email")
        .eq("email", email)
        .single();

    if (error || !data) return null;
    return data;
}

export interface AssignLeadOptions {
    isFree?: boolean;
    priceEur?: number;
    sendEmail?: boolean;
    notes?: string;
}

export async function assignLeadToPartnersAdmin(
    leadId: string,
    partnerIds: string[],
    options?: AssignLeadOptions
) {
    await requireAuth();
    const supabase = createSupabaseAdmin();

    if (!leadId || !partnerIds?.length) {
        throw new Error("Veuillez sélectionner au moins un partenaire.");
    }

    const isFree = Boolean(options?.isFree);
    const sendEmail = options?.sendEmail !== false;

    // 1. Fetch Lead
    const { data: lead, error: leadError } = await supabase
        .from("leads")
        .select("*")
        .eq("id", leadId)
        .single();

    if (leadError || !lead) throw new Error("Lead introuvable");

    // 2. Fetch Partners
    const { data: partnersData, error: partnersError } = await supabase
        .from("partners")
        .select("*")
        .in("id", partnerIds);

    if (partnersError || !partnersData || !partnersData.length) {
        throw new Error("Partenaires introuvables");
    }

    const partners = partnersData as PartnerWithMeta[];

    // Parse lead metadata
    let meta: Record<string, any> = {};
    try {
        if (lead.message) meta = JSON.parse(lead.message);
    } catch { }

    // 3. Solvency Check if not free
    if (!isFree) {
        for (const partner of partners) {
            const pMeta: PartnerCompanyInfo = typeof partner.company_info === "string"
                ? JSON.parse(partner.company_info)
                : (partner.company_info || {});

            const priceEur = typeof options?.priceEur === "number"
                ? options.priceEur
                : (pMeta.price_per_lead || 45);

            const balance = Number(pMeta.balance || 0);

            if (balance < priceEur) {
                throw new Error(
                    `Solde insuffisant pour ${partner.name} : solde actuel ${balance.toFixed(2)} € HT, requis ${priceEur.toFixed(2)} € HT. Veuillez d'abord créditer son compte.`
                );
            }
        }
    }

    const successPartners: string[] = [];

    // 4. Assign & Debit each partner
    for (const partner of partners) {
        const pMeta: PartnerCompanyInfo = typeof partner.company_info === "string"
            ? JSON.parse(partner.company_info)
            : (partner.company_info || {});

        const priceEur = isFree
            ? 0
            : (typeof options?.priceEur === "number" ? options.priceEur : (pMeta.price_per_lead || 45));

        // A. Insert Assignment
        const { error: assignError } = await supabase
            .from("lead_assignments")
            .insert({
                lead_id: leadId,
                partner_id: partner.id,
                status: isFree ? "sent_free" : `sent_billed_${priceEur}`
            });

        if (assignError) {
            console.error(`Erreur insertion attribution pour ${partner.name}:`, assignError);
        }

        // B. Debit Wallet & Record Transaction
        if (!isFree && priceEur > 0) {
            const currentBal = Number(pMeta.balance || 0);
            const newBal = currentBal - priceEur;

            const tx: PartnerTransaction = {
                id: crypto.randomUUID(),
                date: new Date().toISOString(),
                type: "dispatch_fee",
                amount: -priceEur,
                lead_id: leadId,
                description: `Attribution lead ${lead.company || lead.name || "Dossier"} (${lead.city || lead.postal_code || ""})`
            };

            const transactions = pMeta.transactions || [];
            transactions.unshift(tx);

            const updatedCompanyInfo: PartnerCompanyInfo = {
                ...pMeta,
                balance: newBal,
                transactions
            };

            await supabase
                .from("partners")
                .update({ company_info: updatedCompanyInfo as any })
                .eq("id", partner.id);
        }

        // C. Send Rich B2B Fire Safety Email via Resend
        if (sendEmail && partner.email) {
            try {
                await sendPartnerLeadFireSafetyEmail({
                    lead,
                    meta,
                    partner,
                    priceEur,
                    isFree,
                    adminNotes: options?.notes
                });
            } catch (mailErr) {
                console.error(`⚠️ Erreur envoi email partenaire ${partner.email}:`, mailErr);
            }
        }

        successPartners.push(partner.name);
    }

    // 5. Update Lead Status
    const finalPrice = isFree ? 0 : (typeof options?.priceEur === "number" ? options.priceEur : 45);
    await supabase
        .from("leads")
        .update({
            status: "sold",
            price: finalPrice,
            is_paid: true,
            notes: options?.notes ? options.notes.trim() : (lead.notes || `Attribué à ${successPartners.join(", ")}`)
        })
        .eq("id", lead.id);

    revalidatePath("/admin/leads");
    revalidatePath("/admin/partners");
    revalidatePath("/admin");

    return {
        success: true,
        message: `Lead transmis avec succès à ${successPartners.join(", ")} (${isFree ? "Offert" : `${finalPrice.toFixed(2)} € HT`}) !`
    };
}

export async function sendPartnerLeadFireSafetyEmail({
    lead,
    meta,
    partner,
    priceEur,
    isFree,
    adminNotes
}: {
    lead: any;
    meta: any;
    partner: PartnerWithMeta;
    priceEur: number;
    isFree: boolean;
    adminNotes?: string;
}) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.warn("⚠️ RESEND_API_KEY manquante");
        return;
    }

    const resend = new Resend(apiKey);
    const subject = isFree
        ? `🎁 Fiche prospect offerte — ${lead.city || "Votre secteur"} (${lead.company || lead.name || "Nouveau projet"})`
        : `🚨 Fiche Dossier Sécurité Incendie — ${lead.city || "Votre secteur"} (${lead.company || lead.name || "Nouveau projet"})`;

    const projectLabels: Record<string, string> = {
        conformite: "Mise en conformité globale (extincteurs, alarme, plans)",
        maintenance: "Maintenance annuelle extincteurs & parcs",
        commission_erp: "Passage Commission de Sécurité ERP",
        q18: "Contrôle réglementaire Q18 / Électricité & Incendie",
        ssi_triennale: "Visite triennale SSI / Alarme incendie"
    };

    const needLabel = (meta.needType && projectLabels[meta.needType]) || meta.needType || "Mise en conformité incendie";
    const surfaceLabel = meta.surface ? (meta.surface === "moins_50" ? "< 50 m²" : meta.surface === "50_200" ? "50 à 200 m²" : "> 200 m²") : "Non précisée";

    const cleanPhone = (lead.phone || "").replace(/\s+/g, "");

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6; margin: 0; padding: 0; background-color: #f8fafc; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #dc2626; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #ffffff; }
    .header p { margin: 0; font-size: 13px; opacity: 0.95; }
    .content { padding: 24px; }
    .lead-box { background: #fef2f2; border: 1.5px solid #dc2626; border-radius: 10px; padding: 18px; margin: 20px 0; }
    .lead-title { color: #b91c1c; font-weight: 700; font-size: 13px; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em; }
    .lead-table { width: 100%; border-collapse: collapse; font-size: 14px; }
    .lead-table td { padding: 6px 0; vertical-align: top; }
    .lead-label { color: #64748b; width: 140px; font-weight: 500; }
    .lead-value { color: #0f172a; font-weight: 600; }
    .cta-btn { display: inline-block; background: #dc2626; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 15px; margin: 15px 0; text-align: center; }
    .notes-box { background: #f8fafc; border-left: 4px solid #475569; border-radius: 4px; padding: 12px 16px; margin: 18px 0; font-size: 13.5px; color: #334155; }
    .footer { background: #f1f5f9; padding: 16px 24px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Expert Sécurité Incendie · Transmission de Dossier</h1>
      <p>Demande directe transmise à ${partner.name}</p>
    </div>
    
    <div class="content">
      <p>Bonjour ${partner.name},</p>
      
      <p>Nous vous transmettons ci-dessous les coordonnées directes du gérant d'établissement qui a soumis une demande sur notre portail pour votre secteur (${lead.city || "Secteur"}):</p>
      
      <div class="lead-box">
        <div class="lead-title">${isFree ? "🎁 Fiche Prospect Offerte" : "🚨 Dossier Incendie Qualifié"}</div>
        <table class="lead-table">
          <tr>
            <td class="lead-label">Société / Établissement :</td>
            <td class="lead-value" style="font-size: 16px; color: #dc2626;">${lead.company || lead.name || "Établissement commercial"}</td>
          </tr>
          <tr>
            <td class="lead-label">Contact / Gérant :</td>
            <td class="lead-value">${lead.name || "Gérant"}</td>
          </tr>
          <tr>
            <td class="lead-label">Téléphone direct :</td>
            <td class="lead-value"><a href="tel:${cleanPhone}" style="color: #dc2626; text-decoration: none; font-weight: 700; font-size: 16px;">${lead.phone}</a></td>
          </tr>
          <tr>
            <td class="lead-label">Email :</td>
            <td class="lead-value"><a href="mailto:${lead.email}" style="color: #2563eb; text-decoration: none;">${lead.email}</a></td>
          </tr>
          <tr>
            <td class="lead-label">Localisation :</td>
            <td class="lead-value">${lead.city || ""} ${lead.postal_code ? `(${lead.postal_code})` : ""}</td>
          </tr>
          <tr>
            <td class="lead-label">Nature du projet :</td>
            <td class="lead-value">${needLabel}</td>
          </tr>
          <tr>
            <td class="lead-label">Surface estimée :</td>
            <td class="lead-value">${surfaceLabel}</td>
          </tr>
          <tr>
            <td class="lead-label">Facturation :</td>
            <td class="lead-value">${isFree ? "Offert gracieusement (0,00 €)" : `${priceEur.toFixed(2)} € HT (déduit de votre solde)`}</td>
          </tr>
        </table>
      </div>

      ${adminNotes ? `<div class="notes-box"><strong>Note d'accompagnement :</strong><br>${adminNotes}</div>` : ""}

      <div style="text-align: center; margin: 24px 0;">
        <a href="tel:${cleanPhone}" class="cta-btn">📞 Appeler le gérant dès maintenant</a>
      </div>

      <p style="font-size: 13.5px; color: #475569;">
        Nous vous invitons à contacter ce responsable sous 24h à 48h pour convenir d'un rendez-vous sur place ou lui établir votre chiffrage.
      </p>
    </div>

    <div class="footer">
      Expert Sécurité Incendie · Plateforme nationale de mise en relation B2B pour la conformité ERP/ERT.<br>
      <a href="https://www.expertsecuriteincendie.fr" style="color: #dc2626; text-decoration: none;">expertsecuriteincendie.fr</a>
    </div>
  </div>
</body>
</html>`;

    await resend.emails.send({
        from: "Marc - Expert Sécurité Incendie <hello@expertsecuriteincendie.fr>",
        to: [partner.email],
        replyTo: "hello@expertsecuriteincendie.fr",
        bcc: ["hello@expertsecuriteincendie.fr"],
        subject,
        html
    });
}

/**
 * AUTO-DISPATCH ENGINE
 * Scanne les partenaires éligibles au dépôt d'un lead et déclenche l'attribution automatique si solde ok
 */
export async function autoDispatchLeadIfNeeded(lead: any) {
    const supabase = createSupabaseAdmin();
    const dept = lead.department || (lead.postal_code ? lead.postal_code.substring(0, 2) : null);
    const region = lead.region;

    // Fetch all active partners
    const { data: partnersData } = await supabase
        .from("partners")
        .select("*");

    if (!partnersData || !partnersData.length) return null;

    const partners = partnersData as PartnerWithMeta[];

    // Filter partners that have auto_dispatch enabled and cover this dept or region
    const eligiblePartners = partners.filter(p => {
        const meta: PartnerCompanyInfo = typeof p.company_info === "string"
            ? JSON.parse(p.company_info)
            : (p.company_info || {});

        if (!meta.auto_dispatch) return false;

        const price = meta.price_per_lead || 45;
        const balance = meta.balance || 0;
        if (balance < price) return false;

        const depts = p.managed_departments || [];
        const regions = p.managed_regions || [];

        const matchesDept = dept && depts.includes(dept);
        const matchesRegion = (region && regions.includes(region)) || regions.includes("National");

        return matchesDept || matchesRegion;
    });

    if (!eligiblePartners.length) return null;

    // Sort: priority to is_default === true, then highest balance
    eligiblePartners.sort((a, b) => {
        const aMeta: PartnerCompanyInfo = typeof a.company_info === "string" ? JSON.parse(a.company_info) : (a.company_info || {});
        const bMeta: PartnerCompanyInfo = typeof b.company_info === "string" ? JSON.parse(b.company_info) : (b.company_info || {});

        if (aMeta.is_default && !bMeta.is_default) return -1;
        if (!aMeta.is_default && bMeta.is_default) return 1;
        return (bMeta.balance || 0) - (aMeta.balance || 0);
    });

    const targetPartner = eligiblePartners[0];
    const targetMeta: PartnerCompanyInfo = typeof targetPartner.company_info === "string"
        ? JSON.parse(targetPartner.company_info)
        : (targetPartner.company_info || {});

    const priceEur = targetMeta.price_per_lead || 45;
    const currentBal = Number(targetMeta.balance || 0);
    const newBal = currentBal - priceEur;

    // 1. Insert assignment
    await supabase.from("lead_assignments").insert({
        lead_id: lead.id,
        partner_id: targetPartner.id,
        status: `auto_dispatched_${priceEur}`
    });

    // 2. Debit wallet
    const tx: PartnerTransaction = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        type: "dispatch_fee",
        amount: -priceEur,
        lead_id: lead.id,
        description: `Auto-dispatch lead ${lead.company || lead.name || ""} (${lead.city || ""})`
    };

    const transactions = targetMeta.transactions || [];
    transactions.unshift(tx);

    await supabase.from("partners").update({
        company_info: {
            ...targetMeta,
            balance: newBal,
            transactions
        } as any
    }).eq("id", targetPartner.id);

    // 3. Update lead
    await supabase.from("leads").update({
        status: "sold",
        price: priceEur,
        is_paid: true,
        notes: `Auto-dispatché à ${targetPartner.name} (${priceEur} € HT)`
    }).eq("id", lead.id);

    // 4. Send email
    let meta: Record<string, any> = {};
    try {
        if (lead.message) meta = JSON.parse(lead.message);
    } catch { }

    await sendPartnerLeadFireSafetyEmail({
        lead,
        meta,
        partner: targetPartner,
        priceEur,
        isFree: false,
        adminNotes: "Demande transmise automatiquement selon votre paramétrage auto-dispatch."
    });

    console.log(`⚡ [AutoDispatch] Lead ${lead.id} auto-attribué avec succès à ${targetPartner.name} (${priceEur} € HT)`);
    return targetPartner;
}

// Backward compatibility wrapper
export async function assignLeadToPartners(leadId: string, partnerIds: string[]) {
    return assignLeadToPartnersAdmin(leadId, partnerIds, { isFree: false });
}

export async function deliverUnlockedLead(leadId: string, partnerId: string) {
    const supabase = createSupabaseAdmin();
    const [leadRes, partnerRes] = await Promise.all([
        supabase.from("leads").select("*").eq("id", leadId).single(),
        supabase.from("partners").select("*").eq("id", partnerId).single()
    ]);

    if (!leadRes.data || !partnerRes.data) return { success: false };

    let meta: any = {};
    try {
        if (leadRes.data.message) meta = JSON.parse(leadRes.data.message);
    } catch { }

    await sendPartnerLeadFireSafetyEmail({
        lead: leadRes.data,
        meta,
        partner: partnerRes.data as PartnerWithMeta,
        priceEur: 45,
        isFree: false,
        adminNotes: "Lead débloqué via paiement en ligne."
    });

    return { success: true };
}
