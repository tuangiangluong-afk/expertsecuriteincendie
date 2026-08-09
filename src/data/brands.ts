export interface Brand {
    name: string;
    slug: string;
    description: string;
    type: string;
    models: string[];
}

export type BrandData = Brand;

export const brands: Brand[] = [
    { name: "Desautel", slug: "desautel", description: "Leader français des extincteurs et systèmes d'extinction automatique.", type: "Extincteurs & RIA", models: ["Eau 6L", "CO2 2kg", "Poudre 6kg"] },
    { name: "Sicli", slug: "sicli", description: "Matériel incendie haute performance certifié NF EN3 et NF Service.", type: "Extincteurs & Alarme", models: ["Star 6", "Star 9", "Extinction Auto"] },
    { name: "Andrieu", slug: "andrieu", description: "Fabricant spécialisé dans la protection incendie industrielle et tertiaire.", type: "Extincteurs Poudre & Eau", models: ["Pro 6L", "Heavy 9L", "CO2 Pro"] },
    { name: "Eurofeu", slug: "eurofeu", description: "Equipements de sécurité incendie, désenfumage et signalétique.", type: "Systèmes Complets", models: ["Hydrex", "Poudre ABC", "Bio 6L"] }
];
