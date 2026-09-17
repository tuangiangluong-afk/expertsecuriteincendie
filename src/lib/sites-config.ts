import { slugify } from "@/lib/slugify";
/**
 * Incendie Multi-Domain Site Configuration
 * 
 * Maps domains to city-specific configurations for the "Empire Incendie" network.
 * One codebase, 50 domains, targeting €50/lead high-ticket conversions.
 */

export interface SiteConfig {
    // Identification
    slug: string;
    domain: string;
    aliases?: string[];

    // Location
    city: string;
    postalCode: string;
    department: string;
    region: string;

    // Business
    name: string;
    phoneNumber: string;
    email: string;

    // Target Priority
    targetType: 'COPRO' | 'MAISON' | 'ENTREPRISE' | 'MIXED';
    priceRange: 'STANDARD' | 'PREMIUM' | 'LUXE';

    // Theme: 'premium' = Dark/Tech (Vaisseau Mère), 'trust' = Light/Institutionnel (Sites Locaux)
    theme: 'premium' | 'trust';

    // Content
    heroImage: string;
    description: string;
    meta: {
        title: string;
        description: string;
    };

    // Trust Signals
    certifications: string[];
    aidesDisponibles: string[];

    // SEO
    features: string[];
    localKeywords: string[];

    // Points of Interest (for internal linking)
    quartiers: string[];
    coproprietes: string[];
    centresCommerciaux: string[];

    // Analytics
    ga_id?: string;
    gtm_id?: string;

    // Geo-Spatial (Deep Mesh)
    coordinates?: {
        lat: number;
        lng: number;
    };
}

// ============================================
// TEMPLATE CONFIGS
// ============================================

const TEMPLATE_CERTIFICATIONS = [
    "APSAD Incendie",
    "RGE",
    "NF",
    "Assurance décennale"
];

const TEMPLATE_AIDES = [
    "Mise en conformité (Copropriété)",
    "Audit Sécurité Offert",
    "Déduction Fiscale B2B"
];

const TEMPLATE_FEATURES = [
    "Devis gratuit en 24h",
    "Installation & Maintenance",
    "Conformité Registre Sécurité",
    "SAV 7j/7"
];

// ============================================
// MAIN HUB CONFIG (expertsecuriteincendie.fr)
// ============================================

const _hubConfig: SiteConfig = {
    slug: "home",
    domain: "expertsecuriteincendie.fr",
    city: "France",
    postalCode: "",
    department: "",
    region: "National",
    name: "Expert Sécurité Incendie",
    phoneNumber: "01 84 80 00 00",
    email: "contact@expertsecuriteincendie.fr",
    targetType: 'MIXED',
    priceRange: 'STANDARD',
    theme: 'premium', // Vaisseau Mère = Dark/Tech
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "Le réseau n°1 de techniciens d'extincteurs en France. Devis gratuit, maintenance rapide, certifié APSAD Incendie.",
    meta: {
        title: "Expert Sécurité Incendie | maintenance matériel incendie France",
        description: "maintenance d'extincteurs pour ERP et entreprises partout en France. Devis gratuit en 24h. Certifié APSAD Incendie & NF. Audit & Devis Gratuit 24h."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: [
        "maintenance matériel incendie",
        "extincteur protection maison",
        "extincteur protection copropriété",
        "technicien Incendie",
        "extincteur domicile"
    ],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    coordinates: { lat: 46.2276, lng: 2.2137 } // Centre France
};

// ============================================
// SATELLITE CITY CONFIGS (TOP 20 SNIPERS)
// ============================================

// 1. Paris (Volume)
const _parisConfig: SiteConfig = {
    slug: "paris",
    domain: "securiteincendieparis.fr",
    aliases: ["extincteur-protection-paris.fr"],
    city: "Paris",
    postalCode: "75000",
    department: "75",
    region: "Île-de-France",
    name: "Sécurité Incendie Paris",
    phoneNumber: "01 84 80 75 00",
    email: "paris@expertsecuriteincendie.fr",
    targetType: 'COPRO',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "/images/generated/city-street.png",
    description: "maintenance matériel incendie Paris. Expert copropriété et parking souterrain.",
    meta: {
        title: "maintenance matériel incendie Paris | Devis Gratuit Copropriété",
        description: "technicien Incendie Paris. Spécialiste extincteurs en copropriété et parking souterrain. Mise en conformité. Devis 24h."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: [...TEMPLATE_AIDES, "Aide Mairie de Paris"],
    features: [...TEMPLATE_FEATURES, "Expert Copropriétés Ancien", "Syndic Partenaire"],
    localKeywords: ["extincteur protection paris", "maintenance extincteur paris", "copropriété paris", "parking paris"],
    quartiers: ["Marais", "Bastille", "Montmartre", "Champs-Elysées"],
    coproprietes: ["Haussmannien", "Résidences 70s"],
    centresCommerciaux: [],
    ga_id: "G-00EBCXCPYG",
    coordinates: { lat: 48.8566, lng: 2.3522 }
};

// 2. Neuilly-sur-Seine (Luxe)
const _neuillyConfig: SiteConfig = {
    slug: "neuilly-sur-seine",
    domain: "securiteincendieneuilly.fr",
    aliases: ["extincteur-protection-neuilly.fr"],
    city: "Neuilly-sur-Seine",
    postalCode: "92200",
    department: "92",
    region: "Île-de-France",
    name: "Sécurité Incendie Neuilly",
    phoneNumber: "01 84 80 92 00",
    email: "neuilly@expertsecuriteincendie.fr",
    targetType: 'MAISON',
    priceRange: 'LUXE',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "maintenance matériel incendie Neuilly-sur-Seine. Service premium.",
    meta: {
        title: "matériel incendie Neuilly-sur-Seine | maintenance Premium",
        description: "Maintenance du matériel incendie à Neuilly-sur-Seine : extincteurs, RIA, BAES et registre de sécurité, pour les copropriétés et les entreprises. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["maintenance Discrète", "Marques Premium", "SAV Prioritaire"],
    localKeywords: ["extincteur protection neuilly", "technicien 92", "extincteur Extincteurs neuilly"],
    quartiers: ["Sablons", "Saint-James", "Bagatelle", "Pont de Neuilly"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-288041ZWT2",
    coordinates: { lat: 48.8846, lng: 2.2688 }
};

// 3. Lyon (Capitale Province)
const _lyonConfig: SiteConfig = {
    slug: "lyon",
    domain: "securiteincendielyon.fr",
    aliases: ["extincteur-protection-lyon.fr"],
    city: "Lyon",
    postalCode: "69000",
    department: "69",
    region: "Auvergne-Rhône-Alpes",
    name: "Sécurité Incendie Lyon",
    phoneNumber: "04 84 80 69 00",
    email: "lyon@expertsecuriteincendie.fr",
    targetType: 'MIXED',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "maintenance matériel incendie à Lyon et région Rhône.",
    meta: {
        title: "maintenance matériel incendie Lyon | technicien Incendie 69",
        description: "Votre matériel incendie à Lyon. maintenance domicile et entreprise. Devis gratuit en 24h. Certifié APSAD."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["extincteur protection lyon", "technicien extincteur 69", "incendie lyon"],
    quartiers: ["Presqu'île", "Part-Dieu", "Confluence", "Croix-Rousse"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-CCE7KCSVJZ",
    coordinates: { lat: 45.7640, lng: 4.8357 }
};

// 4. Boulogne-Billancourt (Roi de la Copro)
const _boulogneConfig: SiteConfig = {
    slug: "boulogne-billancourt",
    domain: "securiteincendieboulogne.fr",
    city: "Boulogne-Billancourt",
    postalCode: "92100",
    department: "92",
    region: "Île-de-France",
    name: "Sécurité Incendie Boulogne",
    phoneNumber: "01 84 80 92 10",
    email: "boulogne@expertsecuriteincendie.fr",
    targetType: 'COPRO',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "Spécialiste matériel incendie Boulogne-Billancourt.",
    meta: {
        title: "maintenance matériel incendie Boulogne-Billancourt",
        description: "Expert maintenance extincteur Boulogne. Spécialiste copropriétés et parkings. Devis gratuit syndic et particuliers."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Spécialiste Copro", "Gestion Syndic"],
    localKeywords: ["extincteur protection boulogne", "copropriété boulogne", "syndic 92"],
    quartiers: ["Point-du-Jour", "Silly-Gallieni", "Centre-Ville"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-PRTNVL73RE",
    coordinates: { lat: 48.8397, lng: 2.2426 }
};

// 5. Bordeaux (Bobos Riches)
const _bordeauxConfig: SiteConfig = {
    slug: "bordeaux",
    domain: "expertsecuriteincendie.fr/ville/bordeaux",
    city: "Bordeaux",
    postalCode: "33000",
    department: "33",
    region: "Nouvelle-Aquitaine",
    name: "Sécurité Incendie Bordeaux",
    phoneNumber: "05 57 80 33 00",
    email: "bordeaux@expertsecuriteincendie.fr",
    targetType: 'MAISON',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "maintenance extincteur Bordeaux et Gironde.",
    meta: {
        title: "maintenance matériel incendie Bordeaux | Expert 33",
        description: "technicien extincteur protection Bordeaux. Échoppes et maisons individuelles. Devis gratuit. Certifié Incendie."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["extincteur protection bordeaux", "maintenance extincteur 33", "Extincteur bordeaux"],
    quartiers: ["Chartrons", "Saint-Michel", "Caudéran"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-QR6VYF1LM5",
    coordinates: { lat: 44.8378, lng: -0.5792 }
};

// 6. Toulouse (Aéronautique)
const _toulouseConfig: SiteConfig = {
    slug: "toulouse",
    domain: "expertsecuriteincendie.fr/ville/toulouse",
    city: "Toulouse",
    postalCode: "31000",
    department: "31",
    region: "Occitanie",
    name: "Sécurité Incendie Toulouse",
    phoneNumber: "05 34 80 31 00",
    email: "toulouse@expertsecuriteincendie.fr",
    targetType: 'MIXED',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "maintenance matériel incendie Toulouse.",
    meta: {
        title: "maintenance matériel incendie Toulouse | Devis Gratuit",
        description: "technicien extincteur protection Toulouse. Particuliers et entreprises (Airbus, Thales...). Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["extincteur protection toulouse", "maintenance extincteur 31"],
    quartiers: ["Capitole", "Minimes", "Saint-Cyprien"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-4G7LZYW8ZF"
};

// 7. Annecy (Frontaliers Suisses - Cash) - Remplacement Toulouse #2
const _annecyConfig: SiteConfig = {
    slug: "annecy",
    domain: "expertsecuriteincendie.fr/ville/annecy",
    city: "Annecy",
    postalCode: "74000",
    department: "74",
    region: "Auvergne-Rhône-Alpes",
    name: "Sécurité Incendie Annecy",
    phoneNumber: "04 50 80 74 00",
    email: "annecy@expertsecuriteincendie.fr",
    targetType: 'MAISON',
    priceRange: 'LUXE',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "maintenance extincteur protection Annecy et Haute-Savoie.",
    meta: {
        title: "matériel incendie Annecy | maintenance Haute-Savoie",
        description: "maintenance d'extincteurs à Annecy. Service premium pour frontaliers. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["maintenance Premium", "Frontaliers"],
    localKeywords: ["extincteur protection annecy", "technicien 74", "geneve"],
    quartiers: ["Veyrier", "Annecy-le-Vieux"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-XCX2S9LBJB",
    coordinates: { lat: 45.8992, lng: 6.1294 }
};

// 8. Saint-Germain-en-Laye (78 Riche) - Remplacement Toulouse #3
const _stgermainConfig: SiteConfig = {
    slug: "saint-germain-en-laye",
    domain: "securiteincendiestgermain.fr",
    city: "Saint-Germain-en-Laye",
    postalCode: "78100",
    department: "78",
    region: "Île-de-France",
    name: "Sécurité Incendie St-Germain",
    phoneNumber: "01 30 80 78 00",
    email: "stgermain@expertsecuriteincendie.fr",
    targetType: 'MAISON',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "maintenance extincteur protection Saint-Germain-en-Laye.",
    meta: {
        title: "matériel incendie Saint-Germain-en-Laye | 78",
        description: "maintenance extincteur protection Saint-Germain et Yvelines. Particuliers et villas. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Maisons Individuelles", "Villas"],
    localKeywords: ["extincteur protection saint germain", "technicien 78"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-1VS7642FBL"
};

// 9. Nice (PACA Luxe)
const _niceConfig: SiteConfig = {
    slug: "nice",
    domain: "securiteincendienice.fr",
    city: "Nice",
    postalCode: "06000",
    department: "06",
    region: "Provence-Alpes-Côte d'Azur",
    name: "Sécurité Incendie Nice",
    phoneNumber: "04 93 80 06 00",
    email: "nice@expertsecuriteincendie.fr",
    targetType: 'MIXED',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "maintenance d'extincteurs à Nice et Côte d'Azur.",
    meta: {
        title: "maintenance matériel incendie Nice | Côte d'Azur",
        description: "technicien Incendie Nice. Devis gratuit pour particuliers et copropriétés niçoises."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["extincteur protection nice", "technicien 06"],
    quartiers: ["Promenade", "Cimiez", "Mont Boron"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-EVVGL6MRJQ",
    coordinates: { lat: 43.7102, lng: 7.2620 }
};

// 10. Nantes (Maisons individuelles)
const _nantesConfig: SiteConfig = {
    slug: "nantes",
    domain: "securiteincendienantes.fr",
    city: "Nantes",
    postalCode: "44000",
    department: "44",
    region: "Pays de la Loire",
    name: "Sécurité Incendie Nantes",
    phoneNumber: "02 40 80 44 00",
    email: "nantes@expertsecuriteincendie.fr",
    targetType: 'MAISON',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "maintenance extincteur protection Nantes.",
    meta: {
        title: "maintenance matériel incendie Nantes | Loire-Atlantique",
        description: "Votre extincteur à Nantes. Spécialiste maison individuelle. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["extincteur protection nantes", "technicien 44"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-G6Y4NQ5XBY",
    coordinates: { lat: 47.2184, lng: -1.5536 }
};

// 11. Aix-en-Provence (PACA Luxe)
const _aixConfig: SiteConfig = {
    slug: "aix-en-provence",
    domain: "securiteincendieaix.fr",
    city: "Aix-en-Provence",
    postalCode: "13100",
    department: "13",
    region: "Provence-Alpes-Côte d'Azur",
    name: "Sécurité Incendie Aix",
    phoneNumber: "04 42 80 13 00",
    email: "aix@expertsecuriteincendie.fr",
    targetType: 'MAISON',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "maintenance extincteur protection Aix-en-Provence.",
    meta: {
        title: "matériel incendie Aix-en-Provence | maintenance",
        description: "maintenance d'extincteurs à Aix-en-Provence. Villas et résidences. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Villas", "Piscine"],
    localKeywords: ["extincteur protection aix", "technicien 13"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-CDB4C36VM6",
    coordinates: { lat: 43.5297, lng: 5.4474 }
};

// 12. Strasbourg (L'Est riche)
const _strasbourgConfig: SiteConfig = {
    slug: "strasbourg",
    domain: "securiteincendiestrasbourg.fr",
    city: "Strasbourg",
    postalCode: "67000",
    department: "67",
    region: "Grand Est",
    name: "Sécurité Incendie Strasbourg",
    phoneNumber: "03 88 80 67 00",
    email: "strasbourg@expertsecuriteincendie.fr",
    targetType: 'MIXED',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "maintenance extincteur protection Strasbourg.",
    meta: {
        title: "maintenance matériel incendie Strasbourg | Alsace",
        description: "technicien Incendie Strasbourg. Spécialiste Grand Est. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["extincteur protection strasbourg", "technicien 67"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-M2LGC1MP16"
};

// 13. Lille (Le Nord riche)
const _lilleConfig: SiteConfig = {
    slug: "lille",
    domain: "securiteincendielille.fr",
    city: "Lille",
    postalCode: "59000",
    department: "59",
    region: "Hauts-de-France",
    name: "Sécurité Incendie Lille",
    phoneNumber: "03 20 80 59 00",
    email: "lille@expertsecuriteincendie.fr",
    targetType: 'MIXED',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg", // Lille Architecture
    description: "maintenance extincteur protection Lille et métropole.",
    meta: {
        title: "maintenance matériel incendie Lille | Nord",
        description: "Votre extincteur à Lille, Marcq-en-Barœul, Bondues. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Métropole Lilloise", "Frontaliers Belges"],
    localKeywords: ["extincteur protection lille", "technicien 59"],
    quartiers: ["Vieux-Lille"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-GJ9TKQNC9S",
    coordinates: { lat: 50.6292, lng: 3.0573 }
};

// 14. Montpellier (Croissance)
const _montpellierConfig: SiteConfig = {
    slug: "montpellier",
    domain: "expertsecuriteincendie.fr/ville/montpellier",
    city: "Montpellier",
    postalCode: "34000",
    department: "34",
    region: "Occitanie",
    name: "Sécurité Incendie Montpellier",
    phoneNumber: "04 67 80 34 00",
    email: "montpellier@expertsecuriteincendie.fr",
    targetType: 'MIXED',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "maintenance extincteur protection Montpellier.",
    meta: {
        title: "maintenance matériel incendie Montpellier | Hérault",
        description: "technicien extincteur protection Montpellier. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["extincteur protection montpellier", "technicien 34"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-HJ5E9K54C6"
};

// 15. Versailles (Patrimoine)
const _versaillesConfig: SiteConfig = {
    slug: "versailles",
    domain: "securiteincendieversailles.fr",
    city: "Versailles",
    postalCode: "78000",
    department: "78",
    region: "Île-de-France",
    name: "Sécurité Incendie Versailles",
    phoneNumber: "01 39 80 78 00",
    email: "versailles@expertsecuriteincendie.fr",
    targetType: 'COPRO',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "maintenance extincteur protection Versailles.",
    meta: {
        title: "maintenance matériel incendie Versailles | 78",
        description: "Expert maintenance extincteur Versailles. Spécialiste copropriétés historiques. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Copropriétés Historiques"],
    localKeywords: ["extincteur protection versailles", "technicien 78"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-1LDSBWTLCG"
};

// 16. Saint-Maur-des-Fossés (Volume Maison)
const _stmaurConfig: SiteConfig = {
    slug: "saint-maur-des-fosses",
    domain: "securiteincendiestmaur.fr",
    city: "Saint-Maur-des-Fossés",
    postalCode: "94100",
    department: "94",
    region: "Île-de-France",
    name: "Sécurité Incendie St-Maur",
    phoneNumber: "01 42 80 94 00",
    email: "stmaur@expertsecuriteincendie.fr",
    targetType: 'MAISON',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg", // Suburb House
    description: "maintenance extincteur protection Saint-Maur-des-Fossés.",
    meta: {
        title: "matériel incendie Saint-Maur-des-Fossés | 94",
        description: "maintenance extincteur protection Saint-Maur. Spécialiste pavillons. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Maisons Individuelles"],
    localKeywords: ["extincteur protection saint maur", "technicien 94"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-GBZH52JQ6H"
};

// 17. Levallois (Business + Copro)
const _levalloisConfig: SiteConfig = {
    slug: "levallois-perret",
    domain: "securiteincendielevallois.fr",
    city: "Levallois-Perret",
    postalCode: "92300",
    department: "92",
    region: "Île-de-France",
    name: "Sécurité Incendie Levallois",
    phoneNumber: "01 47 80 92 00",
    email: "levallois@expertsecuriteincendie.fr",
    targetType: 'COPRO',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg", // Modern buildings
    description: "maintenance extincteur protection Levallois-Perret.",
    meta: {
        title: "maintenance matériel incendie Levallois-Perret",
        description: "technicien extincteur Levallois. Copropriétés et entreprises. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Entreprises", "Copropriétés"],
    localKeywords: ["extincteur protection levallois", "technicien 92"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-P230GJZZ4G"
};

// 18. Rennes
const _rennesConfig: SiteConfig = {
    slug: "rennes",
    domain: "securiteincendierennes.fr",
    city: "Rennes",
    postalCode: "35000",
    department: "35",
    region: "Bretagne",
    name: "Sécurité Incendie Rennes",
    phoneNumber: "02 99 80 35 00",
    email: "rennes@expertsecuriteincendie.fr",
    targetType: 'MIXED',
    priceRange: 'STANDARD',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "maintenance extincteur protection Rennes.",
    meta: {
        title: "maintenance matériel incendie Rennes | Bretagne",
        description: "technicien extincteur Rennes. Devis gratuit 24h."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: TEMPLATE_FEATURES,
    localKeywords: ["extincteur protection rennes", "technicien 35"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-3ZD47BWJN0"
};

// 19. Cannes (Résidences secondaires)
const _cannesConfig: SiteConfig = {
    slug: "cannes",
    domain: "securiteincendiecannes.fr",
    city: "Cannes",
    postalCode: "06400",
    department: "06",
    region: "Provence-Alpes-Côte d'Azur",
    name: "Sécurité Incendie Cannes",
    phoneNumber: "04 93 80 06 40",
    email: "cannes@expertsecuriteincendie.fr",
    targetType: 'COPRO',
    priceRange: 'LUXE',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "maintenance extincteur protection Cannes.",
    meta: {
        title: "matériel incendie Cannes | maintenance Luxe",
        description: "technicien extincteur protection Cannes. Résidences secondaires et villas. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Résidences Secondaires", "Conciergeries"],
    localKeywords: ["extincteur protection cannes", "technicien 06"],
    quartiers: ["La Croisette", "Californie"],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-GMX71FCL9E",
    coordinates: { lat: 43.5528, lng: 7.0174 }
};

// 20. Biarritz (Le 16ème sur la plage)
const _biarritzConfig: SiteConfig = {
    slug: "biarritz",
    domain: "expertsecuriteincendie.fr/ville/biarritz",
    city: "Biarritz",
    postalCode: "64200",
    department: "64",
    region: "Nouvelle-Aquitaine",
    name: "Sécurité Incendie Biarritz",
    phoneNumber: "05 59 80 64 00",
    email: "biarritz@expertsecuriteincendie.fr",
    targetType: 'MAISON',
    priceRange: 'LUXE',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "maintenance extincteur protection Biarritz.",
    meta: {
        title: "matériel incendie Biarritz | Pays Basque",
        description: "maintenance extincteur protection Biarritz. Service premium Pays Basque. Devis gratuit."
    },
    certifications: TEMPLATE_CERTIFICATIONS,
    aidesDisponibles: TEMPLATE_AIDES,
    features: ["Villas", "Surf & protection"],
    localKeywords: ["extincteur protection biarritz", "technicien 64"],
    quartiers: [],
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-3GHBT5VLHW",
    coordinates: { lat: 43.4832, lng: -1.5586 }
};

// 21. Marseille (Le Sud + Solaire + Carport)
const _marseilleConfig: SiteConfig = {
    slug: "marseille",
    domain: "securiteincendiemarseille.fr",
    city: "Marseille",
    postalCode: "13000",
    department: "13",
    region: "Provence-Alpes-Côte d'Azur",
    name: "Sécurité Incendie Marseille",
    phoneNumber: "04 91 80 13 00",
    email: "marseille@expertsecuriteincendie.fr",
    targetType: 'MAISON',
    priceRange: 'PREMIUM',
    theme: 'trust',
    heroImage: "/images/realizations/hero-extincteur.jpg",
    description: "Maintenance du matériel incendie à Marseille, Cassis et Carry-le-Rouet : extincteurs, BAES, désenfumage et registre de sécurité.",
    meta: {
        title: "Maintenance extincteurs & sécurité incendie Marseille | 13",
        description: "Vérification annuelle des extincteurs et des blocs d'éclairage de sécurité à Marseille. Établissements recevant du public, commerces et copropriétés. Devis gratuit."
    },
    certifications: [...TEMPLATE_CERTIFICATIONS],
    aidesDisponibles: [...TEMPLATE_AIDES],
    features: ["Extincteurs NF EN 3", "Contrôle annuel APSAD R4", "Registre de sécurité", "Copropriétés & commerces"],
    localKeywords: ["maintenance extincteur marseille", "securite incendie marseille", "extincteur copropriete marseille", "baes marseille", "registre de securite 13"],
    quartiers: ["Le Prado", "Périer", "Roucas-Blanc", "La Corniche", "Cassis", "Carry-le-Rouet"], // La Ceinture Dorée
    coproprietes: [],
    centresCommerciaux: [],
    ga_id: "G-TY9Z3692S5"
};

// ============================================
// CITIES REGISTRY
// ============================================

export const SITES: Record<string, SiteConfig> = {
    // Main Hub
    "expertsecuriteincendie.fr": _hubConfig,
    "www.expertsecuriteincendie.fr": _hubConfig,
    "home": _hubConfig,

    // 1. Paris
    "securiteincendieparis.fr": _parisConfig,
    "www.securiteincendieparis.fr": _parisConfig,
    "paris": _parisConfig,

    "securiteincendieneuilly.fr": _neuillyConfig,
    "www.securiteincendieneuilly.fr": _neuillyConfig,
    "neuilly-sur-seine": _neuillyConfig,
    "neuilly": _neuillyConfig,

    // 3. Lyon
    "expertsecuriteincendie.fr/ville/lyon": _lyonConfig,
    "www.expertsecuriteincendie.fr/ville/lyon": _lyonConfig,
    "lyon": _lyonConfig,

    "securiteincendieboulogne.fr": _boulogneConfig,
    "boulogne-billancourt": _boulogneConfig,
    "boulogne": _boulogneConfig,

    // 5. Bordeaux
    "expertsecuriteincendie.fr/ville/bordeaux": _bordeauxConfig,
    "bordeaux": _bordeauxConfig,

    // 6. Toulouse
    "expertsecuriteincendie.fr/ville/toulouse": _toulouseConfig,
    "toulouse": _toulouseConfig,

    // 7. Annecy
    "expertsecuriteincendie.fr/ville/annecy": _annecyConfig,
    "annecy": _annecyConfig,

    "securiteincendiestgermain.fr": _stgermainConfig,
    "saint-germain-en-laye": _stgermainConfig,
    "saint-germain": _stgermainConfig,
    "st-germain": _stgermainConfig,

    // 9. Nice
    "securiteincendienice.fr": _niceConfig,
    "nice": _niceConfig,

    // 10. Nantes
    "securiteincendienantes.fr": _nantesConfig,
    "nantes": _nantesConfig,

    "securiteincendieaix.fr": _aixConfig,
    "aix-en-provence": _aixConfig,
    "aix": _aixConfig,

    // 12. Strasbourg
    "securiteincendiestrasbourg.fr": _strasbourgConfig,
    "strasbourg": _strasbourgConfig,

    // 13. Lille
    "securiteincendielille.fr": _lilleConfig,
    "lille": _lilleConfig,

    // 14. Montpellier
    "expertsecuriteincendie.fr/ville/montpellier": _montpellierConfig,
    "montpellier": _montpellierConfig,

    // 15. Versailles
    "securiteincendieversailles.fr": _versaillesConfig,
    "versailles": _versaillesConfig,

    "securiteincendiestmaur.fr": _stmaurConfig,
    "saint-maur-des-fosses": _stmaurConfig,
    "saint-maur": _stmaurConfig,
    "st-maur": _stmaurConfig,

    "securiteincendielevallois.fr": _levalloisConfig,
    "levallois-perret": _levalloisConfig,
    "levallois": _levalloisConfig,

    // 18. Rennes
    "securiteincendierennes.fr": _rennesConfig,
    "rennes": _rennesConfig,

    // 19. Cannes
    "securiteincendiecannes.fr": _cannesConfig,
    "cannes": _cannesConfig,

    // 20. Biarritz
    "expertsecuriteincendie.fr/ville/biarritz": _biarritzConfig,
    "biarritz": _biarritzConfig,

    // 21. Marseille
    "securiteincendiemarseille.fr": _marseilleConfig,
    "securiteincendiemarseille": _marseilleConfig,
    "marseille": _marseilleConfig,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get site configuration from hostname or slug
 */
export function getSiteConfig(hostnameOrSlug: string): SiteConfig | null {
    // Normalize hostname
    let hostname = hostnameOrSlug.split(':')[0]; // Remove port
    hostname = hostname.replace(/^www\./, ''); // Remove www

    // First try direct lookup by slug (for localhost routing)
    const bySlug = Object.values(SITES).find(s => s.slug === hostname);
    if (bySlug) return bySlug;

    // DEV: Handle localhost subdomains (e.g., securiteincendieparis.localhost)
    if (hostname.endsWith('.localhost')) {
        const subdomain = hostname.split('.')[0];
        const found = Object.values(SITES).find(s =>
            s.slug === subdomain ||
            s.domain.startsWith(`${subdomain}.`) ||
            s.domain.includes(subdomain)
        );
        if (found) return found;
    }

    // Direct lookup by domain
    if (SITES[hostname]) return SITES[hostname];

    // Fallback: search by domain or alias
    const found = Object.values(SITES).find(s =>
        s.domain === hostname ||
        s.aliases?.includes(hostname)
    );

    return found || null;
}

/**
 * Get site configuration by slug
 */
export function getSiteBySlug(slug: string): SiteConfig | null {
    return Object.values(SITES).find(s => s.slug === slug) || null;
}

/**
 * Get all satellite sites (excluding main hub)
 */
export function getSatelliteSites(): SiteConfig[] {
    return Object.values(SITES).filter(s => s.slug !== 'home');
}

/**
 * Check if hostname is main hub
 */
export function isMainHub(hostname: string): boolean {
    hostname = hostname.split(':')[0].replace(/^www\./, '');
    return (
        hostname === 'expertsecuriteincendie.fr' ||
        hostname.includes('localhost') && !hostname.includes('.localhost') ||
        hostname.includes('.vercel.app') ||
        hostname.includes('192.168.')
    );
}

/**
 * Get default hub configuration
 */
export function getHubConfig(): SiteConfig {
    return _hubConfig;
}

// Le slug public est derive du nom de la commune avec le meme slugify que la
// route /ville/[slug] : les slugs ecrits a la main laissaient tomber les accents
// (« Munchen » -> m-nchen, « Nimes » -> n-mes) et cassaient le maillage, le
// sitemap et les liens internes.
for (const site of Object.values(SITES)) {
    site.slug = slugify(site.city);
}
