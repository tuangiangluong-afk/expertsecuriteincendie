export interface PartnerTransaction {
    id: string;
    date: string;
    type: "deposit" | "dispatch_fee" | "refund";
    amount: number; // in € HT (positive for deposit/refund, negative for fee)
    lead_id?: string;
    description: string;
}

export interface PartnerCompanyInfo {
    [key: string]: any;
    company_name?: string;
    address?: string;
    landline?: string;
    secondary_email?: string;
    balance?: number; // solde disponible en € HT
    price_per_lead?: number; // tarif négocié par lead en € HT (ex: 45)
    auto_dispatch?: boolean; // envoi automatique dès réception si solde suffisant
    is_default?: boolean; // prioritaire sur ses départements
    notes?: string;
    transactions?: PartnerTransaction[];
}

export interface PartnerWithMeta {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    company_info?: any;
    managed_regions?: string[] | null;
    managed_departments?: string[] | null;
    created_at?: string;
}

export interface LeadMetadata {
    projectType?: string;
    needType?: string;
    establishmentType?: string;
    timeline?: string;
    surface?: string;
    company?: string;
    niche?: string;
    leadScore?: number;
    tier?: string;
    owner_status?: string;
    vehicle_status?: string;
    meter_distance?: string;
    solar_interest?: boolean;
    attribution?: Record<string, unknown>;
}

export interface AdminLeadRow {
    id: string;
    tenant_id: string;
    status: string;
    type: string;
    name: string;
    email: string;
    phone: string;
    company: string | null;
    city: string | null;
    message: string | null;
    postal_code: string | null;
    housing_type: string | null;
    notes: string | null;
    price: number | null;
    region: string | null;
    department: string | null;
    is_paid: boolean;
    created_at: string;
    // Computed fields
    isIncendie?: boolean;
    parsedMeta?: LeadMetadata;
}
