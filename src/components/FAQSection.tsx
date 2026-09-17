"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQSection({ city }: { city?: string }) {
    // SEO-focused questions based on PAA (People Also Ask)
    
    const cityText = city ? ` à ${city}` : "";
    const cityPlural = city ? ` à ${city} et dans les communes limitrophes` : "";
    const faqs = [
        {
            question: `Qui a le droit de vérifier et d'installer du matériel incendie${cityText} ?`,
            answer: `La vérification des extincteurs portatifs relève d'un technicien compétent, selon la règle APSAD R4 et la norme NF EN 3 ; celle des blocs autonomes d'éclairage de sécurité (BAES) relève de la NF C 71-820 et de la règle APSAD R12. Ces opérations doivent être tracées dans le registre de sécurité de l'établissement, qui est la première pièce demandée en cas de contrôle ou de sinistre${cityText}.`
        },
        {
            question: `Quel est le prix moyen de la maintenance des extincteurs${cityText} ?`,
            answer: `Comptez 15 à 30 € HT par appareil pour la vérification annuelle, et 29,99 à 50 € HT en forfait complet (vérification, recharge si nécessaire, pièces d'usure et replacement des appareils irréparables). Un extincteur à eau pulvérisée de 6 litres à installer coûte environ 89 à 149 €, support et signalétique compris. Ces tarifs varient selon le nombre d'appareils, leur capacité et l'accessibilité des locaux${cityPlural}.`
        },
        {
            question: "Combien d'extincteurs faut-il prévoir dans un local professionnel ?",
            answer: "Le Code du travail impose au minimum un extincteur à eau pulvérisée de 6 litres pour 200 m² de plancher, avec au moins un appareil par niveau. Au-delà, le nombre dépend des classes de feu présentes : des extincteurs au CO2 pour les armoires électriques et les salles serveurs, de la poudre ABC pour les garages, les ateliers et les zones de stockage. Un extincteur doit être placé à moins de 15 m de tout point à risque et à 1,20 m du sol au maximum."
        },
        {
            question: "Que se passe-t-il si mes extincteurs ne sont plus à jour ?",
            answer: "Un appareil dont la vérification annuelle est dépassée n'est plus considéré comme conforme par votre assureur : en cas de sinistre, la couverture peut être réduite, et la commission de sécurité peut notifier une mise en demeure avec un délai d'exécution. Nos techniciens remettent le registre de sécurité à jour, replombent chaque appareil vérifié et vous délivrent l'attestation de conformité."
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
                        Tout savoir sur la maintenance de vos extincteurs et de vos BAES.
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
