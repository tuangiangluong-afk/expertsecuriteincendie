"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Building2, CalendarClock, CheckCircle, ClipboardCheck, Mail, MapPin, Phone, ShieldCheck, User2 } from "lucide-react";

interface RegulatoryLeadFormProps {
    domain?: string;
    city?: string;
    defaultNeed?: "ssi_triennale" | "q18" | "commission_erp";
}

type Need = "ssi_triennale" | "q18" | "commission_erp" | "mise_aux_normes" | "autre";
type Establishment = "hotel" | "commerce" | "ehpad" | "bureau" | "entrepot" | "restaurant" | "autre";
type Timeline = "moins_30" | "1_3_mois" | "plus_3_mois" | "information";

type Attribution = {
    source: string;
    medium: string;
    campaign: string;
    term: string;
    content: string;
    landing_page: string;
    referrer: string;
};

function getStoredAttribution(): Attribution {
    const fallback: Attribution = {
        source: "seo-reglementaire",
        medium: "organic",
        campaign: "",
        term: "",
        content: "",
        landing_page: typeof window !== "undefined" ? window.location.pathname : "",
        referrer: typeof document !== "undefined" ? document.referrer || "direct" : "direct",
    };

    if (typeof window === "undefined") return fallback;

    try {
        const cookie = document.cookie
            .split(";")
            .map((part) => part.trim())
            .find((part) => part.startsWith("lead_attribution="));
        const raw = cookie ? decodeURIComponent(cookie.slice("lead_attribution=".length)) : sessionStorage.getItem("lead_attribution");
        if (!raw) return fallback;

        const stored = JSON.parse(raw) as Partial<Attribution>;
        return {
            source: stored.source || fallback.source,
            medium: stored.medium || fallback.medium,
            campaign: stored.campaign || fallback.campaign,
            term: stored.term || fallback.term,
            content: stored.content || fallback.content,
            landing_page: stored.landing_page || fallback.landing_page,
            referrer: stored.referrer || fallback.referrer,
        };
    } catch {
        return fallback;
    }
}

interface FormState {
    establishment: Establishment | null;
    need: Need | null;
    timeline: Timeline | null;
    company: string;
    name: string;
    email: string;
    phone: string;
    postalCode: string;
    phoneConsent: boolean;
}

const PHONE = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
const POSTAL_CODE = /^\d{5}$/;

const needs: Array<{ value: Need; label: string; detail: string }> = [
    { value: "ssi_triennale", label: "Vérification réglementaire SSI", detail: "Préparer ou actualiser le dossier de vérification de votre système de sécurité incendie." },
    { value: "q18", label: "Contrôle des installations électriques", detail: "Identifier le bon rapport et le bon intervenant pour vos installations et votre assureur." },
    { value: "commission_erp", label: "Préparation d'une commission de sécurité", detail: "Faire le point sur les documents, équipements et écarts à traiter avant la visite." },
    { value: "mise_aux_normes", label: "Mise en conformité après un rapport", detail: "Recevoir une orientation vers les intervenants adaptés aux réserves constatées." },
    { value: "autre", label: "Autre besoin réglementaire", detail: "Un conseiller qualifie votre demande et vous oriente." },
];

const establishments: Array<{ value: Establishment; label: string }> = [
    { value: "hotel", label: "Hôtel / hébergement" },
    { value: "commerce", label: "Commerce / restaurant" },
    { value: "ehpad", label: "EHPAD / établissement de santé" },
    { value: "bureau", label: "Bureaux / tertiaire" },
    { value: "entrepot", label: "Entrepôt / site industriel" },
    { value: "autre", label: "Autre établissement professionnel" },
];

const timelines: Array<{ value: Timeline; label: string }> = [
    { value: "moins_30", label: "Dans moins de 30 jours" },
    { value: "1_3_mois", label: "Dans 1 à 3 mois" },
    { value: "plus_3_mois", label: "Dans plus de 3 mois" },
    { value: "information", label: "Je cherche d'abord une orientation" },
];

export default function RegulatoryLeadForm({ domain = "expertsecuriteincendie.fr", city = "France", defaultNeed }: RegulatoryLeadFormProps) {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState("");
    const [form, setForm] = useState<FormState>({
        establishment: null,
        need: defaultNeed || null,
        timeline: null,
        company: "",
        name: "",
        email: "",
        phone: "",
        postalCode: "",
        phoneConsent: false,
    });

    const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((current) => ({ ...current, [key]: value }));
        if (status === "error") { setStatus("idle"); setError(""); }
    };

    const canContinue = () => {
        if (step === 1) return form.establishment !== null;
        if (step === 2) return form.need !== null;
        if (step === 3) return form.timeline !== null;
        return Boolean(form.company.trim() && form.name.trim() && form.email.includes("@") && PHONE.test(form.phone.replace(/\s/g, "")) && POSTAL_CODE.test(form.postalCode) && form.phoneConsent);
    };

    const submit = async () => {
        if (!canContinue()) { setStatus("error"); setError("Renseignez tous les champs obligatoires et cochez l'autorisation de rappel."); return; }
        setStatus("loading");
        const now = new Date().toISOString();
        const attribution = getStoredAttribution();
        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    projectType: "erp",
                    needType: form.need,
                    establishmentType: form.establishment,
                    timeline: form.timeline,
                    company: form.company,
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    zipCode: form.postalCode,
                    postalCode: form.postalCode,
                    city,
                    domain,
                    niche: "verifications_reglementaires_erp",
                    leadScore: form.timeline === "moins_30" ? 90 : 70,
                    timestamp: now,
                    phoneConsent: true,
                    consentText: "J'accepte d'être contacté par téléphone au sujet de ma demande de vérification ou de mise en conformité.",
                    consentDate: now,
                    consentUrl: typeof window !== "undefined" ? window.location.href : `https://${domain}`,
                    attribution: {
                        ...attribution,
                        // Keep the conversion page distinct from the first-touch landing page.
                        conversion_page: typeof window !== "undefined" ? window.location.pathname : attribution.landing_page,
                    },
                }),
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(data.error || "La demande n'a pas pu être envoyée.");
            setStatus("success");
        } catch (cause) {
            setStatus("error");
            setError(cause instanceof Error ? cause.message : "Une erreur est survenue.");
        }
    };

    if (status === "success") return (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
            <CheckCircle className="mx-auto mb-4 text-emerald-600" size={42} />
            <h3 className="text-xl font-bold text-emerald-900">Demande reçue</h3>
            <p className="mt-2 text-sm text-emerald-800">Votre demande est en cours de qualification. Un interlocuteur vous recontactera pour vérifier le périmètre et le calendrier.</p>
        </div>
    );

    const Option = ({ label, detail, selected, onClick }: { label: string; detail?: string; selected: boolean; onClick: () => void }) => (
        <button type="button" onClick={onClick} className={`relative w-full rounded-xl border-2 p-4 text-left transition ${selected ? "border-red-500 bg-red-50" : "border-slate-200 bg-white hover:border-red-300"}`}>
            <span className="block font-semibold text-slate-900">{label}</span>
            {detail && <span className="mt-1 block text-xs leading-relaxed text-slate-500">{detail}</span>}
            {selected && <CheckCircle size={18} className="absolute right-3 top-3 text-red-600" />}
        </button>
    );

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="bg-gradient-to-r from-red-700 to-red-600 p-6 text-white">
                <div className="flex items-center gap-3"><ShieldCheck size={25} /><div><h3 className="font-bold">Qualification réglementaire ERP</h3><p className="text-sm text-red-100">SSI, électricité et commission de sécurité</p></div></div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-black/20"><div className="h-full rounded-full bg-white transition-all" style={{ width: `${(step / 4) * 100}%` }} /></div>
                <p className="mt-2 text-xs text-red-100">Étape {step}/4</p>
            </div>
            <div className="space-y-5 p-6">
                {step === 1 && <div><h4 className="mb-4 text-xl font-bold text-slate-900">Quel type d'établissement ?</h4><div className="space-y-2">{establishments.map((item) => <Option key={item.value} label={item.label} selected={form.establishment === item.value} onClick={() => update("establishment", item.value)} />)}</div></div>}
                {step === 2 && <div><h4 className="mb-4 text-xl font-bold text-slate-900">Quel est votre besoin principal ?</h4><div className="space-y-2">{needs.map((item) => <Option key={item.value} label={item.label} detail={item.detail} selected={form.need === item.value} onClick={() => update("need", item.value)} />)}</div></div>}
                {step === 3 && <div><h4 className="mb-4 text-xl font-bold text-slate-900">Quand devez-vous avancer ?</h4><div className="space-y-2">{timelines.map((item) => <Option key={item.value} label={item.label} selected={form.timeline === item.value} onClick={() => update("timeline", item.value)} />)}</div><p className="mt-4 text-xs text-slate-500">Le délai sert à prioriser la qualification ; il ne constitue pas une promesse de disponibilité ou de délai réglementaire.</p></div>}
                {step === 4 && <div className="space-y-4"><h4 className="mb-4 text-xl font-bold text-slate-900">Qui doit être recontacté ?</h4>
                    <label className="block text-sm font-medium text-slate-700"><span className="mb-1 flex items-center gap-2"><Building2 size={16} /> Entreprise / établissement *</span><input value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Hôtel, société, syndic..." className="w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-red-500" /></label>
                    <label className="block text-sm font-medium text-slate-700"><span className="mb-1 flex items-center gap-2"><User2 size={16} /> Nom du contact *</span><input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Nom et prénom" className="w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-red-500" /></label>
                    <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium text-slate-700"><span className="mb-1 flex items-center gap-2"><MapPin size={16} /> Code postal *</span><input value={form.postalCode} onChange={(e) => update("postalCode", e.target.value.replace(/\D/g, "").slice(0, 5))} inputMode="numeric" placeholder="75000" className="w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-red-500" /></label><label className="block text-sm font-medium text-slate-700"><span className="mb-1 flex items-center gap-2"><Mail size={16} /> Email professionnel *</span><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="contact@entreprise.fr" className="w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-red-500" /></label></div>
                    <label className="block text-sm font-medium text-slate-700"><span className="mb-1 flex items-center gap-2"><Phone size={16} /> Téléphone *</span><input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="06 12 34 56 78" className="w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-red-500" /></label>
                    <label className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600"><input type="checkbox" checked={form.phoneConsent} onChange={(e) => update("phoneConsent", e.target.checked)} className="mt-0.5" />J'accepte d'être rappelé au sujet de cette demande par les intervenants susceptibles de la prendre en charge.</label>
                </div>}
                {status === "error" && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                <div className="flex gap-3 pt-2">{step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-3 font-medium text-slate-700"><ArrowLeft size={17} /> Retour</button>}{step < 4 ? <button type="button" disabled={!canContinue()} onClick={() => setStep(step + 1)} className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 font-bold text-white ${canContinue() ? "bg-red-600 hover:bg-red-700" : "cursor-not-allowed bg-slate-300"}`}>Continuer <ArrowRight size={17} /></button> : <button type="button" disabled={status === "loading"} onClick={submit} className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-bold text-white hover:bg-red-700 disabled:bg-slate-400">{status === "loading" ? "Envoi..." : "Demander une qualification"}</button>}</div>
            </div>
        </div>
    );
}
