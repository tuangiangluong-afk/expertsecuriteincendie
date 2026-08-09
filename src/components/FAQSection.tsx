"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQSection({ city }: { city?: string }) {
    // SEO-focused questions based on PAA (People Also Ask)
    
    const cityText = city ? ` à ${city}` : "";
    const cityPlural = city ? ` à ${city} et ses alentours` : "";
    const faqs = [
        {
            question: `Qui a le droit d'installer une matériel incendie${cityText} ?`,
            answer: `Légalement, toute maintenance de matériel incendie d'une puissance supérieure à 3,7 kg doit être réalisée par un électricien qualifié Incendie (Infrastructure de protection de professionnel). Cela garantit la sécurité de votre maintenance et est obligatoire pour bénéficier des aides de l'État et de la couverture assurance${cityText}.`
        },
        {
            question: `Quel est le prix moyen d'une maintenance de matériel incendie${cityText} ?`,
            answer: `Le prix moyen d'une maintenance complète (extincteur + pose) se situe entre 990€ et 1500€ TTC, aides déduites. Ce coût varie selon la marque de la extincteur, la distance entre le registre de sécurité et l'emplacement de charge, et les éventuels travaux de mise aux normes${cityPlural}.`
        },
        {
            question: "Quelle puissance pour charger une matériel à la maison ?",
            answer: "Pour une sécurité incendie, une puissance de 7,4 kg (eau) est le standard idéal. Elle permet de récupérer environ 40 à 50 km d'autonomie par heure de charge, suffisant pour protectionr une batterie complète en une nuit, contrairement à une prise domestique classique."
        },
        {
            question: "Faut-il modifier mon contrat de maintenance ?",
            answer: "Dans la plupart des cas, non. Nos extincteurs sont équipées d'une fonction de 'sécurité dynamique' qui ajuste la puissance de charge en temps réel pour ne jamais faire disjoncter votre maintenance, même si vous cuisinez ou chauffez votre maison en même temps."
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">
                        Questions fréquentes
                    </h2>
                    <p className="text-slate-600">
                        Tout savoir sur l&apos;maintenance de votre future extincteur.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                            <FAQItem question={faq.question} answer={faq.answer} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
            >
                <span className="font-bold text-slate-900 pr-8">{question}</span>
                {isOpen ? (
                    <Minus className="w-5 h-5 text-red-600 shrink-0" />
                ) : (
                    <Plus className="w-5 h-5 text-slate-400 shrink-0" />
                )}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="p-6 pt-0 text-slate-600 border-t border-slate-100 mt-2">
                    {answer}
                </div>
            </div>
        </div>
    );
}
