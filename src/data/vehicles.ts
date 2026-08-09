export interface Equipment {
    id: string;
    brand: string;
    model: string;
    slug: string;
    capacity: string;
    type: string;
}

export type Vehicle = Equipment;

export const vehicles: Equipment[] = [
    { id: "desautel-eau-6l", brand: "Desautel", model: "Eau Pulvérisée 6L + Additif", slug: "desautel-eau-6l", capacity: "6 Litres", type: "Classes A, B" },
    { id: "sicli-co2-2kg", brand: "Sicli", model: "CO2 2kg Dioxydes de Carbone", slug: "sicli-co2-2kg", capacity: "2 kg", type: "Classe B & Électrique" },
    { id: "andrieu-poudre-6kg", brand: "Andrieu", model: "Poudre ABC 6kg Heavy Duty", slug: "andrieu-poudre-6kg", capacity: "6 kg", type: "Classes A, B, C" },
    { id: "eurofeu-eau-9l", brand: "Eurofeu", model: "Extincteur 9L Eau Additivée", slug: "eurofeu-eau-9l", capacity: "9 Litres", type: "Classes A, B" }
];

export function getAllVehicles() {
    return vehicles;
}
