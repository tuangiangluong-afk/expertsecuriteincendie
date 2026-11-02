"use client";

import { useEffect, useState, useTransition } from "react";
import {
    AlertCircle,
    Check,
    Coins,
    History,
    Mail,
    Phone,
    Send,
    Shield,
    Flame,
    X,
    Building2,
    Calendar,
    MapPin,
    FileText
} from "lucide-react";
import { assignLeadToPartnersAdmin, getLeadAssignments } from "@/app/actions/leads";
import { useToast } from "@/components/admin/Toast";
import { AdminLeadRow, PartnerCompanyInfo, PartnerWithMeta } from "@/types/partners";

interface LeadAssignmentModalProps {
    lead: AdminLeadRow;
    partners: PartnerWithMeta[];
    onClose: () => void;
    onSuccess?: () => void;
}

export default function LeadAssignmentModal({
    lead,
    partners,
    onClose,
    onSuccess
}: LeadAssignmentModalProps) {
    const { showToast } = useToast();
    const [pending, startTransition] = useTransition();

    const [search, setSearch] = useState("");
    const [selectedPartnerIds, setSelectedPartnerIds] = useState<string[]>([]);
    const [priceMode, setPriceMode] = useState<"partner_default" | "free" | "custom">("partner_default");
    const [customPriceEur, setCustomPriceEur] = useState<number>(45);
    const [notes, setNotes] = useState<string>(lead.notes || "");
    const [sendEmail, setSendEmail] = useState(true);

    const [assignments, setAssignments] = useState<any[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);

    // Parse lead metadata
    let meta: Record<string, any> = {};
    try {
        if (lead.message) meta = JSON.parse(lead.message);
    } catch { }

    const projectLabels: Record<string, string> = {
        conformite: "Mise en conformité extincteurs + alarme",
        maintenance: "Maintenance annuelle extincteurs & parcs",
        commission_erp: "Passage Commission de Sécurité ERP",
        q18: "Contrôle réglementaire Q18 (électricité & risque incendie)",
        ssi_triennale: "Visite triennale SSI / Alarme incendie"
    };

    const needLabel = (meta.needType && projectLabels[meta.needType]) || meta.needType || "Sécurité Incendie";
    const surfaceLabel = meta.surface ? (meta.surface === "moins_50" ? "< 50 m²" : meta.surface === "50_200" ? "50 à 200 m²" : "> 200 m²") : "Non précisée";

    // Load assignment history
    useEffect(() => {
        let mounted = true;
        async function loadHistory() {
            try {
                const history = await getLeadAssignments(lead.id);
                if (mounted) setAssignments(history || []);
            } catch (err) {
                console.error("Erreur chargement historique:", err);
            } finally {
                if (mounted) setLoadingHistory(false);
            }
        }
        loadHistory();
        return () => { mounted = false; };
    }, [lead.id]);

    const leadDept = lead.department || (lead.postal_code ? lead.postal_code.substring(0, 2) : "");

    // Filter partners
    const filteredPartners = partners.filter((p) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        const meta = typeof p.company_info === "string" ? JSON.parse(p.company_info) : (p.company_info || {});
        return (
            p.name.toLowerCase().includes(q) ||
            p.email.toLowerCase().includes(q) ||
            (meta.company_name && meta.company_name.toLowerCase().includes(q)) ||
            (p.managed_departments && p.managed_departments.some((d: string) => d.includes(q)))
        );
    });

    const togglePartner = (id: string) => {
        setSelectedPartnerIds((prev) =>
            prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
        );
    };

    const selectedPartners = partners.filter((p) => selectedPartnerIds.includes(p.id));

    // Calculate billing
    const isFree = priceMode === "free";
    const basePrice = priceMode === "custom" ? customPriceEur : 45;
    const totalAmount = isFree ? 0 : basePrice * selectedPartnerIds.length;

    // Check solvency
    const solvencyWarnings = selectedPartners
        .map((partner) => {
            if (isFree) return null;
            const meta: PartnerCompanyInfo = typeof partner.company_info === "string"
                ? JSON.parse(partner.company_info)
                : (partner.company_info || {});
            const balance = Number(meta.balance || 0);
            const price = priceMode === "custom" ? customPriceEur : Number(meta.price_per_lead || 45);
            if (balance < price) {
                return {
                    partner,
                    balance,
                    price,
                    deficit: price - balance,
                };
            }
            return null;
        })
        .filter(Boolean);

    function handleAssign() {
        if (!selectedPartnerIds.length) {
            showToast("Veuillez sélectionner au moins un partenaire.", "error");
            return;
        }

        if (solvencyWarnings.length > 0 && !isFree) {
            showToast(
                `Solde insuffisant pour ${solvencyWarnings.map((w) => w?.partner.name).join(", ")}.`,
                "error"
            );
            return;
        }

        startTransition(async () => {
            try {
                const res = await assignLeadToPartnersAdmin(lead.id, selectedPartnerIds, {
                    isFree,
                    priceEur: priceMode === "custom" ? customPriceEur : undefined,
                    sendEmail,
                    notes: notes.trim() || undefined,
                });

                showToast(res.message, "success");
                if (onSuccess) onSuccess();
                onClose();
            } catch (err: any) {
                showToast(err.message || "Erreur lors de l'attribution.", "error");
            }
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
            <div className="my-8 w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-rose-700 px-6 py-5 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                                <Flame className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black tracking-tight">
                                    Attribuer & Vendre ce Dossier Incendie
                                </h2>
                                <p className="text-xs text-red-100">
                                    Dossier {lead.company || lead.name || "Client"} · Secteur {lead.city || "France"} {leadDept ? `(${leadDept})` : ""}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white transition"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Lead Card Summary */}
                    <div className="rounded-xl border border-red-100 bg-red-50/50 p-4">
                        <div className="flex items-center justify-between mb-3 border-b border-red-100 pb-2">
                            <span className="text-xs font-black uppercase tracking-wider text-red-700 flex items-center gap-1.5">
                                <Building2 size={14} /> Fiche Dossier Client
                            </span>
                            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                                <Calendar size={13} /> Reçu le {new Date(lead.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <span className="text-xs text-slate-500 block">Établissement / Client</span>
                                <span className="font-bold text-slate-900 text-base">{lead.company || lead.name || "Établissement"}</span>
                                {lead.company && lead.name && (
                                    <span className="text-xs text-slate-600 block">Contact : {lead.name}</span>
                                )}
                            </div>

                            <div>
                                <span className="text-xs text-slate-500 block">Coordonnées Directes</span>
                                <a href={`tel:${lead.phone}`} className="font-bold text-red-600 hover:underline block flex items-center gap-1">
                                    <Phone size={13} /> {lead.phone}
                                </a>
                                <span className="text-xs text-slate-600 truncate block">{lead.email}</span>
                            </div>

                            <div>
                                <span className="text-xs text-slate-500 block">Localisation & Surface</span>
                                <span className="font-bold text-slate-900 flex items-center gap-1">
                                    <MapPin size={13} className="text-red-500" /> {lead.city || "Ville non précisée"} {lead.postal_code ? `(${lead.postal_code})` : ""}
                                </span>
                                <span className="text-xs text-slate-600 block">Surface : {surfaceLabel}</span>
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-red-100 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-slate-700">Prestation demandée :</span>
                            <span className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-bold text-red-700 border border-red-200 shadow-sm">
                                <Shield size={12} /> {needLabel}
                            </span>
                            {meta.timeline && (
                                <span className="text-xs text-slate-500">
                                    (Délai : {meta.timeline === "urgent" ? "Urgent (< 48h)" : meta.timeline})
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Partner Selector */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-bold text-slate-900">
                                1. Sélectionner les installateurs destinataires ({selectedPartnerIds.length})
                            </label>
                            <input
                                type="text"
                                placeholder="Filtrer par nom, email, département..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-64 rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-red-500"
                            />
                        </div>

                        <div className="max-h-56 overflow-y-auto rounded-xl border border-slate-200 divide-y divide-slate-100 bg-white shadow-inner">
                            {filteredPartners.length === 0 ? (
                                <div className="p-6 text-center text-xs text-slate-400 italic">
                                    Aucun installateur trouvé.
                                </div>
                            ) : (
                                filteredPartners.map((partner) => {
                                    const meta: PartnerCompanyInfo = typeof partner.company_info === "string"
                                        ? JSON.parse(partner.company_info)
                                        : (partner.company_info || {});
                                    const isSelected = selectedPartnerIds.includes(partner.id);
                                    const balance = Number(meta.balance || 0);
                                    const pricePerLead = Number(meta.price_per_lead || 45);
                                    const remainingLeads = pricePerLead > 0 ? Math.floor(balance / pricePerLead) : 0;
                                    const coversDept = leadDept && partner.managed_departments?.includes(leadDept);

                                    return (
                                        <div
                                            key={partner.id}
                                            onClick={() => togglePartner(partner.id)}
                                            className={`flex items-center justify-between p-3.5 cursor-pointer transition ${
                                                isSelected ? "bg-red-50/80 border-l-4 border-l-red-600" : "hover:bg-slate-50"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`flex h-5 w-5 items-center justify-center rounded border transition ${
                                                        isSelected
                                                            ? "bg-red-600 border-red-600 text-white"
                                                            : "border-slate-300 bg-white"
                                                    }`}
                                                >
                                                    {isSelected && <Check size={13} strokeWidth={3} />}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-slate-900 text-sm">
                                                            {partner.name}
                                                        </span>
                                                        {meta.company_name && meta.company_name !== partner.name && (
                                                            <span className="text-xs text-slate-500 font-medium">
                                                                ({meta.company_name})
                                                            </span>
                                                        )}
                                                        {coversDept && (
                                                            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                                                                Secteur {leadDept}
                                                            </span>
                                                        )}
                                                        {meta.auto_dispatch && (
                                                            <span className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-bold text-purple-800 border border-purple-200">
                                                                ⚡ Auto
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-slate-500 flex items-center gap-3 mt-0.5">
                                                        <span>{partner.email}</span>
                                                        {partner.phone && <span>· Tél : {partner.phone}</span>}
                                                        {partner.managed_departments?.length ? (
                                                            <span className="text-slate-400">· Dpts : {partner.managed_departments.join(", ")}</span>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-xs font-bold text-slate-900">
                                                    Solde : {balance.toFixed(2)} € HT
                                                </div>
                                                <div className="text-[11px]">
                                                    {remainingLeads > 0 ? (
                                                        <span className="font-bold text-emerald-600">
                                                            ~{remainingLeads} lead{remainingLeads > 1 ? "s" : ""}
                                                        </span>
                                                    ) : (
                                                        <span className="font-bold text-amber-600">À sec (0 crédit)</span>
                                                    )}
                                                    <span className="text-slate-400 ml-1.5">({pricePerLead} €/lead)</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Pricing Mode */}
                    <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
                        <label className="text-sm font-bold text-slate-900 block mb-3">
                            2. Modalité de Facturation & Débit Wallet
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <label
                                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                                    priceMode === "partner_default"
                                        ? "border-red-600 bg-white ring-2 ring-red-500/20"
                                        : "border-slate-200 bg-white hover:border-slate-300"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="priceMode"
                                    checked={priceMode === "partner_default"}
                                    onChange={() => setPriceMode("partner_default")}
                                    className="mt-1 text-red-600 focus:ring-red-500"
                                />
                                <div>
                                    <span className="font-bold text-slate-900 text-sm block">
                                        💼 Tarif négocié partenaire
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        Déduit automatiquement du solde prépayé (ex: 45 € HT / installateur).
                                    </span>
                                </div>
                            </label>

                            <label
                                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                                    priceMode === "free"
                                        ? "border-emerald-600 bg-white ring-2 ring-emerald-500/20"
                                        : "border-slate-200 bg-white hover:border-slate-300"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="priceMode"
                                    checked={priceMode === "free"}
                                    onChange={() => setPriceMode("free")}
                                    className="mt-1 text-emerald-600 focus:ring-emerald-500"
                                />
                                <div>
                                    <span className="font-bold text-emerald-800 text-sm block">
                                        🎁 Fiche offerte en test (0 €)
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        Lead offert gracieusement. Aucun débit de solde. Idéal pour amorcer un partenariat.
                                    </span>
                                </div>
                            </label>

                            <label
                                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                                    priceMode === "custom"
                                        ? "border-purple-600 bg-white ring-2 ring-purple-500/20"
                                        : "border-slate-200 bg-white hover:border-slate-300"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="priceMode"
                                    checked={priceMode === "custom"}
                                    onChange={() => setPriceMode("custom")}
                                    className="mt-1 text-purple-600 focus:ring-purple-500"
                                />
                                <div>
                                    <span className="font-bold text-slate-900 text-sm block">
                                        ⚙️ Tarif sur-mesure
                                    </span>
                                    <div className="flex items-center gap-1.5 mt-1.5">
                                        <input
                                            type="number"
                                            value={customPriceEur}
                                            onChange={(e) => setCustomPriceEur(Number(e.target.value))}
                                            className="w-20 rounded border border-slate-200 px-2 py-1 text-xs outline-none focus:border-purple-500 font-bold"
                                        />
                                        <span className="text-xs text-slate-600 font-bold">€ HT / lead</span>
                                    </div>
                                </div>
                            </label>
                        </div>

                        {/* Solvency Warning Alert */}
                        {solvencyWarnings.length > 0 && !isFree && (
                            <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                                <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold">Attention — Solde insuffisant :</span>
                                    <ul className="list-disc pl-4 mt-1 space-y-0.5">
                                        {solvencyWarnings.map((w) => (
                                            <li key={w?.partner.id}>
                                                <strong>{w?.partner.name}</strong> a un solde de {w?.balance.toFixed(2)} € (manque {w?.deficit.toFixed(2)} €). Veuillez recharger son compte dans l'onglet Partenaires ou lui offrir en test.
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Email Option & Admin Notes */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="sendEmail"
                                checked={sendEmail}
                                onChange={(e) => setSendEmail(e.target.checked)}
                                className="h-4 w-4 rounded text-red-600 focus:ring-red-500"
                            />
                            <label htmlFor="sendEmail" className="text-xs font-bold text-slate-700 cursor-pointer flex items-center gap-1.5">
                                <Mail size={14} className="text-slate-500" />
                                Transmettre immédiatement la fiche complète par email (via Resend hello@expertsecuriteincendie.fr)
                            </label>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">
                                Note d'accompagnement transmise dans l'email (facultatif) :
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Ex: Client très réactif, joindre le matin de préférence. Devis souhaité pour 6 extincteurs eau pulvérisée + 1 CO2."
                                rows={2}
                                className="w-full rounded-lg border border-slate-200 p-2.5 text-xs outline-none focus:border-red-500 text-slate-800"
                            />
                        </div>
                    </div>

                    {/* Assignment History */}
                    {assignments.length > 0 && (
                        <div className="border-t border-slate-100 pt-4">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                                <History size={13} /> Historique des attributions antérieures ({assignments.length})
                            </span>
                            <div className="space-y-1.5 max-h-28 overflow-y-auto">
                                {assignments.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-slate-900">{item.partners?.name || "Partenaire"}</span>
                                            <span className="text-slate-400">({item.partners?.email})</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-bold">
                                                {item.status || "attribué"}
                                            </span>
                                            <span className="text-slate-500">
                                                {new Date(item.assigned_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
                    <div className="text-xs text-slate-500">
                        {selectedPartnerIds.length > 0 ? (
                            <span>
                                Total transaction : <strong className="text-slate-900 font-bold">{isFree ? "0,00 € (Offert)" : `${totalAmount.toFixed(2)} € HT`}</strong>
                            </span>
                        ) : (
                            "Sélectionnez un installateur ci-dessus"
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                        >
                            Annuler
                        </button>

                        <button
                            type="button"
                            disabled={pending || selectedPartnerIds.length === 0 || (solvencyWarnings.length > 0 && !isFree)}
                            onClick={handleAssign}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 transition disabled:opacity-50"
                        >
                            <Send size={14} />
                            {pending ? "Traitement & Envoi..." : `Valider & Envoyer (${selectedPartnerIds.length})`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
