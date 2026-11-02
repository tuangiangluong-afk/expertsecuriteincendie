"use server";

import { createSupabaseAdmin, createSupabaseServerClient } from "@/lib/supabase-server";
import { Database } from "@/types/database.types";
import { PartnerCompanyInfo, PartnerTransaction, PartnerWithMeta } from "@/types/partners";
import { revalidatePath } from "next/cache";

async function requireAuth() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    return user;
}

export type Partner = Database['public']['Tables']['partners']['Row'];

export interface SavePartnerInput {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    company_name?: string;
    address?: string;
    landline?: string;
    secondary_email?: string;
    balance?: number; // € HT
    price_per_lead?: number; // € HT
    auto_dispatch?: boolean;
    is_default?: boolean;
    notes?: string;
    managed_regions?: string[];
    managed_departments?: string[];
}

export async function getPartners(): Promise<PartnerWithMeta[]> {
    await requireAuth();
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data || []) as PartnerWithMeta[];
}

export async function savePartnerAdmin(input: SavePartnerInput) {
    await requireAuth();
    const supabase = createSupabaseAdmin();

    if (!input.name || !input.email) {
        throw new Error("Nom et Email obligatoires");
    }

    // Fetch existing company_info to merge cleanly
    let existingMeta: PartnerCompanyInfo = {};
    if (input.id) {
        const { data: current } = await supabase
            .from("partners")
            .select("company_info")
            .eq("id", input.id)
            .single();

        if (current?.company_info) {
            existingMeta = typeof current.company_info === "string"
                ? JSON.parse(current.company_info)
                : current.company_info;
        }
    }

    const updatedMeta: PartnerCompanyInfo = {
        ...existingMeta,
        company_name: input.company_name ?? existingMeta.company_name ?? input.name,
        address: input.address ?? existingMeta.address,
        landline: input.landline ?? existingMeta.landline,
        secondary_email: input.secondary_email ?? existingMeta.secondary_email,
        balance: input.balance !== undefined ? Number(input.balance) : (existingMeta.balance ?? 0),
        price_per_lead: input.price_per_lead !== undefined ? Number(input.price_per_lead) : (existingMeta.price_per_lead ?? 45),
        auto_dispatch: input.auto_dispatch !== undefined ? Boolean(input.auto_dispatch) : (existingMeta.auto_dispatch ?? false),
        is_default: input.is_default !== undefined ? Boolean(input.is_default) : (existingMeta.is_default ?? false),
        notes: input.notes !== undefined ? input.notes : (existingMeta.notes ?? ""),
        transactions: existingMeta.transactions ?? []
    };

    let result;
    if (input.id) {
        const { data, error } = await supabase
            .from("partners")
            .update({
                name: input.name,
                email: input.email,
                phone: input.phone || "",
                company_info: updatedMeta as any,
                managed_regions: input.managed_regions || [],
                managed_departments: input.managed_departments || []
            })
            .eq("id", input.id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        result = data;
    } else {
        const { data, error } = await supabase
            .from("partners")
            .insert({
                name: input.name,
                email: input.email,
                phone: input.phone || "",
                company_info: updatedMeta as any,
                managed_regions: input.managed_regions || [],
                managed_departments: input.managed_departments || []
            })
            .select()
            .single();

        if (error) throw new Error(error.message);
        result = data;
    }

    revalidatePath("/admin/partners");
    revalidatePath("/admin/leads");
    revalidatePath("/admin");

    return result as PartnerWithMeta;
}

export async function topupPartnerBalanceAdmin(partnerId: string, amountEur: number, note?: string) {
    await requireAuth();
    const supabase = createSupabaseAdmin();

    const { data: partner, error: pError } = await supabase
        .from("partners")
        .select("*")
        .eq("id", partnerId)
        .single();

    if (pError || !partner) throw new Error("Partenaire introuvable");

    const meta: PartnerCompanyInfo = typeof partner.company_info === "string"
        ? JSON.parse(partner.company_info)
        : (partner.company_info || {});

    const currentBalance = Number(meta.balance || 0);
    const newBalance = currentBalance + Number(amountEur);

    const transaction: PartnerTransaction = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        type: amountEur >= 0 ? "deposit" : "refund",
        amount: Number(amountEur),
        description: note || (amountEur >= 0 ? `Recharge manuelle +${amountEur} € HT` : `Débit manuel ${amountEur} € HT`)
    };

    const transactions = meta.transactions || [];
    transactions.unshift(transaction);

    const updatedMeta: PartnerCompanyInfo = {
        ...meta,
        balance: newBalance,
        transactions
    };

    const { data, error } = await supabase
        .from("partners")
        .update({ company_info: updatedMeta as any })
        .eq("id", partnerId)
        .select()
        .single();

    if (error) throw new Error(error.message);

    revalidatePath("/admin/partners");
    revalidatePath("/admin/leads");
    revalidatePath("/admin");

    return {
        success: true,
        newBalance,
        partner: data as PartnerWithMeta
    };
}

export async function deletePartnerAdmin(partnerId: string) {
    await requireAuth();
    const supabase = createSupabaseAdmin();

    const { error } = await supabase
        .from("partners")
        .delete()
        .eq("id", partnerId);

    if (error) throw new Error(error.message);

    revalidatePath("/admin/partners");
    revalidatePath("/admin/leads");
    return { success: true };
}

// Legacy wrappers for backward compatibility
export async function addPartner(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const regionsStr = formData.get("regions") as string;
    const deptsStr = formData.get("departments") as string;
    
    let managed_regions: string[] = [];
    try {
        managed_regions = JSON.parse(regionsStr);
    } catch {
        managed_regions = regionsStr ? regionsStr.split(',').map(r => r.trim()).filter(Boolean) : [];
    }

    let managed_departments: string[] = [];
    try {
        managed_departments = JSON.parse(deptsStr);
    } catch {
        managed_departments = deptsStr ? deptsStr.split(',').map(d => d.trim()).filter(Boolean) : [];
    }

    return savePartnerAdmin({
        name,
        email,
        phone,
        company_name: company,
        managed_regions,
        managed_departments
    });
}

export async function updatePartner(id: string, updates: Partial<Partner>) {
    await requireAuth();
    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase
        .from("partners")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    revalidatePath("/admin/partners");
    return data;
}
