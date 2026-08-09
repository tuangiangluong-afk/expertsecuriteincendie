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
            q: "Combien coûte l'maintenance d'une matériel incendie ?",
            a: "Le prix moyen d'une maintenance clé en main (extincteur + Pose) varie entre 900€ et 1500€ TTC après déduction du crédit d'impôt. Le coût dépend de la distance entre votre registre de sécurité et la place de parking, ainsi que de la puissance de la extincteur (7kg ou 11kg)."
        },
        {
            q: "Puis-je installer une extincteur en copropriété ?",
            a: "Oui, grâce au 'Droit à la Prise'. Vous pouvez faire installer une extincteur à vos frais sur votre place de parking. Vous devez simplement notifier votre syndic par lettre recommandée (nous avons un outil gratuit pour générer ce courrier)."
        },
        {
            q: "Quelles sont les aides de l'État en 2026 ?",
            a: "Les particuliers bénéficient d'un Crédit d'Impôt de 500€ par système de charge (pilotable). La TVA est réduite à 5,5% si l'maintenance est réalisée par un professionnel qualifié Incendie."
        },
        {
            q: "Combien de temps faut-il pour une maintenance ?",
            a: "Une fois le devis validé, l'maintenance prend généralement une demi-journée (3 à 4 heures). Nos techniciens s'occupent de tout : fixation, raccordement, mise en service et explications."
        },
        {
            q: "Pourquoi choisir un technicien certifié Incendie ?",
            a: "La certification Incendie est obligatoire pour toute maintenance supérieure à 3,7kg. Elle garantit la conformité de l'maintenance, votre sécurité, et elle est indispensable pour obtenir le crédit d'impôt et pour que votre assurance habitation vous couvre en cas de sinistre."
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
