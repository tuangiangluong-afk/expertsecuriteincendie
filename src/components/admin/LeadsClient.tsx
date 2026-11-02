"use client";

import { useMemo, useState } from "react";
import {
    Users,
    Filter,
    Download,
    Phone,
    Mail,
    Building2,
    Shield,
    Flame,
    Check,
    MapPin,
    CreditCard,
    Search,
    ExternalLink,
    AlertCircle,
    Copy,
    Share2,
    Sparkles
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { updateLeadDetails } from "@/app/actions/leads";
import { useToast } from "@/components/admin/Toast";
import LeadAssignmentModal from "@/components/admin/LeadAssignmentModal";
import { AdminLeadRow, PartnerWithMeta } from "@/types/partners";

interface LeadsClientProps {
    initialLeads: any[];
    partners: PartnerWithMeta[];
}

const REGIONS = [
    "National",
    "Île-de-France",
    "Auvergne-Rhône-Alpes",
    "Provence-Alpes-Côte d'Azur",
    "Nouvelle-Aquitaine",
    "Occitanie",
    "Hauts-de-France",
    "Grand Est",
    "Pays de la Loire",
    "Bretagne"
];

export default function LeadsClient({ initialLeads, partners }: LeadsClientProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentRegion = searchParams.get("region") || "all";
    const currentDept = searchParams.get("dept") || "all";

    const { showToast } = useToast();

    // State
    const [leads, setLeads] = useState<AdminLeadRow[]>(() => {
        return initialLeads.map((l: any) => {
            const raw = l.message || "";
            let parsedMeta: any = {};
            try {
                if (l.message) parsedMeta = JSON.parse(l.message);
            } catch { }

            const isIncendie =
                raw.includes("projectType") ||
                raw.includes("needType") ||
                raw.includes("commission_erp") ||
                raw.includes("conformite") ||
                raw.includes("extincteur") ||
                (Boolean(l.company) && !raw.includes("vehicle_status"));

            return {
                ...l,
                isIncendie,
                parsedMeta
            };
        });
    });

    const [activeTab, setActiveTab] = useState<"incendie" | "all">("incendie");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLeadForAssign, setSelectedLeadForAssign] = useState<AdminLeadRow | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Counts
    const incendieCount = useMemo(() => leads.filter((l) => l.isIncendie).length, [leads]);
    const totalCount = leads.length;

    // Filtered list
    const filteredLeads = useMemo(() => {
        return leads.filter((l) => {
            // Tab filter
            if (activeTab === "incendie" && !l.isIncendie) return false;

            // Region filter
            if (currentRegion !== "all" && l.region !== currentRegion) return false;

            // Dept filter
            const dept = l.department || (l.postal_code ? l.postal_code.substring(0, 2) : "");
            if (currentDept !== "all" && dept !== currentDept) return false;

            // Search query
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase().trim();
                const matchName = (l.name || "").toLowerCase().includes(q);
                const matchCompany = (l.company || "").toLowerCase().includes(q);
                const matchCity = (l.city || "").toLowerCase().includes(q);
                const matchPhone = (l.phone || "").toLowerCase().includes(q);
                const matchEmail = (l.email || "").toLowerCase().includes(q);
                const matchPostal = (l.postal_code || "").includes(q);
                return matchName || matchCompany || matchCity || matchPhone || matchEmail || matchPostal;
            }

            return true;
        });
    }, [leads, activeTab, currentRegion, currentDept, searchQuery]);

    const copyToClipboard = (leadId: string) => {
        const url = `${window.location.origin}/leads/unlock/${leadId}`;
        navigator.clipboard.writeText(url);
        setCopiedId(leadId);
        showToast("Lien de vente copié !", "success");
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleRegionFilter = (region: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (region === "all") params.delete("region");
        else params.set("region", region);
        router.push(`?${params.toString()}`);
    };

    const handleDeptFilter = (dept: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (dept === "all") params.delete("dept");
        else params.set("dept", dept);
        router.push(`?${params.toString()}`);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "sold":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200">
                        <Check size={12} strokeWidth={3} /> Vendu
                    </span>
                );
            case "dispatched":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 border border-blue-200">
                        ⚡ Attribué
                    </span>
                );
            case "new":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700 border border-red-200 animate-pulse">
                        🔥 Nouveau
                    </span>
                );
            case "contacted":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                        En cours
                    </span>
                );
            default:
                return (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                        {status}
                    </span>
                );
        }
    };

    const projectLabels: Record<string, string> = {
        conformite: "Conformité extincteurs",
        maintenance: "Maintenance extincteurs",
        commission_erp: "Commission Sécurité ERP",
        q18: "Audit Q18 électrique",
        ssi_triennale: "Visite triennale SSI"
    };

    return (
        <div className="w-full space-y-6">
            {/* Top Title & Stats Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
                        <Flame className="text-red-600 h-7 w-7" />
                        Bourse des Dossiers & Leads Sécurité Incendie
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Attribution directe, arbitrage multi-partenaires et débit wallet instantané
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex rounded-xl bg-slate-200/80 p-1 border border-slate-300">
                    <button
                        onClick={() => setActiveTab("incendie")}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-black transition ${
                            activeTab === "incendie"
                                ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                                : "text-slate-600 hover:text-slate-900"
                        }`}
                    >
                        <Flame size={14} />
                        Sécurité Incendie B2B ({incendieCount})
                    </button>
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
                            activeTab === "all"
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
                        }`}
                    >
                        Tous / Archives ({totalCount})
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-1 items-center gap-2 min-w-[240px]">
                    <Search size={16} className="text-slate-400 ml-2" />
                    <input
                        type="text"
                        placeholder="Rechercher par société, nom, ville, téléphone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full text-xs font-medium outline-none text-slate-800 placeholder:text-slate-400"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Region Selector */}
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
                        <MapPin size={13} className="text-slate-400" />
                        <select
                            value={currentRegion}
                            onChange={(e) => handleRegionFilter(e.target.value)}
                            className="bg-transparent font-bold text-slate-700 outline-none text-xs"
                        >
                            <option value="all">Toutes les régions</option>
                            {REGIONS.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                    </div>

                    <span className="text-xs text-slate-400 font-bold px-1">
                        {filteredLeads.length} dossier(s)
                    </span>
                </div>
            </div>

            {/* Leads Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-black uppercase tracking-wider text-slate-500">
                                <th className="px-4 py-3.5">Date & Urgence</th>
                                <th className="px-4 py-3.5">Établissement & Gérant</th>
                                <th className="px-4 py-3.5">Besoin & Surface</th>
                                <th className="px-4 py-3.5">Localisation</th>
                                <th className="px-4 py-3.5">Statut</th>
                                <th className="px-4 py-3.5 text-right">Attribution & Vente</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-slate-400 italic">
                                        Aucun dossier trouvé pour ces filtres.
                                    </td>
                                </tr>
                            ) : (
                                filteredLeads.map((lead) => {
                                    const meta = lead.parsedMeta || {};
                                    const dept = lead.department || (lead.postal_code ? lead.postal_code.substring(0, 2) : "");
                                    const need = (meta.needType && projectLabels[meta.needType]) || meta.needType || lead.housing_type || "Conformité Incendie";
                                    const surface = meta.surface ? (meta.surface === "moins_50" ? "< 50m²" : meta.surface === "50_200" ? "50-200m²" : "> 200m²") : null;

                                    return (
                                        <tr key={lead.id} className="hover:bg-red-50/20 transition group">
                                            {/* Date */}
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                <div className="font-bold text-slate-900">
                                                    {format(new Date(lead.created_at), "dd MMM yyyy", { locale: fr })}
                                                </div>
                                                <div className="text-[11px] text-slate-400">
                                                    {format(new Date(lead.created_at), "HH:mm", { locale: fr })}
                                                </div>
                                                {meta.timeline === "urgent" && (
                                                    <span className="mt-1 inline-block rounded bg-rose-100 px-1.5 py-0.5 text-[9px] font-black text-rose-800 border border-rose-200">
                                                        ⚡ Devis 48h
                                                    </span>
                                                )}
                                            </td>

                                            {/* Company & Contact */}
                                            <td className="px-4 py-3.5">
                                                <div className="font-black text-slate-900 text-sm">
                                                    {lead.company || lead.name || "Établissement commercial"}
                                                </div>
                                                {lead.company && lead.name && (
                                                    <div className="text-[11px] text-slate-600 font-medium">
                                                        Gérant : {lead.name}
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2 mt-1">
                                                    <a
                                                        href={`tel:${lead.phone}`}
                                                        className="font-bold text-red-600 hover:underline flex items-center gap-1"
                                                    >
                                                        <Phone size={11} /> {lead.phone}
                                                    </a>
                                                    <span className="text-slate-300">·</span>
                                                    <span className="text-slate-500 truncate max-w-[140px]" title={lead.email}>
                                                        {lead.email}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Project & Surface */}
                                            <td className="px-4 py-3.5">
                                                <div className="font-bold text-slate-800 flex items-center gap-1">
                                                    <Shield size={12} className="text-red-500" />
                                                    {need}
                                                </div>
                                                {surface && (
                                                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                                                        Surface ERP : <span className="font-bold text-slate-700">{surface}</span>
                                                    </div>
                                                )}
                                                {meta.establishmentType && (
                                                    <div className="text-[10px] text-slate-400">
                                                        Activité : {meta.establishmentType}
                                                    </div>
                                                )}
                                            </td>

                                            {/* Location */}
                                            <td className="px-4 py-3.5">
                                                <div className="font-bold text-slate-900 flex items-center gap-1">
                                                    <MapPin size={12} className="text-red-500" />
                                                    {lead.city || "France"}
                                                </div>
                                                <div className="text-[11px] text-slate-500 font-medium">
                                                    {lead.postal_code || ""} {dept ? `(Dpt ${dept})` : ""}
                                                </div>
                                                {lead.region && (
                                                    <div className="text-[10px] text-slate-400">{lead.region}</div>
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                {getStatusBadge(lead.status)}
                                                {lead.price && lead.price > 0 && (
                                                    <div className="text-[10px] text-emerald-700 font-black mt-1">
                                                        {lead.price} € HT
                                                    </div>
                                                )}
                                            </td>

                                            {/* Action Button */}
                                            <td className="px-4 py-3.5 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        onClick={() => setSelectedLeadForAssign(lead)}
                                                        className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-black text-white hover:bg-red-600 transition shadow-sm"
                                                    >
                                                        <Flame size={13} className="text-red-400 group-hover:text-white" />
                                                        Attribuer / Vendre
                                                    </button>

                                                    <button
                                                        onClick={() => copyToClipboard(lead.id)}
                                                        title="Copier le lien public de vente"
                                                        className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition"
                                                    >
                                                        {copiedId === lead.id ? (
                                                            <Check size={14} className="text-emerald-600" />
                                                        ) : (
                                                            <Copy size={14} />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Hero Modal Assignment */}
            {selectedLeadForAssign && (
                <LeadAssignmentModal
                    lead={selectedLeadForAssign}
                    partners={partners}
                    onClose={() => setSelectedLeadForAssign(null)}
                    onSuccess={() => {
                        showToast("Dossier attribué avec succès !", "success");
                        router.refresh();
                    }}
                />
            )}
        </div>
    );
}
