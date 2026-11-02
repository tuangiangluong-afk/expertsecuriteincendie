"use client";

import { useMemo, useState, useTransition } from "react";
import {
    Users,
    Plus,
    Mail,
    Phone,
    MapPin,
    X,
    Check,
    Search,
    Coins,
    Sparkles,
    Shield,
    Trash2,
    Building2,
    Calendar,
    Flame
} from "lucide-react";
import {
    deletePartnerAdmin,
    savePartnerAdmin,
    topupPartnerBalanceAdmin,
    type SavePartnerInput
} from "@/app/actions/partners";
import { useToast } from "@/components/admin/Toast";
import { PartnerCompanyInfo, PartnerWithMeta } from "@/types/partners";
import { useRouter } from "next/navigation";

interface PartnersClientProps {
    initialPartners: PartnerWithMeta[];
}

const REGIONS = [
    "Île-de-France",
    "Auvergne-Rhône-Alpes",
    "Provence-Alpes-Côte d'Azur",
    "Nouvelle-Aquitaine",
    "Occitanie",
    "Hauts-de-France",
    "Grand Est",
    "Pays de la Loire",
    "Bretagne",
    "National"
];

const EMPTY_FORM: SavePartnerInput = {
    name: "",
    email: "",
    phone: "",
    company_name: "",
    address: "",
    landline: "",
    secondary_email: "",
    balance: 0,
    price_per_lead: 45,
    auto_dispatch: false,
    is_default: false,
    notes: "",
    managed_regions: ["Île-de-France"],
    managed_departments: ["93", "75", "92", "78", "94"]
};

export default function PartnersClient({ initialPartners }: PartnersClientProps) {
    const router = useRouter();
    const { showToast } = useToast();
    const [partners, setPartners] = useState<PartnerWithMeta[]>(initialPartners);
    const [query, setQuery] = useState("");
    const [editingPartner, setEditingPartner] = useState<SavePartnerInput | null>(null);

    // KPI computations
    const totalBalance = useMemo(() => {
        return partners.reduce((sum, p) => {
            const meta: PartnerCompanyInfo = typeof p.company_info === "string"
                ? JSON.parse(p.company_info)
                : (p.company_info || {});
            return sum + Number(meta.balance || 0);
        }, 0);
    }, [partners]);

    const autoDispatchCount = useMemo(() => {
        return partners.filter((p) => {
            const meta: PartnerCompanyInfo = typeof p.company_info === "string"
                ? JSON.parse(p.company_info)
                : (p.company_info || {});
            return Boolean(meta.auto_dispatch);
        }).length;
    }, [partners]);

    // Filter
    const filteredPartners = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return partners;
        return partners.filter((p) => {
            const meta: PartnerCompanyInfo = typeof p.company_info === "string"
                ? JSON.parse(p.company_info)
                : (p.company_info || {});
            return (
                p.name.toLowerCase().includes(q) ||
                p.email.toLowerCase().includes(q) ||
                (meta.company_name && meta.company_name.toLowerCase().includes(q)) ||
                (p.managed_departments && p.managed_departments.some((d) => d.includes(q)))
            );
        });
    }, [partners, query]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
                        <Users className="text-red-600 h-7 w-7" />
                        Réseau des Installateurs & Wallets Prépayés
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Gestion des tarifs par lead, recharges de compte et auto-dispatch par département
                    </p>
                </div>

                <button
                    onClick={() => setEditingPartner({ ...EMPTY_FORM })}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-black text-white hover:bg-slate-800 transition shadow-sm"
                >
                    <Plus size={16} />
                    Nouveau Partenaire Installateur
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Installateurs Référencés
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-slate-900">{partners.length}</span>
                        <span className="text-xs font-bold text-slate-500">partenaires actifs</span>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Encours Total Portefeuilles
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-emerald-600">{totalBalance.toFixed(2)} €</span>
                        <span className="text-xs font-bold text-slate-500">HT prépayés</span>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Canaux Auto-Dispatch
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-purple-600">{autoDispatchCount}</span>
                        <span className="text-xs font-bold text-slate-500">envois immédiats actifs</span>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-1 items-center gap-2">
                    <Search size={16} className="text-slate-400 ml-2" />
                    <input
                        type="text"
                        placeholder="Rechercher un installateur par nom, société, département, email..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full text-xs font-medium outline-none text-slate-800 placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* Partners Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-black uppercase tracking-wider text-slate-500">
                                <th className="px-4 py-3.5">Installateur / Société</th>
                                <th className="px-4 py-3.5">Départements Couverts</th>
                                <th className="px-4 py-3.5">Tarif Négocié</th>
                                <th className="px-4 py-3.5">Solde Portefeuille</th>
                                <th className="px-4 py-3.5">Auto-Dispatch</th>
                                <th className="px-4 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredPartners.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-slate-400 italic">
                                        Aucun installateur trouvé.
                                    </td>
                                </tr>
                            ) : (
                                filteredPartners.map((partner) => {
                                    const meta: PartnerCompanyInfo = typeof partner.company_info === "string"
                                        ? JSON.parse(partner.company_info)
                                        : (partner.company_info || {});
                                    const balance = Number(meta.balance || 0);
                                    const pricePerLead = Number(meta.price_per_lead || 45);
                                    const remainingLeads = pricePerLead > 0 ? Math.floor(balance / pricePerLead) : 0;

                                    return (
                                        <tr key={partner.id} className="hover:bg-slate-50/80 transition">
                                            {/* Partner Name & Company */}
                                            <td className="px-4 py-3.5">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-black text-slate-900 text-sm">
                                                        {partner.name}
                                                    </span>
                                                    {meta.is_default && (
                                                        <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-black text-teal-800 border border-teal-200">
                                                            🎯 Prioritaire
                                                        </span>
                                                    )}
                                                </div>
                                                {meta.company_name && (
                                                    <div className="text-[11px] font-bold text-red-600">
                                                        {meta.company_name}
                                                    </div>
                                                )}
                                                <div className="text-[11px] text-slate-500 mt-0.5">
                                                    {partner.email} {partner.phone ? `· ${partner.phone}` : ""}
                                                </div>
                                            </td>

                                            {/* Managed Departments */}
                                            <td className="px-4 py-3.5">
                                                <div className="flex flex-wrap gap-1 max-w-[220px]">
                                                    {partner.managed_departments && partner.managed_departments.length > 0 ? (
                                                        partner.managed_departments.map((d) => (
                                                            <span
                                                                key={d}
                                                                className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700"
                                                            >
                                                                {d}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-slate-400 italic">Tous départements</span>
                                                    )}
                                                </div>
                                                {partner.managed_regions && partner.managed_regions.length > 0 && (
                                                    <div className="text-[10px] text-slate-400 mt-1">
                                                        {partner.managed_regions.join(", ")}
                                                    </div>
                                                )}
                                            </td>

                                            {/* Price per lead */}
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                <div className="font-black text-slate-900 text-sm">
                                                    {pricePerLead.toFixed(2)} € HT
                                                </div>
                                                <div className="text-[10px] text-slate-400">par lead qualifié</div>
                                            </td>

                                            {/* Wallet Balance */}
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                <div className="font-black text-slate-900 text-sm">
                                                    {balance.toFixed(2)} € HT
                                                </div>
                                                <div>
                                                    {remainingLeads > 0 ? (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                                                            ~{remainingLeads} lead{remainingLeads > 1 ? "s" : ""} dispo{remainingLeads > 1 ? "s" : ""}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700">
                                                            À sec (0 crédit)
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Auto-Dispatch Badge */}
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                {meta.auto_dispatch ? (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-[11px] font-black text-purple-800 border border-purple-200">
                                                        ⚡ Activé
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                                                        Manuel
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3.5 text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => {
                                                        const pMeta: PartnerCompanyInfo = typeof partner.company_info === "string"
                                                            ? JSON.parse(partner.company_info)
                                                            : (partner.company_info || {});
                                                        setEditingPartner({
                                                            id: partner.id,
                                                            name: partner.name,
                                                            email: partner.email,
                                                            phone: partner.phone || "",
                                                            company_name: pMeta.company_name || partner.name,
                                                            address: pMeta.address || "",
                                                            landline: pMeta.landline || "",
                                                            secondary_email: pMeta.secondary_email || "",
                                                            balance: pMeta.balance || 0,
                                                            price_per_lead: pMeta.price_per_lead || 45,
                                                            auto_dispatch: Boolean(pMeta.auto_dispatch),
                                                            is_default: Boolean(pMeta.is_default),
                                                            notes: pMeta.notes || "",
                                                            managed_regions: partner.managed_regions || [],
                                                            managed_departments: partner.managed_departments || []
                                                        });
                                                    }}
                                                    className="rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition shadow-sm"
                                                >
                                                    Gérer & Recharger
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Edit / Add Partner & Top-up */}
            {editingPartner && (
                <PartnerConfigModal
                    input={editingPartner}
                    onClose={() => setEditingPartner(null)}
                    onSuccess={() => {
                        router.refresh();
                        // reload local
                        import("@/app/actions/partners").then((mod) => {
                            mod.getPartners().then(setPartners);
                        });
                    }}
                />
            )}
        </div>
    );
}

function PartnerConfigModal({
    input,
    onClose,
    onSuccess
}: {
    input: SavePartnerInput;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const { showToast } = useToast();
    const [form, setForm] = useState<SavePartnerInput>(input);
    const [pending, startTransition] = useTransition();

    // Credit state
    const [creditAmount, setCreditAmount] = useState("");
    const [creditNote, setCreditNote] = useState("");

    function setField<K extends keyof SavePartnerInput>(key: K, value: SavePartnerInput[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function handleSave() {
        startTransition(async () => {
            try {
                await savePartnerAdmin(form);
                showToast("Installateur enregistré avec succès !", "success");
                onSuccess();
                onClose();
            } catch (err: any) {
                showToast(err.message || "Erreur enregistrement", "error");
            }
        });
    }

    function handleCredit() {
        if (!form.id) return;
        const amount = Number(creditAmount);
        if (!amount || isNaN(amount)) {
            showToast("Montant invalide", "error");
            return;
        }

        startTransition(async () => {
            try {
                const res = await topupPartnerBalanceAdmin(form.id!, amount, creditNote);
                showToast(`Compte crédité de +${amount} € HT ! Nouveau solde : ${res.newBalance.toFixed(2)} € HT`, "success");
                setForm((prev) => ({ ...prev, balance: res.newBalance }));
                setCreditAmount("");
                setCreditNote("");
                onSuccess();
            } catch (err: any) {
                showToast(err.message || "Erreur rechargement", "error");
            }
        });
    }

    function handleDelete() {
        if (!form.id) return;
        if (!confirm("Supprimer définitivement cet installateur ?")) return;

        startTransition(async () => {
            try {
                await deletePartnerAdmin(form.id!);
                showToast("Partenaire supprimé", "success");
                onSuccess();
                onClose();
            } catch (err: any) {
                showToast(err.message || "Erreur suppression", "error");
            }
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
            <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200">
                {/* Header */}
                <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-black tracking-tight">
                            {form.id ? "Paramétrer l'Installateur Partenaire" : "Nouveau Partenaire Installateur"}
                        </h2>
                        <p className="text-xs text-slate-400">
                            Tarifs négociés, portefeuille crédits et règles d'envoi automatique
                        </p>
                    </div>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                    {/* General info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-700 block mb-1">
                                Nom du contact / Référent commercial *
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => setField("name", e.target.value)}
                                placeholder="Nicolas Pavy"
                                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium outline-none focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-700 block mb-1">
                                Raison sociale de l'entreprise
                            </label>
                            <input
                                type="text"
                                value={form.company_name ?? ""}
                                onChange={(e) => setField("company_name", e.target.value)}
                                placeholder="IGUARD Protection Incendie"
                                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium outline-none focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-700 block mb-1">
                                Email de réception des leads *
                            </label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setField("email", e.target.value)}
                                placeholder="contact@iguardincendie.fr"
                                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium outline-none focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-700 block mb-1">
                                Téléphone portable direct
                            </label>
                            <input
                                type="text"
                                value={form.phone ?? ""}
                                onChange={(e) => setField("phone", e.target.value)}
                                placeholder="06 66 52 69 42"
                                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium outline-none focus:border-red-500"
                            />
                        </div>
                    </div>

                    {/* Departments & Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-700 block mb-1">
                                Tarif négocié par lead qualifié (€ HT)
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    value={form.price_per_lead}
                                    onChange={(e) => setField("price_per_lead", Number(e.target.value))}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold outline-none focus:border-red-500"
                                />
                                <span className="text-xs font-bold text-slate-500 shrink-0">€ HT / lead</span>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-700 block mb-1">
                                Départements couverts (séparés par des virgules)
                            </label>
                            <input
                                type="text"
                                value={(form.managed_departments || []).join(", ")}
                                onChange={(e) =>
                                    setField(
                                        "managed_departments",
                                        e.target.value
                                            .split(",")
                                            .map((d) => d.trim())
                                            .filter(Boolean)
                                    )
                                }
                                placeholder="93, 75, 92, 78, 94"
                                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium outline-none focus:border-red-500"
                            />
                        </div>
                    </div>

                    {/* Auto-Dispatch & Priority Switches */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={Boolean(form.auto_dispatch)}
                                onChange={(e) => setField("auto_dispatch", e.target.checked)}
                                className="mt-1 h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                            />
                            <div>
                                <span className="text-xs font-black text-slate-900 block">
                                    ⚡ Attribution & Envoi Automatique (Auto-dispatch)
                                </span>
                                <span className="text-[11px] text-slate-500">
                                    Dès qu'un dossier arrive sur ses départements avec un solde créditeur suffisant, la fiche complète lui est transmise immédiatement par email et son solde est débité automatiquement.
                                </span>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer pt-2 border-t border-slate-200">
                            <input
                                type="checkbox"
                                checked={Boolean(form.is_default)}
                                onChange={(e) => setField("is_default", e.target.checked)}
                                className="mt-1 h-4 w-4 rounded text-teal-600 focus:ring-teal-500"
                            />
                            <div>
                                <span className="text-xs font-black text-slate-900 block">
                                    🎯 Partenaire Prioritaire / Par Défaut
                                </span>
                                <span className="text-[11px] text-slate-500">
                                    Passe devant tous les autres prestataires pour les flux de ses départements.
                                </span>
                            </div>
                        </label>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                            Notes internes & historique commercial
                        </label>
                        <textarea
                            value={form.notes ?? ""}
                            onChange={(e) => setField("notes", e.target.value)}
                            placeholder="Ex: Lead test offert le 02/11 (Hugo Thizy - Boulotte). Accord 45 € HT / lead par virement."
                            rows={2}
                            className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none focus:border-red-500"
                        />
                    </div>

                    {/* WALLET TOPUP SECTION */}
                    {form.id && (
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                                    <Coins size={14} /> Recharger le Compte Partenaire (Crédit Manuel)
                                </span>
                                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                                    Solde actuel : {(form.balance || 0).toFixed(2)} € HT
                                </span>
                            </div>

                            <p className="text-[11px] text-slate-600">
                                Cliquez sur un pack prédéfini ou entrez le montant du virement reçu pour créditer immédiatement le portefeuille de l'installateur :
                            </p>

                            {/* Preset Buttons */}
                            <div className="flex flex-wrap gap-1.5">
                                {[
                                    { label: "+350 € (10 leads à 35€)", amount: 350, note: "Paiement pack 10 leads (35 € HT)" },
                                    { label: "+450 € (10 leads à 45€)", amount: 450, note: "Paiement pack 10 leads (45 € HT)" },
                                    { label: "+500 € (Pack Onboarding)", amount: 500, note: "Pack d'activation (500 € HT)" },
                                    { label: "+800 € (Pack Volume 25)", amount: 800, note: "Paiement pack volume 25 leads (800 € HT)" },
                                ].map((preset) => (
                                    <button
                                        key={preset.amount}
                                        type="button"
                                        onClick={() => {
                                            setCreditAmount(String(preset.amount));
                                            setCreditNote(preset.note);
                                        }}
                                        className="rounded-full border border-emerald-300 bg-white px-2.5 py-1 text-[11px] font-bold text-emerald-800 hover:bg-emerald-600 hover:text-white transition shadow-sm"
                                    >
                                        {preset.label}
                                    </button>
                                ))}
                            </div>

                            {/* Input + Action */}
                            <div className="flex items-center gap-2 pt-1">
                                <input
                                    type="number"
                                    placeholder="Montant en € HT"
                                    value={creditAmount}
                                    onChange={(e) => setCreditAmount(e.target.value)}
                                    className="w-32 rounded-xl border border-emerald-300 bg-white px-3 py-2 text-xs font-bold outline-none focus:border-emerald-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Note comptable (ex: Virement reçu le 02/11)"
                                    value={creditNote}
                                    onChange={(e) => setCreditNote(e.target.value)}
                                    className="flex-1 rounded-xl border border-emerald-300 bg-white px-3 py-2 text-xs outline-none focus:border-emerald-500"
                                />
                                <button
                                    type="button"
                                    disabled={pending || !creditAmount}
                                    onClick={handleCredit}
                                    className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700 transition disabled:opacity-50 shrink-0 shadow-sm"
                                >
                                    Créditer
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
                    {form.id ? (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
                        >
                            <Trash2 size={13} /> Supprimer
                        </button>
                    ) : <div />}

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            disabled={pending || !form.name || !form.email}
                            onClick={handleSave}
                            className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-black text-white hover:bg-slate-800 transition disabled:opacity-50"
                        >
                            {pending ? "Enregistrement..." : "Enregistrer l'Installateur"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
