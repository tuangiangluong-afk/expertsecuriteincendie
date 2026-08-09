// ========================================
// NATIONAL TARGETS - 30 HIGH-VALUE ZONES
// Ghost Broker Strategy - Dropshipping Taxi
// ========================================

export interface NationalTarget {
    slug: string;
    name: string;
    heroTitle: string;
    geo: { lat: number; lng: number };
    price_start: number; // Prix maintenance à partir de
    top_places: string[]; // Zones d'intervention (Quartiers, Villes voisines)
    zip: string;
    tier: 'BIG5' | 'GOLDEN' | 'HUB' | 'STRATEGIC';
    heroImage?: string;
}

export const NATIONAL_TARGETS: NationalTarget[] = [
    // ========================================
    // 👑 TIER 1: BIG 5 (60% du CA)
    // ========================================
    {
        slug: "paris",
        name: "Paris",
        heroTitle: "technicien Sécurité Incendie Paris (75)",
        geo: { lat: 48.856, lng: 2.352 },
        price_start: 900.00,
        top_places: ["Paris 16", "Paris 17", "Le Marais", "Montmartre"],
        zip: "75000",
        tier: 'BIG5',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "lyon",
        name: "Lyon",
        heroTitle: "maintenance Sécurité Incendie Lyon",
        geo: { lat: 45.764, lng: 4.835 },
        price_start: 890.00,
        top_places: ["Monts d'Or", "Presqu'île", "Part-Dieu", "Confluence"],
        zip: "69000",
        tier: 'BIG5',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "marseille",
        name: "Marseille",
        heroTitle: "Pose extincteur Marseille",
        geo: { lat: 43.296, lng: 5.369 },
        price_start: 850.00,
        top_places: ["Prado", "Corniche", "Vieux-Port", "Euroméditerranée"],
        zip: "13000",
        tier: 'BIG5',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "nice",
        name: "Nice",
        heroTitle: "technicien Incendie Nice",
        geo: { lat: 43.710, lng: 7.262 },
        price_start: 950.00,
        top_places: ["Promenade des Anglais", "Cimiez", "Mont Boron", "Carré d'Or"],
        zip: "06000",
        tier: 'BIG5',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "bordeaux",
        name: "Bordeaux",
        heroTitle: "Expert Sécurité Incendie Bordeaux",
        geo: { lat: 44.837, lng: -0.579 },
        price_start: 890.00,
        top_places: ["Chartrons", "Caudéran", "Le Bouscat", "Talence"],
        zip: "33000",
        tier: 'BIG5',
        heroImage: "https://Images.unsplash.com/photo-1559087867-ce4c91325525?q=80&w=2670&auto=format&fit=crop"
    },
    {
        slug: "toulouse",
        name: "Toulouse",
        heroTitle: "maintenance Extincteur Toulouse",
        geo: { lat: 43.604, lng: 1.444 },
        price_start: 850.00,
        top_places: ["Capitol", "Carmes", "Saint-Cyprien", "Balma"],
        zip: "31000",
        tier: 'BIG5',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },

    // ========================================
    // 💎 TIER 2: GOLDEN CITIES (Pouvoir d'achat Élevé)
    // ========================================
    {
        slug: "cannes",
        name: "Cannes",
        heroTitle: "matériel incendie Cannes & Mougins",
        geo: { lat: 43.552, lng: 7.017 },
        price_start: 1100.00,
        top_places: ["La Californie", "Croisette", "Super Cannes", "Mougins"],
        zip: "06400",
        tier: 'GOLDEN',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "aix-en-provence",
        name: "Aix-en-Provence",
        heroTitle: "maintenance extincteur Aix & Luberon",
        geo: { lat: 43.529, lng: 5.447 },
        price_start: 950.00,
        top_places: ["Centre Historique", "Puyricard", "Les Milles", "Tholonet"],
        zip: "13100",
        tier: 'GOLDEN',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "antibes",
        name: "Antibes",
        heroTitle: "Sécurité Incendie Antibes & Sophia",
        geo: { lat: 43.580, lng: 7.125 },
        price_start: 980.00,
        top_places: ["Cap d'Antibes", "Juan-les-Pins", "Biot", "Sophia-Antipolis"],
        zip: "06600",
        tier: 'GOLDEN',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "neuilly-sur-seine",
        name: "Neuilly-sur-Seine",
        heroTitle: "maintenance extincteur Neuilly 92",
        geo: { lat: 48.884, lng: 2.268 },
        price_start: 1200.00,
        top_places: ["Saint-James", "Sablons", "Bagatelle", "Ile de la Jatte"],
        zip: "92200",
        tier: 'GOLDEN',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "lille",
        name: "Lille",
        heroTitle: "technicien extincteur Incendie Lille",
        geo: { lat: 50.629, lng: 3.057 },
        price_start: 890.00,
        top_places: ["Vieux-Lille", "Marcq-en-Barœul", "Bondues", "Lambersart"],
        zip: "59000",
        tier: 'GOLDEN',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "strasbourg",
        name: "Strasbourg",
        heroTitle: "extincteur Strasbourg",
        geo: { lat: 48.573, lng: 7.752 },
        price_start: 890.00,
        top_places: ["Orangerie", "Robertsau", "Contades", "Neudorf"],
        zip: "67000",
        tier: 'GOLDEN',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "nantes",
        name: "Nantes",
        heroTitle: "maintenance extincteur Nantes",
        geo: { lat: 47.218, lng: -1.553 },
        price_start: 850.00,
        top_places: ["Procé", "Monselet", "Saint-Félix", "Carquefou"],
        zip: "44000",
        tier: 'HUB',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "rennes",
        name: "Rennes",
        heroTitle: "Sécurité Incendie Rennes",
        geo: { lat: 48.117, lng: -1.677 },
        price_start: 850.00,
        top_places: ["Thabor", "Sévigné", "Saint-Grégoire", "Cesson-Sévigné"],
        zip: "35000",
        tier: 'HUB',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "montpellier",
        name: "Montpellier",
        heroTitle: "maintenance extincteur Montpellier",
        geo: { lat: 43.611, lng: 3.877 },
        price_start: 850.00,
        top_places: ["Port Marianne", "Aiguelongue", "Castelnau-le-Lez", "Lattes"],
        zip: "34000",
        tier: 'HUB',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "annecy",
        name: "Annecy",
        heroTitle: "Sécurité Incendie Annecy & 74",
        geo: { lat: 45.899, lng: 6.129 },
        price_start: 950.00,
        top_places: ["Annecy-le-Vieux", "Veyrier-du-Lac", "Sevrier", "Pringy"],
        zip: "74000",
        tier: 'GOLDEN',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "toulon",
        name: "Toulon",
        heroTitle: "technicien Sécurité Incendie Toulon",
        geo: { lat: 43.124, lng: 5.928 },
        price_start: 950.00,
        top_places: ["Mourillon", "Le Mont Faron", "Cap Brun", "Siblas"],
        zip: "83000",
        tier: 'HUB',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "avignon",
        name: "Avignon",
        heroTitle: "maintenance extincteur Avignon & Vaucluse",
        geo: { lat: 43.949, lng: 4.805 },
        price_start: 900.00,
        top_places: ["Palais des Papes", "Villeneuve-lès-Avignon", "Le Pontet", "Montfavet"],
        zip: "84000",
        tier: 'HUB',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "reims",
        name: "Reims",
        heroTitle: "matériel incendie Reims",
        geo: { lat: 49.258, lng: 4.031 },
        price_start: 890.00,
        top_places: ["Cathédrale", "Cormontreuil", "Tinqueux", "Bétheny"],
        zip: "51100",
        tier: 'HUB',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "dijon",
        name: "Dijon",
        heroTitle: "maintenance extincteur Dijon & 21",
        geo: { lat: 47.322, lng: 5.041 },
        price_start: 890.00,
        top_places: ["Centre Historique", "Toison d'Or", "Fontaine-lès-Dijon", "Talant"],
        zip: "21000",
        tier: 'HUB',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "rouen",
        name: "Rouen",
        heroTitle: "technicien Incendie Rouen",
        geo: { lat: 49.443, lng: 1.099 },
        price_start: 890.00,
        top_places: ["Rive Droite", "Mont-Saint-Aignan", "Bois-Guillaume", "Sotteville"],
        zip: "76000",
        tier: 'HUB',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },

    // ========================================
    // ✈️ TIER 4: STRATEGIC SPOTS (Zones Périurbaines Riches)
    // ========================================
    {
        slug: "roissy-en-france",
        name: "Roissy-en-France",
        heroTitle: "maintenance extincteur Roissy & 95",
        geo: { lat: 49.009, lng: 2.547 },
        price_start: 950.00,
        top_places: ["Tremblay-en-France", "Villepinte", "Goussainville", "Louvres"],
        zip: "95700",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "orly",
        name: "Orly",
        heroTitle: "Sécurité Incendie Orly & Sud 94",
        geo: { lat: 48.726, lng: 2.365 },
        price_start: 950.00,
        top_places: ["Thiais", "Rungis", "Choisy-le-Roi", "Athis-Mons"],
        zip: "94310",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "beauvais",
        name: "Beauvais",
        heroTitle: "technicien extincteur Beauvais",
        geo: { lat: 49.455, lng: 2.113 },
        price_start: 900.00,
        top_places: ["Centre-Ville", "Tillé", "Allonne", "Voisinlieu"],
        zip: "60000",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "saint-exupery",
        name: "Saint-Exupéry",
        heroTitle: "maintenance extincteur Est Lyonnais",
        geo: { lat: 45.723, lng: 5.081 },
        price_start: 950.00,
        top_places: ["Saint-Laurent-de-Mure", "Genas", "Meyzieu", "Pusignan"],
        zip: "69125",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "cagnes-sur-mer",
        name: "Cagnes-sur-Mer",
        heroTitle: "Sécurité Incendie Cagnes & St-Laurent",
        geo: { lat: 43.666, lng: 7.215 },
        price_start: 1000.00,
        top_places: ["Cros-de-Cagnes", "Saint-Laurent-du-Var", "Villeneuve-Loubet", "La Colle-sur-Loup"],
        zip: "06800",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "pays-de-gex",
        name: "Pays de Gex",
        heroTitle: "maintenance extincteur Frontière Suisse",
        geo: { lat: 46.238, lng: 6.109 },
        price_start: 1200.00,
        top_places: ["Ferney-Voltaire", "Divonne-les-Bains", "Saint-Genis-Pouilly", "Gex"],
        zip: "01210",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "mulhouse",
        name: "Mulhouse",
        heroTitle: "Sécurité Incendie Mulhouse & 3 Frontières",
        geo: { lat: 47.590, lng: 7.529 },
        price_start: 890.00,
        top_places: ["Saint-Louis", "Rixheim", "Kingersheim", "Wittenheim"],
        zip: "68100",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "marne-la-vallee",
        name: "Marne-la-Vallée",
        heroTitle: "maintenance extincteur Marne-la-Vallée",
        geo: { lat: 48.876, lng: 2.779 },
        price_start: 950.00,
        top_places: ["Chessy", "Serris", "Bussy-Saint-Georges", "Val d'Europe"],
        zip: "77700",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    // ========================================
    // 🌍 TIER 5: SOUTH-WEST EXPANSION
    // ========================================
    {
        slug: "pau",
        name: "Pau",
        heroTitle: "technicien matériel incendie Pau (64)",
        geo: { lat: 43.295, lng: -0.370 },
        price_start: 850.00,
        top_places: ["Centre-Ville", "Trespoey", "Billère", "Lons"],
        zip: "64000",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "bayonne",
        name: "Bayonne",
        heroTitle: "maintenance extincteur Pays Basque (Bayonne)",
        geo: { lat: 43.492, lng: -1.474 },
        price_start: 890.00,
        top_places: ["Grand Bayonne", "Petit Bayonne", "Anglet", "Saint-Esprit"],
        zip: "64100",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "biarritz",
        name: "Biarritz",
        heroTitle: "technicien Incendie Biarritz",
        geo: { lat: 43.483, lng: -1.558 },
        price_start: 950.00,
        top_places: ["Côte des Basques", "Milady", "Saint-Charles", "La Négresse"],
        zip: "64200",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "tarbes",
        name: "Tarbes",
        heroTitle: "Pose matériel incendie Tarbes",
        geo: { lat: 43.232, lng: 0.076 },
        price_start: 850.00,
        top_places: ["Centre-Ville", "Ormeau", "Aureilhan", "Laloubère"],
        zip: "65000",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "agen",
        name: "Agen",
        heroTitle: "Maintenance Incendie Agen (47)",
        geo: { lat: 44.203, lng: 0.616 },
        price_start: 850.00,
        top_places: ["Centre-Ville", "Ermitage", "Le Passage", "Boé"],
        zip: "47000",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "montauban",
        name: "Montauban",
        heroTitle: "Expert Sécurité Incendie Montauban",
        geo: { lat: 44.015, lng: 1.350 },
        price_start: 850.00,
        top_places: ["Centre Historique", "Villebourbon", "Saint-Martial", "Sapiac"],
        zip: "82000",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "albi",
        name: "Albi",
        heroTitle: "technicien matériel incendie Albi",
        geo: { lat: 43.928, lng: 2.148 },
        price_start: 850.00,
        top_places: ["Centre Historique", "Leuc", "Saint-Juéry", "Lescure-d'Albigeois"],
        zip: "81000",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "castres",
        name: "Castres",
        heroTitle: "maintenance extincteur Castres & Tarn",
        geo: { lat: 43.606, lng: 2.240 },
        price_start: 850.00,
        top_places: ["Lameilhé", "Aillot", "Burlats", "Lagarrigue"],
        zip: "81100",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "mont-de-marsan",
        name: "Mont-de-Marsan",
        heroTitle: "technicien matériel incendie Landes (40)",
        geo: { lat: 43.890, lng: -0.500 },
        price_start: 850.00,
        top_places: ["Centre-Ville", "Saint-Médard", "Saint-Jean-d'Août", "Saint-Pierre-du-Mont"],
        zip: "40000",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "dax",
        name: "Dax",
        heroTitle: "Expert matériel incendie Dax & Sud Landes",
        geo: { lat: 43.710, lng: -1.050 },
        price_start: 850.00,
        top_places: ["Centre-Ville", "Saint-Vincent-de-Paul", "Narrosse", "Saint-Paul-lès-Dax"],
        zip: "40100",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    }
];

// Helper to get a target by slug
export function getTargetBySlug(slug: string): NationalTarget | undefined {
    return NATIONAL_TARGETS.find(t => t.slug === slug);
}

// ========================================
// ADAPTER: Convert NationalTarget to CityConfig
// Uses pSEO for unique content per city
// ========================================
import { CityConfig } from "@/lib/db";

export function getTargetAsCityConfig(slug: string): CityConfig | undefined {
    const target = NATIONAL_TARGETS.find(t => t.slug === slug);
    if (!target) return undefined;

    // Pricing logic: maintenance starts at 900€
    const priceDisplay = `À partir de ${target.price_start}€`;
    const priceDesc = "maintenance clé en main";

    // Standardized EV Description
    const uniqueDescription = `Expert maintenance matériel incendie à ${target.name} (${target.zip}). Devis gratuit pour particuliers (maison, copropriété) et entreprises. techniciens certifiés Incendie.`;
    const uniqueMetaDescription = `maintenance matériel incendie ${target.name}. Devis gratuit technicien Incendie. Aides Aide et Crédit d'impôt déduits.`;

    return {
        slug: target.slug,
        city: target.name,
        name: `Expert extincteur ${target.name}`,
        domain: `expertsecuriteincendie.fr/ville/${target.slug}`,
        heroImage: target.heroImage || "/images/generated/city-street.png",

        postalCode: target.zip,
        department: target.zip.substring(0, 2),
        region: "France",

        description: uniqueDescription,
        geo: target.geo,

        // EV Features
        features: [
            "Devis Gratuit",
            "Certifié Incendie",
            "Aides Déduites",
            "Garantie 2 ans",
            "Maison & Copro"
        ],

        // Adapt fields for EVs
        stations: [], // Not relevant for EV installers usually, maybe store locations?
        hospitals: [],
        neighborhoods: target.top_places,

        points_of_interest: {
            hotels: [],
            nightlife: [],
            monuments: target.top_places,
            parking_difficulty: "High Demand"
        },

        pricing: {
            base: priceDisplay,
            description: priceDesc,
            km: 0
        },

        phoneNumber: "09 72 50 12 50",
        email: "contact@expertsecuriteincendie.fr",
        type: "PARTNER",
        targetType: "MIXED",

        meta: {
            title: target.heroTitle,
            description: uniqueMetaDescription
        }
    };
}

