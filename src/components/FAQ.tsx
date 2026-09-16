"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQProps {
    city?: string;
    type?: string;
    themeColor?: 'red' | 'emerald' | 'amber' | 'purple';
}

export default function FAQ({ city, type, themeColor = 'red' }: FAQProps) {
    const questions = [
        {
            q: "Combien coûte la maintenance d'une matériel incendie ?",
            a: "Le prix d'une mise en conformité complète (extincteurs, supports, signalétique et vérification) se situe le plus souvent entre 300 € et 1 500 € HT pour un ERP de petite surface. Le montant dépend du nombre d'appareils nécessaires et du niveau de risque de vos locaux."
        },
        {
            q: "Puis-je installer une extincteur en copropriété ?",
            a: "Oui. Le matériel de sécurité incendie des parties communes relève du syndicat de copropriété, mais rien ne vous empêche d'équiper votre logement ou votre box : extincteur adapté au risque, détecteur de fumée et, si besoin, porte coupe-feu. Nous fournissons le dossier technique à présenter en assemblée générale."
        },
        {
            q: "Quelles sont les aides de l'État en 2026 ?",
            a: "Aucune aide d'État n'est fléchée sur l'achat ou l'entretien d'extincteurs pour les particuliers. Le seul gain concret est la réduction de prime accordée par certains contrats d'assurance habitation, et pour les entreprises la déductibilité de la dépense."
        },
        {
            q: "Combien de temps faut-il pour une maintenance ?",
            a: "Une fois le devis validé, la maintenance prend généralement une demi-journée (3 à 4 heures). Nos techniciens s'occupent de tout : fixation, raccordement, mise en service et explications."
        },
        {
            q: "Pourquoi choisir un technicien certifié Incendie ?",
            a: "La vérification annuelle est obligatoire pour tous les extincteurs, quelle que soit leur capacité, et elle doit être consignée dans le registre de sécurité. C'est ce suivi qui garantit la conformité de l'établissement et permet à l'assureur de couvrir un sinistre."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const themeStyles = {
        red: 'bg-red-100 text-red-700',
        emerald: 'bg-emerald-100 text-emerald-700',
        amber: 'bg-amber-100 text-amber-700',
        purple: 'bg-purple-100 text-purple-700'
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": questions.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };
    const badgeClass = themeStyles[themeColor] || themeStyles.red;

    return (
        <section className="py-20 bg-slate-50 border-t border-slate-200">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${badgeClass}`}>
                        Questions Fréquentes
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                        Vous avez des questions ?
                    </h2>
                    <p className="text-xl text-slate-600 mt-4">
                        Nous avons les réponses pour votre projet de protection.
                    </p>
                </div>

                <div className="space-y-4">
                    {questions.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-bold text-lg text-slate-900 pr-8">{item.q}</span>
                                <ChevronDown
                                    className={`text-slate-400 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                                />
                            </button>

                            <div
                                className={`
                                    overflow-hidden transition-all duration-300 ease-in-out
                                    ${openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                                `}
                            >
                                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                                    {item.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
