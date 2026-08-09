import { CityConfig } from "@/lib/db";

export const NATIONAL_CONFIG: CityConfig = {
    slug: "home",
    domain: "expertsecuriteincendie.fr",
    name: "Expert Sécurité Incendie",
    city: "France",
    phoneNumber: "01 84 80 00 00",
    email: "contact@expertsecuriteincendie.fr",
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "Le réseau n°1 de techniciens de extincteurs en France. Devis gratuit, maintenance rapide, certifié APSAD Incendie.",
    meta: {
        title: "Expert Sécurité Incendie | maintenance extincteurs Incendie partout en France",
        description: "maintenance de extincteurs pour ERP et entreprises. Réseau de techniciens certifiés Incendie. Devis gratuit en 24h."
    },
    features: [
        "maintenance Certifiée Incendie",
        "Devis Gratuit 24h",
        "Aides & Subventions Aide",
        "Garantie Décennale"
    ],
    pricing: {
        base: "Sur Devis",
        description: "Devis gratuit personnalisé selon votre maintenance"
    },
    hospitals: [],
    stations: [],
    neighborhoods: [],
    points_of_interest: {
        hotels: [],
        nightlife: [],
        monuments: [],
        parking_difficulty: "N/A"
    }
};

