"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Building2,
    Briefcase,
    User,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    AlertTriangle,
    Shield,
    Phone,
    Mail,
    User2,
    Zap,
    MapPin,
    Store,
    FireExtinguisher,
    ClipboardCheck,
    Wrench,
    Ruler
} from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/slugify";

interface LeadFormProps {
    city: string;
    domain: string;
    themeColor?: 'red' | 'emerald' | 'amber' | 'purple' | 'red';
}

interface FormData {
    projectType: 'particulier' | 'commerce' | 'copro' | null;
    needType: 'achat_simple' | 'conformite' | 'maintenance' | null;
    surface: 'moins_50' | '50_200' | 'plus_200' | null;
    name: string;
    company: string;
    email: string;
    phone: string;
    zipCode: string;
    phoneConsent?: boolean;
}

const FRENCH_PHONE_REGEX = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
const ZIP_CODE_REGEX = /^\d{5}$/;

export default function LeadForm({
    city,
    domain,
    themeColor = 'red',
}: LeadFormProps) {
    const router = useRouter();
    const INITIAL_FORM_DATA: FormData = {
        projectType: null,
        needType: null,
        surface: null,
        name: "",
        company: "",
        email: "",
        phone: "",
        zipCode: "",
        phoneConsent: true
    };

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const themeStyles = {
        blue: {
            header: "from-red-600 to-red-700",
            button: "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
            light: "bg-red-50",
            border: "border-red-200",
            text: "text-red-600",
        },
        red: {
            header: "from-red-600 to-red-700",
            button: "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
            light: "bg-red-50",
            border: "border-red-200",
            text: "text-red-600",
        }
    };
    const palette = themeStyles[themeColor as keyof typeof themeStyles] || themeStyles.red;

    const totalSteps = 4;
    const progress = (step / totalSteps) * 100;

    const getLeadScore = (): number => {
        let score = 0;
        if (formData.projectType === 'commerce') score += 30;
        if (formData.projectType === 'copro') score += 30;
        if (formData.needType === 'conformite') score += 50;
        if (formData.needType === 'maintenance') score += 50;
        if (formData.surface === 'plus_200') score += 50;
        return score;
    };

    const handleOptionSelect = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (status === 'error') {
            setStatus('idle');
            setErrorMessage("");
        }
    };

    const canProceed = (): boolean => {
        switch (step) {
            case 1: return formData.projectType !== null && formData.projectType !== 'particulier';
            case 2: return formData.needType !== null;
            case 3: return formData.surface !== null;
            case 4:
                return (
                    formData.name.trim() !== "" &&
                    formData.email.includes("@") &&
                    ZIP_CODE_REGEX.test(formData.zipCode.trim()) &&
                    formData.phone.trim() !== "" &&
                    FRENCH_PHONE_REGEX.test(formData.phone.replace(/\s/g, ''))
                );
            default: return false;
        }
    };

    const nextStep = () => {
        if (canProceed() && step < totalSteps) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async () => {
        if (!canProceed()) {
            setStatus('error');
            setErrorMessage("Veuillez remplir correctement tous les champs obligatoires.");
            return;
        }

        setStatus('loading');

        try {
            const payload = {
                ...formData,
                city,
                domain,
                leadScore: getLeadScore(),
                timestamp: new Date().toISOString(),
                phoneConsent: true,
            };

            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Erreur lors de l\'envoi');
            }

            setStatus('success');
        } catch (error: unknown) {
            console.error("Submission Error:", error);
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue');
        }
    };

    if (status === 'success') {
        return (
            <div className={`bg-gradient-to-br ${palette.light} border ${palette.border} rounded-3xl p-8 text-center`}>
                <div className={`mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6`}>
                    <CheckCircle className={palette.text} size={40} />
                </div>
                <h3 className={`text-2xl font-bold ${palette.text} mb-3`}>
                    Demande envoyée avec succès !
                </h3>
                <p className="text-neutral-700 mb-6">
                    Nos experts partenaires en sécurité incendie vous contacteront sous 24h pour votre projet à <strong>{city}</strong>.
                </p>
            </div>
        );
    }

    const OptionButton = ({
        selected, onClick, icon: Icon, label, sublabel, highlight = false
    }: {
        selected: boolean; onClick: () => void; icon: React.ElementType; label: string; sublabel?: string; highlight?: boolean;
    }) => (
        <button
            onClick={onClick}
            className={`
                relative w-full p-5 rounded-2xl border-2 transition-all duration-200
                flex items-center gap-4 text-left
                ${selected ? `${palette.border} ${palette.light} shadow-md` : 'border-neutral-200 bg-white hover:bg-neutral-50'}
            `}
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${selected ? `bg-white ${palette.text}` : 'bg-neutral-100 text-neutral-600'}`}>
                <Icon size={24} />
            </div>
            <div>
                <div className={`font-bold ${selected ? 'text-neutral-900' : 'text-neutral-800'}`}>{label}</div>
                {sublabel && <div className="text-sm text-neutral-500 mt-0.5">{sublabel}</div>}
            </div>
            {selected && <div className="absolute top-3 right-3"><CheckCircle className={palette.text} size={20} /></div>}
        </button>
    );

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
            <div className={`bg-gradient-to-r ${palette.header} p-6 text-white`}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Diagnostic & Devis Sur-Mesure</h3>
                        <p className="text-white/80 text-sm">Sécurité Incendie B2B</p>
                    </div>
                </div>
                <div className="relative">
                    <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white transition-all duration-500 ease-out rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-white/80">
                        <span>Étape {step}/{totalSteps}</span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {step === 1 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-6">Vous êtes ?</h4>
                        <div className="space-y-3">
                            <OptionButton
                                selected={formData.projectType === 'particulier'}
                                onClick={() => handleOptionSelect('projectType', 'particulier')}
                                icon={User}
                                label="Particulier"
                                sublabel="Pour votre domicile ou garage personnel"
                            />
                            <OptionButton
                                selected={formData.projectType === 'commerce'}
                                onClick={() => handleOptionSelect('projectType', 'commerce')}
                                icon={Store}
                                label="Commerce / ERP / Entreprise"
                                sublabel="Magasins, Hôtels, Bureaux, Entrepôts"
                            />
                            <OptionButton
                                selected={formData.projectType === 'copro'}
                                onClick={() => handleOptionSelect('projectType', 'copro')}
                                icon={Building2}
                                label="Copropriété / Syndic"
                                sublabel="Parties communes d'immeubles"
                            />
                        </div>

                        {formData.projectType === 'particulier' && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                                <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={20} />
                                <div>
                                    <p className="text-sm font-bold text-red-800">
                                        Service Réservé aux Professionnels
                                    </p>
                                    <p className="text-xs text-red-600 mt-1">
                                        Désolé, notre réseau national n'équipe que les Professionnels, ERP et Copropriétés. Nous ne vendons pas aux particuliers.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-6">Quel est votre besoin ?</h4>
                        <div className="space-y-3">
                            <OptionButton
                                selected={formData.needType === 'achat_simple'}
                                onClick={() => handleOptionSelect('needType', 'achat_simple')}
                                icon={FireExtinguisher}
                                label="Achat d'un seul extincteur"
                            />
                            <OptionButton
                                selected={formData.needType === 'conformite'}
                                onClick={() => handleOptionSelect('needType', 'conformite')}
                                icon={ClipboardCheck}
                                label="Mise en conformité complète"
                                sublabel="Extincteurs, BAES, Plans, Alarmes"
                            />
                            <OptionButton
                                selected={formData.needType === 'maintenance'}
                                onClick={() => handleOptionSelect('needType', 'maintenance')}
                                icon={Wrench}
                                label="Reprise de contrat de maintenance"
                                sublabel="Vérification annuelle obligatoire"
                            />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-neutral-900 mb-6">Surface estimée du local ?</h4>
                        <div className="space-y-3">
                            <OptionButton
                                selected={formData.surface === 'moins_50'}
                                onClick={() => handleOptionSelect('surface', 'moins_50')}
                                icon={Ruler}
                                label="Moins de 50 m²"
                            />
                            <OptionButton
                                selected={formData.surface === '50_200'}
                                onClick={() => handleOptionSelect('surface', '50_200')}
                                icon={Ruler}
                                label="Entre 50 et 200 m²"
                            />
                            <OptionButton
                                selected={formData.surface === 'plus_200'}
                                onClick={() => handleOptionSelect('surface', 'plus_200')}
                                icon={Ruler}
                                label="Plus de 200 m² (ou multi-sites)"
                            />
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-5">
                        <h4 className="text-xl font-bold text-neutral-900 mb-6">Vos coordonnées pour l'étude</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                                    <User2 size={16} /> Nom & Prénom du contact
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Jean Dupont"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                                    <Briefcase size={16} /> Raison sociale ou Nom de la Copropriété (facultatif)
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    placeholder="Syndic Les Lilas / Hôtel de la Gare"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">Code Postal</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        placeholder="75000"
                                        maxLength={5}
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-red-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2"><Mail size={16} /> Email pro</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="contact@societe.com"
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-red-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2"><Phone size={16} /> Téléphone direct</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="06 12 34 56 78"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-red-500 outline-none"
                                />
                            </div>
                        </div>

                        
                            {/* Phone Consent Checkbox (RGPD / Bloctel) */}
                            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-left">
                                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        name="phoneConsent"
                                        checked={formData.phoneConsent === true}
                                        onChange={(e) => {
                                            setFormData(prev => ({ ...prev, phoneConsent: e.target.checked }));
                                            if (status === 'error') {
                                                setStatus('idle');
                                                setErrorMessage("");
                                            }
                                        }}
                                        className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 accent-blue-600 shrink-0"
                                    />
                                    <span className="text-[11px] text-neutral-600 leading-tight">
                                        J&apos;accepte d&apos;être contacté par téléphone par les services qui prendront en charge ma demande de devis pour la qualifier et effectuer une visite technique.</span>
                                </label>
                            </div>

                        {status === 'error' && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                {errorMessage}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex gap-3 mt-8 items-start">
                    {step > 1 && (
                        <button onClick={prevStep} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-50">
                            <ArrowLeft size={18} /> Retour
                        </button>
                    )}
                    {step < totalSteps ? (
                        <button
                            onClick={nextStep}
                            disabled={!canProceed()}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-lg transition ${canProceed() ? `bg-gradient-to-r ${palette.button} text-white shadow-lg` : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'}`}
                        >
                            Continuer <ArrowRight size={20} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={status === 'loading'}
                            className={`flex-1 py-4 px-6 rounded-xl text-lg font-bold text-white shadow-xl ${status === 'loading' ? 'bg-slate-400' : `bg-gradient-to-r ${palette.button}`}`}
                        >
                            {status === 'loading' ? "Envoi en cours..." : "Demander mon Diagnostic Offert"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
