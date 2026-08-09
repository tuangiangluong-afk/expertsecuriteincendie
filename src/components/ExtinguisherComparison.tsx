import React from 'react';
import { Flame, Droplets, Wind, ShieldAlert, Check } from 'lucide-react';

export default function ExtinguisherComparison({ themeColor = 'blue' }: { themeColor?: string }) {
    const types = [
        {
            name: "Eau Pulvérisée",
            icon: Droplets,
            capacity: "6L / 9L",
            usage: "Feux de classe A (solides) et B (liquides)",
            pros: [
                "Extrêmement efficace sur les feux de bois, papier, carton",
                "Additif formant un film isolant sur les liquides",
                "Effet de refroidissement important",
                "Facile à nettoyer après usage"
            ],
            cons: ["Danger si utilisé sur des feux d'origine électrique de forte puissance"],
            bestFor: "Bureaux, Commerces, Habitations, Entrepôts secs"
        },
        {
            name: "Dioxyde de Carbone (CO2)",
            icon: Wind,
            capacity: "2kg / 5kg",
            usage: "Feux de classe B et d'origine électrique",
            pros: [
                "Aucun résidu après utilisation (gaz propre)",
                "Idéal pour le matériel électrique et informatique",
                "Étouffe le feu en diminuant l'oxygène",
                "Ne gèle pas"
            ],
            cons: ["Peu efficace à l'extérieur (vent)", "Risque d'asphyxie en milieu confiné", "Choc thermique très froid"],
            bestFor: "Salles informatiques, Tableaux électriques, Cuisines, Laboratoires"
        },
        {
            name: "Poudre ABC",
            icon: Flame,
            capacity: "6kg / 9kg",
            usage: "Feux de classe A, B et C (gaz)",
            pros: [
                "Très polyvalent (solides, liquides, gaz)",
                "Extinction extrêmement rapide",
                "Peut être utilisé en extérieur",
                "Utilisable sur feux d'origine électrique basse tension"
            ],
            cons: ["Poudre très volatile et corrosive", "Difficile à nettoyer", "Réduit considérablement la visibilité"],
            bestFor: "Parkings extérieurs, Garages, Entrepôts de produits dangereux, Chaufferies"
        }
    ];

    return (
        <section className="py-20 bg-neutral-50" id="comparatif-extincteurs">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                        <ShieldAlert size={18} />
                        Faites le bon choix
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                        Quel type d'extincteur pour vos locaux ?
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Chaque risque d'incendie nécessite un agent extincteur spécifique. Découvrez lequel est adapté à votre activité.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {types.map((type, index) => (
                        <div key={index} className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
                            <div className="p-8 border-b border-neutral-100 bg-gradient-to-br from-white to-neutral-50 text-center">
                                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 bg-red-100 text-red-600`}>
                                    <type.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-2">{type.name}</h3>
                                <p className="text-neutral-500 font-medium mb-4">{type.capacity}</p>
                                <div className="inline-block bg-neutral-900 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                                    {type.usage}
                                </div>
                            </div>
                            
                            <div className="p-8 space-y-6">
                                <div>
                                    <h4 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                                        Avantages
                                    </h4>
                                    <ul className="space-y-3">
                                        {type.pros.map((pro, i) => (
                                            <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm">
                                                <Check size={18} className="text-green-500 shrink-0 mt-0.5" />
                                                <span>{pro}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div>
                                    <h4 className="font-bold text-neutral-900 mb-3">Idéal pour :</h4>
                                    <p className="text-sm text-neutral-600 bg-neutral-100 p-3 rounded-lg border border-neutral-200">
                                        {type.bestFor}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
