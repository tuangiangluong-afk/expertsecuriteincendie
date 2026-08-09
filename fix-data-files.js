const fs = require('fs');
const path = require('path');

// 1. Rewrite brands.ts with Fire Safety Brands
const brandsContent = `export interface Brand {
    name: string;
    slug: string;
    description: string;
    type: string;
}

export const brands: Brand[] = [
    { name: "Desautel", slug: "desautel", description: "Leader français des extincteurs et systèmes d'extinction automatique.", type: "Extincteurs & RIA" },
    { name: "Sicli", slug: "sicli", description: "Matériel incendie haute performance certifié NF EN3 et NF Service.", type: "Extincteurs & Alarme" },
    { name: "Andrieu", slug: "andrieu", description: "Fabricant spécialisé dans la protection incendie industrielle et tertiaire.", type: "Extincteurs Poudre & Eau" },
    { name: "Eurofeu", slug: "eurofeu", description: "Equipements de sécurité incendie, désenfumage et signalétique.", type: "Systèmes Complets" }
];
`;
fs.writeFileSync('/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/data/brands.ts', brandsContent);

// 2. Rewrite vehicles.ts with Equipment Models
const vehiclesContent = `export interface Equipment {
    brand: string;
    model: string;
    slug: string;
    capacity: string;
    type: string;
}

export const vehicles: Equipment[] = [
    { brand: "Desautel", model: "Eau Pulvérisée 6L + Additif", slug: "desautel-eau-6l", capacity: "6 Litres", type: "Classes A, B" },
    { brand: "Sicli", model: "CO2 2kg Dioxydes de Carbone", slug: "sicli-co2-2kg", capacity: "2 kg", type: "Classe B & Électrique" },
    { brand: "Andrieu", model: "Poudre ABC 6kg Heavy Duty", slug: "andrieu-poudre-6kg", capacity: "6 kg", type: "Classes A, B, C" },
    { brand: "Eurofeu", model: "Extincteur 9L Eau Additivée", slug: "eurofeu-eau-9l", capacity: "9 Litres", type: "Classes A, B" }
];
`;
fs.writeFileSync('/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/data/vehicles.ts', vehiclesContent);

// 3. Clean powers / puissances.json
const puissancesContent = {
    "6L": {
        "title": "Extincteurs Eau Pulvérisée 6 Litres avec Additif",
        "meta_description": "Tout sur l'extincteur 6L avec additif. Matériel obligatoire en entreprise et ERP. Norme NF EN3.",
        "h1": "Extincteurs 6L Eau Additivée : La Référence en Entreprise",
        "introduction": "L'extincteur 6L eau pulvérisée avec additif est la base de la sécurité incendie dans les locaux professionnels et ERP.",
        "sections": [
            {
                "h2": "Spécifications Techniques NF EN3",
                "content": "<p>Protection efficace contre les feux de classe A (solides) et classe B (liquides). Conforme aux directives du Code du Travail R4227-29.</p>"
            }
        ],
        "faqs": [
            {
                "question": "Tous combien de temps faut-il vérifier un extincteur 6L ?",
                "answer": "La vérification annuelle par un technicien certifié est obligatoire d'après la norme NF S 61-919."
            }
        ]
    }
};
fs.writeFileSync('/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/data/puissances.json', JSON.stringify(puissancesContent, null, 2));

// 4. Clean comparatifs.json
const comparatifsContent = {
    "eau-vs-co2": {
        "title": "Extincteur Eau Pulvérisée vs Extincteur CO2 : Quel Choix ?",
        "meta_description": "Comparatif complet entre extincteur eau avec additif et extincteur CO2 (Dioxyde de carbone). Utilisation, risques et réglementation.",
        "h1": "Extincteur Eau Additivée vs CO2 : Guide de Choix ERP",
        "introduction": "Comprendre les différences entre l'extincteur à eau (feux de papier, bois, tissus) et l'extincteur CO2 (matériel électrique, armoires informatiques).",
        "sections": [
            {
                "h2": "Domaines d'Application",
                "content": "<p>L'extincteur à eau avec additif protège les surfaces générales. L'extincteur CO2 est indispensable dans les salles de serveurs et armoires électriques sans laisser de résidus.</p>"
            }
        ],
        "faqs": [
            {
                "question": "Peut-on utiliser l'eau sur un feu électrique ?",
                "answer": "L'eau avec additif est pulvérisée sans jet bâton jusqu'à 1000V, mais le CO2 reste fortement recommandé pour éviter d'endommager les composants."
            }
        ],
        "price_estimate": "À partir de 45€ HT avec vérification annuelle incluse."
    }
};
fs.writeFileSync('/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/data/comparatifs.json', JSON.stringify(comparatifsContent, null, 2));

console.log('Fixed data files successfully!');
