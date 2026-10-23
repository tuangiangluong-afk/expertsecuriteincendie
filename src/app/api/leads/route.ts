import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createSupabaseAdmin } from '@/lib/supabase-server';
import { getSiteConfig } from '@/lib/sites-config';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        console.log("📥 [API/LEADS] Received B2B Fire Safety Lead:", body);
        const {
            name, email, phone, city, zipCode, domain,
            projectType, needType, surface, company, leadScore,
            establishmentType, timeline, niche, attribution
        } = body;

        const leadAttribution = attribution && typeof attribution === 'object' ? attribution : {
            source: 'seo-reglementaire',
            medium: 'organic',
            campaign: '',
            term: '',
            content: '',
            landing_page: null,
            referrer: null,
        };
        const attributionLabel = `${leadAttribution.source || 'direct'} / ${leadAttribution.medium || 'unknown'}${leadAttribution.campaign ? ` / ${leadAttribution.campaign}` : ''}`;

        // Validation basique
        if (!name || !email || !phone || !projectType) {
            return NextResponse.json(
                { error: 'Champs obligatoires manquants' },
                { status: 400 }
            );
        }

        // Arbitrage Logic
        const isTier1 = 
            surface === 'plus_200' || 
            needType === 'conformite' || 
            projectType === 'copro' || 
            (leadScore && leadScore >= 80) ||
            projectType === 'erp' ||
            needType === 'ssi_triennale' ||
            needType === 'commission_erp';

        const apiKey = process.env.RESEND_API_KEY;
        const resend = apiKey ? new Resend(apiKey) : null;
        const SENDER_EMAIL = 'Expert Sécurité Incendie <hello@expertsecuriteincendie.fr>';
        const FALLBACK_SENDER = 'Expert Sécurité Incendie <hello@expertbornerecharge.com>';

        async function sendSafeEmail(options: { to: string[]; subject: string; html: string; replyTo?: string }) {
            if (!resend) return;
            const res = await resend.emails.send({
                from: SENDER_EMAIL,
                to: options.to,
                replyTo: options.replyTo,
                subject: options.subject,
                html: options.html,
            });
            if (res.error) {
                console.warn("⚠️ [Resend Incendie] Primary sender error, retrying fallback:", res.error);
                await resend.emails.send({
                    from: FALLBACK_SENDER,
                    to: options.to,
                    replyTo: options.replyTo,
                    subject: options.subject,
                    html: options.html,
                });
            }
        }

        try {
        if (isTier1) {
            console.log("💎 [ARBITRAGE] TIER 1 DETECTED -> Envoi direct partenaire national (Extincteurs / Desautel)");
            
            await sendSafeEmail({
                to: ['hello@expertsecuriteincendie.fr'],
                subject: `🚨 [TIER 1] Nouveau Lead Incendie B2B - ${city}`,
                html: `
                        <div style="background-color: #fef2f2; border: 2px solid #ef4444; padding: 20px; border-radius: 12px; font-family: sans-serif;">
                            <h2 style="color: #991b1b; margin-top: 0;">🔥 LEAD B2B PREMIUM (TIER 1)</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Type</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #fee2e2;">${projectType}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Besoin</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #fee2e2;">${needType}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Surface</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #fee2e2;">${surface || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Établissement</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #fee2e2;">${establishmentType || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Échéance</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #fee2e2;">${timeline || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Contact</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #fee2e2;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Société / Copro</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #fee2e2;">${company || 'Non renseigné'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Email</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #fee2e2;">${email}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Téléphone</td>
                                    <td style="padding: 8px 0; font-size: 18px; color: #dc2626; border-bottom: 1px solid #fee2e2;">${phone}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">Code Postal</td>
                                    <td style="padding: 8px 0;">${zipCode} (${city})</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">Attribution</td>
                                    <td style="padding: 8px 0;">${attributionLabel} — ${leadAttribution.landing_page || 'page inconnue'}</td>
                                </tr>
                            </table>
                        </div>
                    `,
            });
        } else {
            console.log("🗑️ [ARBITRAGE] TIER 2 DETECTED -> Notification email + API");
            await sendSafeEmail({
                to: ['hello@expertsecuriteincendie.fr'],
                subject: `🚨 [TIER 2] Nouveau Lead Incendie - ${city}`,
                html: `
                    <div style="background-color: #f8fafc; border: 2px solid #64748b; padding: 20px; border-radius: 12px; font-family: sans-serif;">
                        <h2 style="color: #334155; margin-top: 0;">📋 NOUVEAU LEAD INCENDIE (TIER 2)</h2>
                        <p><strong>Contact :</strong> ${name} | ${phone} | ${email}</p>
                        <p><strong>Société :</strong> ${company || 'N/A'} (${city})</p>
                        <p><strong>Type :</strong> ${projectType} | Besoin : ${needType || 'N/A'} | Établissement : ${establishmentType || 'N/A'}</p>
                        <p><strong>Surface :</strong> ${surface || 'N/A'} | Échéance : ${timeline || 'N/A'}</p>
                        <p><strong>Attribution :</strong> ${attributionLabel} | Page : ${leadAttribution.landing_page || 'N/A'} | Referrer : ${leadAttribution.referrer || 'N/A'}</p>
                    </div>
                `,
            });
        }

        // Email de confirmation au prospect
        if (email && email.includes('@')) {
            await sendSafeEmail({
                to: [email],
                replyTo: 'hello@expertsecuriteincendie.fr',
                subject: `Confirmation de votre demande de devis — Sécurité Incendie ${city ? `(${city})` : ''}`,
                html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                        <div style="background: #dc2626; color: #ffffff; padding: 22px;">
                            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.9; font-weight: 700;">Expert Sécurité Incendie</div>
                            <h1 style="font-size: 20px; margin: 6px 0 0; color: #ffffff;">Demande de devis prise en compte</h1>
                        </div>
                        <div style="padding: 24px;">
                            <p style="font-size: 15px; margin: 0 0 16px;">Bonjour <strong>${name}</strong>,</p>
                            <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 20px;">
                                Nous avons bien reçu votre demande de mise en conformité / devis pour vos équipements de sécurité incendie${city ? ` à <strong>${city}</strong>` : ''}.
                            </p>
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 0 0 24px;">
                                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 12px;">Récapitulatif de votre demande</div>
                                <table style="width: 100%; border-collapse: collapse; font-size: 13px; line-height: 1.6;">
                                    <tr><td style="padding: 6px 0; color: #64748b;">Type de structure</td><td style="padding: 6px 0; font-weight: 600; text-align: right; color: #0f172a;">${projectType || 'N/A'}</td></tr>
                                    <tr><td style="padding: 6px 0; color: #64748b;">Prestation souhaitée</td><td style="padding: 6px 0; font-weight: 600; text-align: right; color: #0f172a;">${needType || 'N/A'}</td></tr>
                                    <tr><td style="padding: 6px 0; color: #64748b;">Surface / Établissement</td><td style="padding: 6px 0; font-weight: 600; text-align: right; color: #0f172a;">${surface || establishmentType || 'N/A'}</td></tr>
                                    <tr><td style="padding: 6px 0; color: #64748b;">Téléphone de contact</td><td style="padding: 6px 0; font-weight: 600; text-align: right; color: #0f172a;">${phone}</td></tr>
                                    <tr><td style="padding: 6px 0; color: #64748b;">Localisation</td><td style="padding: 6px 0; font-weight: 600; text-align: right; color: #0f172a;">${zipCode || ''} ${city || ''}</td></tr>
                                </table>
                            </div>
                            <div style="font-size: 13px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
                                <p style="font-weight: 700; color: #0f172a; margin: 0 0 8px;">Comment se déroule la suite ?</p>
                                <p style="margin: 0 0 8px;">1. <strong>Analyse technique :</strong> Un technicien certifié ou conseiller dédié examine vos obligations réglementaires (extincteurs, blocs de secours BAES, RIA, alarme type 4, désenfumage).</p>
                                <p style="margin: 0 0 8px;">2. <strong>Contact sous 24h ouvrées :</strong> Vous serez contacté(e) pour affiner le plan d'implantation et les contraintes de votre site.</p>
                                <p style="margin: 0;">3. <strong>Devis détaillé sans engagement :</strong> Chiffrage précis remis avant toute intervention.</p>
                            </div>
                            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 16px;" />
                            <p style="font-size: 11px; color: #94a3b8; margin: 0;">Expert Sécurité Incendie · Service indépendant d'accompagnement et de mise en conformité réglementaire ERP, locaux professionnels et copropriétés.</p>
                        </div>
                    </div>
                `,
            });
        }

        } catch (emailErr) {
            console.error('Lead notification email failed:', emailErr);
        }

        // 1. SAVE TO DATABASE (Supabase) — le lead doit toujours être tracé,
        // même si l'email partenaire échoue (perte silencieuse = bug classique).
        try {
            const supabase = createSupabaseAdmin();
            const siteConfig = getSiteConfig(domain || 'expertsecuriteincendie.fr');
            const region = siteConfig?.region || 'National';
            const department = siteConfig?.department || (zipCode ? zipCode.substring(0, 2) : null);

            const { error: dbError } = await supabase
                .from('leads')
                .insert({
                    name,
                    email,
                    phone,
                    company: company || null,
                    city,
                    postal_code: zipCode,
                    tenant_id: domain || 'expertsecuriteincendie.fr',
                    type: projectType === 'erp' ? 'regulatory_erp_lead' : 'incendie_lead',
                    housing_type: projectType,
                    status: 'new',
                    region,
                    department,
                    message: JSON.stringify({
                        projectType,
                        needType,
                        establishmentType,
                        timeline,
                        surface,
                        company,
                        niche,
                        leadScore,
                        tier: isTier1 ? 'TIER_1' : 'TIER_2',
                        attribution: leadAttribution,
                    }, null, 2),
                    is_paid: false
                });

            if (dbError) {
                console.error('Supabase DB Error:', dbError);
            }
        } catch (dbErr) {
            console.error('Supabase insert exception:', dbErr);
        }

        return NextResponse.json({
            success: true,
            message: "Lead arbitré avec succès."
        });

    } catch (e: any) {
        console.error('API Error:', e);
        return NextResponse.json(
            { error: `Internal Server Error: ${e.message}` },
            { status: 500 }
        );
    }
}
