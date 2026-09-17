/**
 * Appareils extincteurs pris en charge, décrits par ce qui est réellement
 * vérifiable : la marque, l'agent extincteur, la capacité et les classes de
 * feu (NF EN 2).
 *
 * Historique : la version précédente contenait des modèles fabriqués
 * (« Poudre ABC 6kg Heavy Duty », « Eau Additivée », « CO2 2kg Dioxydes de
 * Carbone ») qui ne correspondent à aucun produit publié, ainsi qu'une marque
 * (Andrieu) dont le site constructeur n'est pas accessible. Aucun de ces
 * libellés ne subsiste.
 */

export interface Equipment {
    id: string;
    brand: string;
    /** Libellé factuel : gamme constructeur publiée si elle existe, sinon l'agent */
    model: string;
    slug: string;
    capacity: string;
    /** Classes de feu couvertes (NF EN 2) */
    type: string;
}

export type Vehicle = Equipment;

export const vehicles: Equipment[] = [
    { id: "desautel-eau-6l", brand: "Desautel", model: "Eau + additif 6 L", slug: "desautel-eau-6l", capacity: "6 L", type: "Classes A et B" },
    { id: "sicli-ingenio-e6-e9-ab", brand: "Sicli", model: "INgénio E6-E9 AB (eau + additif)", slug: "sicli-ingenio-e6-e9-ab", capacity: "6 L et 9 L", type: "Classes A et B" },
    { id: "sicli-ingenio-co2", brand: "Sicli", model: "INgénio CO2", slug: "sicli-ingenio-co2", capacity: "2 kg et 5 kg", type: "Classe B et feux d'origine électrique" },
    { id: "sicli-integral", brand: "Sicli", model: "INtégral (eau + additif sans fluor)", slug: "sicli-integral", capacity: "6 L et 9 L", type: "Classes A et B" },
    { id: "eurofeu-eau-9l", brand: "Eurofeu", model: "Eau + additif 9 L", slug: "eurofeu-eau-9l", capacity: "9 L", type: "Classes A et B" },
    { id: "eurofeu-eau-sans-additif-6l", brand: "Eurofeu", model: "Eau pulvérisée sans additif 6 L", slug: "eurofeu-eau-sans-additif-6l", capacity: "6 L", type: "Classe A" },
];

export function getAllVehicles() {
    return vehicles;
}
