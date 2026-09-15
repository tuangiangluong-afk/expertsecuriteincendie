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
        geo: { lat: 48.8589, lng: 2.347 },
        price_start: 900.00,
        top_places: ["Paris 16", "Paris 17", "Le Marais", "Montmartre"],
        zip: "75001",
        tier: 'BIG5',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "lyon",
        name: "Lyon",
        heroTitle: "maintenance Sécurité Incendie Lyon",
        geo: { lat: 45.758, lng: 4.8351 },
        price_start: 890.00,
        top_places: ["Monts d'Or", "Presqu'île", "Part-Dieu", "Confluence"],
        zip: "69001",
        tier: 'BIG5',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "marseille",
        name: "Marseille",
        heroTitle: "Pose extincteur Marseille",
        geo: { lat: 43.2803, lng: 5.3806 },
        price_start: 850.00,
        top_places: ["Prado", "Corniche", "Vieux-Port", "Euroméditerranée"],
        zip: "13001",
        tier: 'BIG5',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "nice",
        name: "Nice",
        heroTitle: "technicien Incendie Nice",
        geo: { lat: 43.7032, lng: 7.2528 },
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
        geo: { lat: 44.8624, lng: -0.5848 },
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
        geo: { lat: 43.6007, lng: 1.4328 },
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
        geo: { lat: 43.5454, lng: 7.0152 },
        price_start: 1100.00,
        top_places: ["La Californie", "Croisette", "Super Cannes", "Mougins"],
        zip: "06150",
        tier: 'GOLDEN',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "aix-en-provence",
        name: "Aix-en-Provence",
        heroTitle: "maintenance extincteur Aix & Luberon",
        geo: { lat: 43.536, lng: 5.3879 },
        price_start: 950.00,
        top_places: ["Centre Historique", "Puyricard", "Les Milles", "Tholonet"],
        zip: "13080",
        tier: 'GOLDEN',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "antibes",
        name: "Antibes",
        heroTitle: "Sécurité Incendie Antibes & Sophia",
        geo: { lat: 43.5823, lng: 7.1048 },
        price_start: 980.00,
        top_places: ["Cap d'Antibes", "Juan-les-Pins", "Biot", "Sophia-Antipolis"],
        zip: "06160",
        tier: 'GOLDEN',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "neuilly-sur-seine",
        name: "Neuilly-sur-Seine",
        heroTitle: "maintenance extincteur Neuilly 92",
        geo: { lat: 48.8862, lng: 2.2651 },
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
        geo: { lat: 50.6311, lng: 3.0468 },
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
        geo: { lat: 48.5691, lng: 7.7621 },
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
        geo: { lat: 47.2382, lng: -1.5603 },
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
        geo: { lat: 48.1159, lng: -1.6884 },
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
        geo: { lat: 43.61, lng: 3.8742 },
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
        geo: { lat: 45.9024, lng: 6.1264 },
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
        geo: { lat: 43.1364, lng: 5.9334 },
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
        geo: { lat: 43.9416, lng: 4.8333 },
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
        geo: { lat: 49.2535, lng: 4.0551 },
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
        geo: { lat: 47.3319, lng: 5.0322 },
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
        geo: { lat: 49.4412, lng: 1.0912 },
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
        geo: { lat: 49.0036, lng: 2.5188 },
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
        geo: { lat: 48.7402, lng: 2.403 },
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
        geo: { lat: 49.4425, lng: 2.0877 },
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
        geo: { lat: 44.6336, lng: -0.1009 },
        price_start: 950.00,
        top_places: ["Saint-Laurent-de-Mure", "Genas", "Meyzieu", "Pusignan"],
        zip: "33190",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "cagnes-sur-mer",
        name: "Cagnes-sur-Mer",
        heroTitle: "Sécurité Incendie Cagnes & St-Laurent",
        geo: { lat: 43.6712, lng: 7.1502 },
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
        geo: { lat: 46.3333, lng: 6.0667 },
        price_start: 1200.00,
        top_places: ["Ferney-Voltaire", "Divonne-les-Bains", "Saint-Genis-Pouilly", "Gex"],
        zip: "01170",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "mulhouse",
        name: "Mulhouse",
        heroTitle: "Sécurité Incendie Mulhouse & 3 Frontières",
        geo: { lat: 47.7526, lng: 7.3255 },
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
        geo: { lat: 48.85, lng: 2.6 },
        price_start: 950.00,
        top_places: ["Chessy", "Serris", "Bussy-Saint-Georges", "Val d'Europe"],
        zip: "77400",
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
        geo: { lat: 43.3219, lng: -0.3435 },
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
        geo: { lat: 43.4844, lng: -1.4611 },
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
        geo: { lat: 43.4709, lng: -1.5557 },
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
        geo: { lat: 43.2387, lng: 0.0653 },
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
        geo: { lat: 44.201, lng: 0.6302 },
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
        geo: { lat: 44.0217, lng: 1.3646 },
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
        geo: { lat: 43.929, lng: 2.1323 },
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
        geo: { lat: 43.6132, lng: 2.2448 },
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
        geo: { lat: 43.8931, lng: -0.5009 },
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
        geo: { lat: 43.7025, lng: -1.0637 },
        price_start: 850.00,
        top_places: ["Centre-Ville", "Saint-Vincent-de-Paul", "Narrosse", "Saint-Paul-lès-Dax"],
        zip: "40100",
        tier: 'STRATEGIC',
        heroImage: "/images/realizations/hero-extincteur.jpg"
    },
    {
        slug: "saint-etienne",
        name: "Saint-Étienne",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 45.4241, lng: 4.3665 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "42000",
        tier: 'HUB'
    },
    {
        slug: "le-havre",
        name: "Le Havre",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 49.4958, lng: 0.1312 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "76600",
        tier: 'HUB'
    },
    {
        slug: "grenoble",
        name: "Grenoble",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 45.1842, lng: 5.7155 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "38000",
        tier: 'HUB'
    },
    {
        slug: "angers",
        name: "Angers",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 47.4819, lng: -0.5629 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "49000",
        tier: 'HUB'
    },
    {
        slug: "nimes",
        name: "Nîmes",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 43.8322, lng: 4.3429 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "30000",
        tier: 'HUB'
    },
    {
        slug: "villeurbanne",
        name: "Villeurbanne",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 45.7719, lng: 4.8898 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "69100",
        tier: 'HUB'
    },
    {
        slug: "clermont-ferrand",
        name: "Clermont-Ferrand",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 45.787, lng: 3.1127 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "63000",
        tier: 'HUB'
    },
    {
        slug: "le-mans",
        name: "Le Mans",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 47.9819, lng: 0.1957 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "72000",
        tier: 'HUB'
    },
    {
        slug: "brest",
        name: "Brest",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.4085, lng: -4.4996 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "29200",
        tier: 'HUB'
    },
    {
        slug: "tours",
        name: "Tours",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 47.3943, lng: 0.6949 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "37000",
        tier: 'HUB'
    },
    {
        slug: "amiens",
        name: "Amiens",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 49.8987, lng: 2.2847 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "80000",
        tier: 'HUB'
    },
    {
        slug: "limoges",
        name: "Limoges",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 45.8567, lng: 1.226 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "87000",
        tier: 'HUB'
    },
    {
        slug: "perpignan",
        name: "Perpignan",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 42.699, lng: 2.9045 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "66000",
        tier: 'HUB'
    },
    {
        slug: "besancon",
        name: "Besançon",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 47.2602, lng: 6.0123 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "25000",
        tier: 'HUB'
    },
    {
        slug: "metz",
        name: "Metz",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 49.1048, lng: 6.1962 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "57000",
        tier: 'HUB'
    },
    {
        slug: "orleans",
        name: "Orléans",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 47.8734, lng: 1.9122 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "45000",
        tier: 'HUB'
    },
    {
        slug: "caen",
        name: "Caen",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 49.1846, lng: -0.3722 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "14000",
        tier: 'HUB'
    },
    {
        slug: "nancy",
        name: "Nancy",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.6881, lng: 6.1734 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "54000",
        tier: 'HUB'
    },
    {
        slug: "argenteuil",
        name: "Argenteuil",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9501, lng: 2.2478 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "95100",
        tier: 'HUB'
    },
    {
        slug: "montreuil",
        name: "Montreuil",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8637, lng: 2.4491 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "93100",
        tier: 'HUB'
    },
    {
        slug: "roubaix",
        name: "Roubaix",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 50.6887, lng: 3.1843 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "59100",
        tier: 'HUB'
    },
    {
        slug: "tourcoing",
        name: "Tourcoing",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 50.721, lng: 3.1577 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "59200",
        tier: 'HUB'
    },
    {
        slug: "nanterre",
        name: "Nanterre",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8974, lng: 2.2018 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92000",
        tier: 'HUB'
    },
    {
        slug: "vitry-sur-seine",
        name: "Vitry-sur-Seine",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.7893, lng: 2.3951 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94400",
        tier: 'HUB'
    },
    {
        slug: "creteil",
        name: "Créteil",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.7845, lng: 2.4523 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94000",
        tier: 'HUB'
    },
    {
        slug: "poitiers",
        name: "Poitiers",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 46.5846, lng: 0.3715 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "86000",
        tier: 'HUB'
    },
    {
        slug: "dunkerque",
        name: "Dunkerque",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 51.0183, lng: 2.3431 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "59140",
        tier: 'HUB'
    },
    {
        slug: "aubervilliers",
        name: "Aubervilliers",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9128, lng: 2.3886 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "93300",
        tier: 'HUB'
    },
    {
        slug: "versailles",
        name: "Versailles",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8039, lng: 2.1191 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "78000",
        tier: 'HUB'
    },
    {
        slug: "colombes",
        name: "Colombes",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9218, lng: 2.2469 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92700",
        tier: 'HUB'
    },
    {
        slug: "asnieres-sur-seine",
        name: "Asnières-sur-Seine",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9181, lng: 2.2935 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92600",
        tier: 'HUB'
    },
    {
        slug: "aulnay-sous-bois",
        name: "Aulnay-sous-Bois",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9457, lng: 2.4918 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "93600",
        tier: 'HUB'
    },
    {
        slug: "courbevoie",
        name: "Courbevoie",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8976, lng: 2.2574 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92400",
        tier: 'HUB'
    },
    {
        slug: "rueil-malmaison",
        name: "Rueil-Malmaison",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8717, lng: 2.1806 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92500",
        tier: 'HUB'
    },
    {
        slug: "champigny-sur-marne",
        name: "Champigny-sur-Marne",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8173, lng: 2.5206 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94500",
        tier: 'HUB'
    },
    {
        slug: "saint-maur-des-fosses",
        name: "Saint-Maur-des-Fossés",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.7999, lng: 2.4921 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94100",
        tier: 'HUB'
    },
    {
        slug: "la-rochelle",
        name: "La Rochelle",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 46.162, lng: -1.1765 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "17000",
        tier: 'HUB'
    },
    {
        slug: "calais",
        name: "Calais",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 50.9523, lng: 1.869 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "62100",
        tier: 'HUB'
    },
    {
        slug: "beziers",
        name: "Béziers",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 43.3481, lng: 3.2342 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "34500",
        tier: 'HUB'
    },
    {
        slug: "colmar",
        name: "Colmar",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.1115, lng: 7.3924 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "68000",
        tier: 'HUB'
    },
    {
        slug: "bourges",
        name: "Bourges",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 47.078, lng: 2.3983 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "18000",
        tier: 'HUB'
    },
    {
        slug: "quimper",
        name: "Quimper",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 47.9982, lng: -4.0972 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "29000",
        tier: 'HUB'
    },
    {
        slug: "valence",
        name: "Valence",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 44.9234, lng: 4.9164 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "26000",
        tier: 'HUB'
    },
    {
        slug: "ajaccio",
        name: "Ajaccio",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 41.9228, lng: 8.7058 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "20000",
        tier: 'HUB'
    },
    {
        slug: "bastia",
        name: "Bastia",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 42.6861, lng: 9.424 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "20200",
        tier: 'HUB'
    },
    {
        slug: "chambery",
        name: "Chambéry",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 45.5822, lng: 5.9064 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "73000",
        tier: 'HUB'
    },
    {
        slug: "niort",
        name: "Niort",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 46.3274, lng: -0.4613 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "79000",
        tier: 'HUB'
    },
    {
        slug: "lorient",
        name: "Lorient",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 47.7494, lng: -3.3799 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "56100",
        tier: 'HUB'
    },
    {
        slug: "troyes",
        name: "Troyes",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.2924, lng: 4.0761 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "10000",
        tier: 'HUB'
    },
    {
        slug: "levallois-perret",
        name: "Levallois-Perret",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8946, lng: 2.2874 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92300",
        tier: 'HUB'
    },
    {
        slug: "issy-les-moulineaux",
        name: "Issy-les-Moulineaux",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.824, lng: 2.2628 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92130",
        tier: 'HUB'
    },
    {
        slug: "boulogne-billancourt",
        name: "Boulogne-Billancourt",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8375, lng: 2.2429 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92100",
        tier: 'HUB'
    },
    {
        slug: "saint-denis",
        name: "Saint-Denis",
        heroTitle: "Sécurité Incendie",
        geo: { lat: -20.9434, lng: 55.4444 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "97400",
        tier: 'HUB'
    },
    {
        slug: "cergy",
        name: "Cergy",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 49.0373, lng: 2.0455 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "95000",
        tier: 'HUB'
    },
    {
        slug: "evry-courcouronnes",
        name: "Évry-Courcouronnes",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.6287, lng: 2.4313 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "91000",
        tier: 'HUB'
    },
    {
        slug: "massy",
        name: "Massy",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.7263, lng: 2.2696 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "91300",
        tier: 'HUB'
    },
    {
        slug: "palaiseau",
        name: "Palaiseau",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.7155, lng: 2.2293 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "91120",
        tier: 'HUB'
    },
    {
        slug: "sarcelles",
        name: "Sarcelles",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9925, lng: 2.3858 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "95200",
        tier: 'HUB'
    },
    {
        slug: "meaux",
        name: "Meaux",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9573, lng: 2.9035 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "77100",
        tier: 'HUB'
    },
    {
        slug: "chelles",
        name: "Chelles",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8845, lng: 2.5954 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "77500",
        tier: 'HUB'
    },
    {
        slug: "noisy-le-grand",
        name: "Noisy-le-Grand",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8327, lng: 2.556 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "93160",
        tier: 'HUB'
    },
    {
        slug: "fontenay-sous-bois",
        name: "Fontenay-sous-Bois",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8503, lng: 2.4736 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94120",
        tier: 'HUB'
    },
    {
        slug: "vincennes",
        name: "Vincennes",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8471, lng: 2.4383 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94300",
        tier: 'HUB'
    },
    {
        slug: "le-blanc-mesnil",
        name: "Le Blanc-Mesnil",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9372, lng: 2.4576 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "93150",
        tier: 'HUB'
    },
    {
        slug: "bondy",
        name: "Bondy",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9036, lng: 2.4846 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "93140",
        tier: 'HUB'
    },
    {
        slug: "epinay-sur-seine",
        name: "Épinay-sur-Seine",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9544, lng: 2.3172 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "93800",
        tier: 'HUB'
    },
    {
        slug: "sevran",
        name: "Sevran",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9378, lng: 2.5311 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "93270",
        tier: 'HUB'
    },
    {
        slug: "saint-germain-en-laye",
        name: "Saint-Germain-en-Laye",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.931, lng: 2.1052 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "78100",
        tier: 'HUB'
    },
    {
        slug: "mantes-la-jolie",
        name: "Mantes-la-Jolie",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9961, lng: 1.6918 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "78200",
        tier: 'HUB'
    },
    {
        slug: "poissy",
        name: "Poissy",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9241, lng: 2.025 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "78300",
        tier: 'HUB'
    },
    {
        slug: "sartrouville",
        name: "Sartrouville",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9374, lng: 2.1744 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "78500",
        tier: 'HUB'
    },
    {
        slug: "houilles",
        name: "Houilles",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9266, lng: 2.1866 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "78800",
        tier: 'HUB'
    },
    {
        slug: "chatou",
        name: "Chatou",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8964, lng: 2.1502 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "78400",
        tier: 'HUB'
    },
    {
        slug: "le-vesinet",
        name: "Le Vésinet",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8928, lng: 2.1312 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "78110",
        tier: 'HUB'
    },
    {
        slug: "croissy-sur-seine",
        name: "Croissy-sur-Seine",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8805, lng: 2.1342 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "78290",
        tier: 'HUB'
    },
    {
        slug: "saint-cloud",
        name: "Saint-Cloud",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.844, lng: 2.2032 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92210",
        tier: 'HUB'
    },
    {
        slug: "sevres",
        name: "Sèvres",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8223, lng: 2.2056 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92310",
        tier: 'HUB'
    },
    {
        slug: "ville-davray",
        name: "Ville-d'Avray",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8215, lng: 2.1759 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92410",
        tier: 'HUB'
    },
    {
        slug: "chaville",
        name: "Chaville",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8091, lng: 2.191 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92370",
        tier: 'HUB'
    },
    {
        slug: "garches",
        name: "Garches",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8469, lng: 2.1861 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92380",
        tier: 'HUB'
    },
    {
        slug: "vaucresson",
        name: "Vaucresson",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8377, lng: 2.1628 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92420",
        tier: 'HUB'
    },
    {
        slug: "marnes-la-coquette",
        name: "Marnes-la-Coquette",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8286, lng: 2.1689 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92430",
        tier: 'HUB'
    },
    {
        slug: "saint-nom-la-breteche",
        name: "Saint-Nom-la-Bretèche",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8621, lng: 2.0168 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "78860",
        tier: 'HUB'
    },
    {
        slug: "maisons-laffitte",
        name: "Maisons-Laffitte",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.9503, lng: 2.1533 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "78600",
        tier: 'HUB'
    },
    {
        slug: "antony",
        name: "Antony",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.7507, lng: 2.2976 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92160",
        tier: 'HUB'
    },
    {
        slug: "clamart",
        name: "Clamart",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.7957, lng: 2.2518 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92140",
        tier: 'HUB'
    },
    {
        slug: "le-plessis-robinson",
        name: "Le Plessis-Robinson",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.7815, lng: 2.2592 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92350",
        tier: 'HUB'
    },
    {
        slug: "fontenay-aux-roses",
        name: "Fontenay-aux-Roses",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.7895, lng: 2.2876 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92260",
        tier: 'HUB'
    },
    {
        slug: "sceaux",
        name: "Sceaux",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.776, lng: 2.2963 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92330",
        tier: 'HUB'
    },
    {
        slug: "bourg-la-reine",
        name: "Bourg-la-Reine",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.7801, lng: 2.3167 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92340",
        tier: 'HUB'
    },
    {
        slug: "bagneux",
        name: "Bagneux",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.798, lng: 2.3093 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92220",
        tier: 'HUB'
    },
    {
        slug: "malakoff",
        name: "Malakoff",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.817, lng: 2.2943 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92240",
        tier: 'HUB'
    },
    {
        slug: "vanves",
        name: "Vanves",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8214, lng: 2.2869 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92170",
        tier: 'HUB'
    },
    {
        slug: "montrouge",
        name: "Montrouge",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8159, lng: 2.3163 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "92120",
        tier: 'HUB'
    },
    {
        slug: "arcueil",
        name: "Arcueil",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8053, lng: 2.3328 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94110",
        tier: 'HUB'
    },
    {
        slug: "cachan",
        name: "Cachan",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.7914, lng: 2.3318 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94230",
        tier: 'HUB'
    },
    {
        slug: "gentilly",
        name: "Gentilly",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.812, lng: 2.3426 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94250",
        tier: 'HUB'
    },
    {
        slug: "le-kremlin-bicetre",
        name: "Le Kremlin-Bicêtre",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8087, lng: 2.356 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94270",
        tier: 'HUB'
    },
    {
        slug: "ivry-sur-seine",
        name: "Ivry-sur-Seine",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8125, lng: 2.3872 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94200",
        tier: 'HUB'
    },
    {
        slug: "villejuif",
        name: "Villejuif",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.7934, lng: 2.3603 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94800",
        tier: 'HUB'
    },
    {
        slug: "alfortville",
        name: "Alfortville",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.7963, lng: 2.4214 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94140",
        tier: 'HUB'
    },
    {
        slug: "maisons-alfort",
        name: "Maisons-Alfort",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8017, lng: 2.44 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94700",
        tier: 'HUB'
    },
    {
        slug: "joinville-le-pont",
        name: "Joinville-le-Pont",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8199, lng: 2.4685 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94340",
        tier: 'HUB'
    },
    {
        slug: "nogent-sur-marne",
        name: "Nogent-sur-Marne",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.837, lng: 2.4811 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94130",
        tier: 'HUB'
    },
    {
        slug: "le-perreux-sur-marne",
        name: "Le Perreux-sur-Marne",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8433, lng: 2.5045 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94170",
        tier: 'HUB'
    },
    {
        slug: "bry-sur-marne",
        name: "Bry-sur-Marne",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8392, lng: 2.5224 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94360",
        tier: 'HUB'
    },
    {
        slug: "villiers-sur-marne",
        name: "Villiers-sur-Marne",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8278, lng: 2.5482 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94350",
        tier: 'HUB'
    },
    {
        slug: "saint-maurice",
        name: "Saint-Maurice",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8179, lng: 2.4423 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94410",
        tier: 'HUB'
    },
    {
        slug: "charenton-le-pont",
        name: "Charenton-le-Pont",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.8229, lng: 2.405 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "94220",
        tier: 'HUB'
    },
    {
        slug: "la-roche-sur-yon",
        name: "La Roche-sur-Yon",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 46.6659, lng: -1.4162 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "85000",
        tier: 'HUB'
    },
    {
        slug: "angouleme",
        name: "Angoulême",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 45.6458, lng: 0.145 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "16000",
        tier: 'HUB'
    },
    {
        slug: "auch",
        name: "Auch",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 43.6602, lng: 0.5673 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "32000",
        tier: 'HUB'
    },
    {
        slug: "rodez",
        name: "Rodez",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 44.3591, lng: 2.5699 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "12000",
        tier: 'HUB'
    },
    {
        slug: "cahors",
        name: "Cahors",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 44.4565, lng: 1.439 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "46000",
        tier: 'HUB'
    },
    {
        slug: "brive-la-gaillarde",
        name: "Brive-la-Gaillarde",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 45.145, lng: 1.5144 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "19100",
        tier: 'HUB'
    },
    {
        slug: "tulle",
        name: "Tulle",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 45.2685, lng: 1.7663 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "19000",
        tier: 'HUB'
    },
    {
        slug: "gueret",
        name: "Guéret",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 46.1585, lng: 1.8705 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "23000",
        tier: 'HUB'
    },
    {
        slug: "chateauroux",
        name: "Châteauroux",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 46.8023, lng: 1.6903 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "36000",
        tier: 'HUB'
    },
    {
        slug: "blois",
        name: "Blois",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 47.5813, lng: 1.3049 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "41000",
        tier: 'HUB'
    },
    {
        slug: "chartres",
        name: "Chartres",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.4481, lng: 1.5046 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "28000",
        tier: 'HUB'
    },
    {
        slug: "dreux",
        name: "Dreux",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 48.7482, lng: 1.3578 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "28100",
        tier: 'HUB'
    },
    {
        slug: "evreux",
        name: "Évreux",
        heroTitle: "Sécurité Incendie",
        geo: { lat: 49.018, lng: 1.1406 },
        price_start: 90,
        top_places: ["Centre-ville", "Quartier Nord", "Quartier Sud", "Périphérie"],
        zip: "27000",
        tier: 'HUB'
    },
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
import { departementFromPostal } from "@/data/fr-departements";

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
        // `department` reste le CODE (utilisé par le maillage VillesVoisines)
        department: departementFromPostal(target.zip)?.code || target.zip.substring(0, 2),
        // Vraie région administrative (auparavant codée en dur sur "France")
        region: departementFromPostal(target.zip)?.region || "France",

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

