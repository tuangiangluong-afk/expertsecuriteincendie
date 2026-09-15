import { CityConfig } from "@/lib/db";

export const NATIONAL_CONFIG: CityConfig = {
    slug: "home",
    domain: "expertsecuriteincendie.fr",
    name: "Expert Sécurité Incendie",
    city: "France",
    phoneNumber: "01 84 80 00 00",
    email: "contact@expertsecuriteincendie.fr",
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "Le réseau n°1 de techniciens d'extincteurs en France. Devis gratuit, maintenance rapide, certifié APSAD Incendie.",
    meta: {
        title: "Expert Sécurité Incendie | Maintenance Extincteurs & Conformité APSAD",
        description: "Maintenance d'extincteurs et mise en conformité incendie pour ERP et entreprises. Techniciens certifiés APSAD, devis gratuit en 24h."
    },
    features: [
        "Maintenance Certifiée APSAD",
        "Devis Gratuit 24h",
        "Registre de Sécurité & Traçabilité",
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

