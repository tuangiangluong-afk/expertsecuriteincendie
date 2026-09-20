// ============================================================
// FAITS LOCAUX REELS - fichier genere, ne pas editer a la main.
// Chaque valeur est une mesure, pas une appreciation redactionnelle :
//   climat, rayonnement et vent  -> NASA POWER, climatologie 20 ans
//       (SYN1DEG/MERRA2), base janvier 2001 - decembre 2020.
//   productible photovoltaique   -> JRC PVGIS-SARAH2 / ERA5, 2005-2020,
//       inclinaison et orientation optimales, pertes systeme 14 %.
//   risques et sismicite         -> Georisques, Ministere de la Transition
//       ecologique et de la Cohesion des territoires.
// ============================================================

export interface LocalFacts {
    /** Rayonnement solaire recu par an, kWh/m2 */
    sunKwh: number | null;
    /** Temperature moyenne annuelle, degres C */
    tmean: number | null;
    /** Temperature de base hivernale (P190), degres C */
    tminJan: number | null;
    /** Precipitations annuelles, mm */
    rainMm: number | null;
    /** Degres-jours unifies base 18, chauffage */
    dju18: number | null;
    /** Direction dominante du vent (rose des vents) */
    windDir: string | null;
    /** Vitesse moyenne du vent, km/h */
    windKmh: number | null;
    /** Productible reel, kWh par kWc et par an (PVGIS) */
    pvYield?: number;
    /** Inclinaison optimale des modules, degres (PVGIS) */
    pvSlope?: number;
    /** Irradiation dans le plan optimal, kWh/m2/an (PVGIS) */
    pvSun?: number;
    /** Risques recenses dans la commune (Georisques) */
    risks?: string[];
    /** Zone de sismicite reglementaire (Georisques) */
    sismicite?: string | null;
}

export const LOCAL_FACTS_SOURCE =
    "NASA POWER (climatologie 20 ans, SYN1DEG/MERRA2) ; JRC PVGIS-SARAH2 (2005-2020) ; Georisques (Ministere de la Transition ecologique)";

export const LOCAL_FACTS: Record<string, LocalFacts> = {
    "agen": { sunKwh: 1380, tmean: 13.5, tminJan: -8.6, rainMm: 679, dju18: 2052, windDir: "ONO", windKmh: 7.7, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "aix-en-provence": { sunKwh: 1621, tmean: 14.2, tminJan: -5.9, rainMm: 558, dju18: 1935, windDir: "NNO", windKmh: 10.9, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "4 - MOYENNE" },
    "ajaccio": { sunKwh: 1652, tmean: 16.1, tminJan: -0.2, rainMm: 832, dju18: 1337, windDir: "O", windKmh: 12.0, risks: ["Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "albi": { sunKwh: 1421, tmean: 12.8, tminJan: -12.8, rainMm: 694, dju18: 2221, windDir: "NO", windKmh: 9.4, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "alfortville": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "amiens": { sunKwh: 1164, tmean: 10.1, tminJan: -11.6, rainMm: 748, dju18: 2885, windDir: "OSO", windKmh: 11.1, risks: ["Inondation", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "angers": { sunKwh: 1270, tmean: 11.8, tminJan: -10.9, rainMm: 715, dju18: 2361, windDir: "OSO", windKmh: 10.4, risks: ["Inondation", "Mouvement de terrain", "Radon", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "angouleme": { sunKwh: 1334, tmean: 12.7, tminJan: -10.0, rainMm: 766, dju18: 2171, windDir: "O", windKmh: 9.6, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "annecy": { sunKwh: 1357, tmean: 8.9, tminJan: -20.1, rainMm: 1106, dju18: 3355, windDir: "OSO", windKmh: 5.4, risks: ["Inondation", "Mouvement de terrain", "Radon", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "4 - MOYENNE" },
    "antibes": { sunKwh: 1569, tmean: 15.6, tminJan: -0.6, rainMm: 704, dju18: 1496, windDir: "E", windKmh: 10.0, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "antony": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "arcueil": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "argenteuil": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "asnieres-sur-seine": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "aubervilliers": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "auch": { sunKwh: 1396, tmean: 13.6, tminJan: -7.8, rainMm: 777, dju18: 1974, windDir: "ONO", windKmh: 7.5 },
    "aulnay-sous-bois": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "avignon": { sunKwh: 1609, tmean: 13.7, tminJan: -10.3, rainMm: 635, dju18: 2108, windDir: "N", windKmh: 11.2, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "bagneux": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "bastia": { sunKwh: 1570, tmean: 16.0, tminJan: -0.8, rainMm: 639, dju18: 1428, windDir: "O", windKmh: 11.3, risks: ["Inondation", "Radon", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "bayonne": { sunKwh: 1359, tmean: 13.8, tminJan: -5.1, rainMm: 1066, dju18: 1779, windDir: "O", windKmh: 8.3, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "beauvais": { sunKwh: 1164, tmean: 10.3, tminJan: -12.0, rainMm: 715, dju18: 2801, windDir: "OSO", windKmh: 10.8, risks: ["Inondation", "Risque industriel"], sismicite: "1 - TRES FAIBLE" },
    "besancon": { sunKwh: 1254, tmean: 10.1, tminJan: -12.7, rainMm: 1007, dju18: 2981, windDir: "SO", windKmh: 8.0, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "beziers": { sunKwh: 1508, tmean: 13.2, tminJan: -7.8, rainMm: 617, dju18: 2133, windDir: "NO", windKmh: 6.7, risks: ["Inondation", "Mouvement de terrain", "Radon", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "biarritz": { sunKwh: 1359, tmean: 13.8, tminJan: -5.1, rainMm: 1066, dju18: 1779, windDir: "O", windKmh: 8.3, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "blois": { sunKwh: 1258, tmean: 11.7, tminJan: -10.4, rainMm: 675, dju18: 2482, windDir: "OSO", windKmh: 10.3, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "bondy": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "bordeaux": { sunKwh: 1378, tmean: 13.4, tminJan: -8.4, rainMm: 748, dju18: 1942, windDir: "ONO", windKmh: 6.6, risks: ["Inondation", "Mouvement de terrain", "Radon", "Risque industriel"], sismicite: "2 - FAIBLE" },
    "boulogne-billancourt": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "bourg-la-reine": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "bourges": { sunKwh: 1246, tmean: 11.3, tminJan: -9.8, rainMm: 745, dju18: 2571, windDir: "OSO", windKmh: 9.4, risks: ["Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "brest": { sunKwh: 1238, tmean: 11.9, tminJan: -3.5, rainMm: 898, dju18: 2209, windDir: "OSO", windKmh: 16.8, risks: ["Inondation", "Mouvement de terrain", "Radon", "Risque industriel"], sismicite: "2 - FAIBLE" },
    "brive-la-gaillarde": { sunKwh: 1334, tmean: 12.3, tminJan: -10.6, rainMm: 788, dju18: 2297, windDir: "OSO", windKmh: 8.7, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "bry-sur-marne": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "cachan": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "caen": { sunKwh: 1193, tmean: 10.8, tminJan: -9.3, rainMm: 745, dju18: 2625, windDir: "OSO", windKmh: 13.2, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "cagnes-sur-mer": { sunKwh: 1569, tmean: 15.6, tminJan: -0.6, rainMm: 704, dju18: 1496, windDir: "E", windKmh: 10.0, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "4 - MOYENNE" },
    "cahors": { sunKwh: 1386, tmean: 12.7, tminJan: -11.5, rainMm: 719, dju18: 2204, windDir: "O", windKmh: 8.9, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "calais": { sunKwh: 1192, tmean: 11.2, tminJan: -4.3, rainMm: 759, dju18: 2470, windDir: "OSO", windKmh: 17.8, risks: ["Inondation", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "cannes": { sunKwh: 1569, tmean: 15.6, tminJan: -0.6, rainMm: 704, dju18: 1496, windDir: "E", windKmh: 10.0 },
    "castres": { sunKwh: 1421, tmean: 12.3, tminJan: -8.9, rainMm: 664, dju18: 2360, windDir: "NO", windKmh: 9.1, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "cergy": { sunKwh: 1164, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "chambery": { sunKwh: 1367, tmean: 10.1, tminJan: -13.1, rainMm: 949, dju18: 2962, windDir: "NO", windKmh: 4.4, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "4 - MOYENNE" },
    "champigny-sur-marne": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "charenton-le-pont": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "chartres": { sunKwh: 1208, tmean: 10.6, tminJan: -11.9, rainMm: 646, dju18: 2729, windDir: "OSO", windKmh: 11.0, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "chateauroux": { sunKwh: 1297, tmean: 11.6, tminJan: -9.5, rainMm: 726, dju18: 2499, windDir: "OSO", windKmh: 9.7, risks: ["Inondation", "Mouvement de terrain", "Radon", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "chatou": { sunKwh: 1210, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "chaville": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "chelles": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "clamart": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "clermont-ferrand": { sunKwh: 1328, tmean: 10.5, tminJan: -15.2, rainMm: 701, dju18: 2853, windDir: "O", windKmh: 8.8, risks: ["Inondation", "Mouvement de terrain", "Radon", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "colmar": { sunKwh: 1197, tmean: 9.9, tminJan: -13.3, rainMm: 847, dju18: 3049, windDir: "OSO", windKmh: 6.3, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "colombes": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "courbevoie": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "creteil": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "croissy-sur-seine": { sunKwh: 1210, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "dax": { sunKwh: 1359, tmean: 13.8, tminJan: -5.1, rainMm: 1066, dju18: 1779, windDir: "O", windKmh: 8.3, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "dijon": { sunKwh: 1250, tmean: 9.9, tminJan: -11.2, rainMm: 796, dju18: 2992, windDir: "O", windKmh: 9.4, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "dreux": { sunKwh: 1208, tmean: 10.6, tminJan: -11.9, rainMm: 646, dju18: 2729, windDir: "OSO", windKmh: 11.0, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "dunkerque": { sunKwh: 1142, tmean: 10.8, tminJan: -7.5, rainMm: 756, dju18: 2621, windDir: "SO", windKmh: 14.3, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "epinay-sur-seine": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "evreux": { sunKwh: 1168, tmean: 10.7, tminJan: -11.8, rainMm: 664, dju18: 2687, windDir: "OSO", windKmh: 10.9, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "evry-courcouronnes": { sunKwh: 1210, tmean: 11.1, tminJan: -12.1, rainMm: 657, dju18: 2610, windDir: "OSO", windKmh: 10.3, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "fontenay-aux-roses": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "fontenay-sous-bois": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "garches": { sunKwh: 1210, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "gentilly": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "grenoble": { sunKwh: 1367, tmean: 8.0, tminJan: -16.4, rainMm: 858, dju18: 3664, windDir: "E", windKmh: 1.6, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "4 - MOYENNE" },
    "gueret": { sunKwh: 1297, tmean: 10.1, tminJan: -12.6, rainMm: 883, dju18: 2926, windDir: "SO", windKmh: 10.1, risks: ["Radon", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "houilles": { sunKwh: 1210, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "issy-les-moulineaux": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "ivry-sur-seine": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "joinville-le-pont": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "la-roche-sur-yon": { sunKwh: 1350, tmean: 12.4, tminJan: -8.6, rainMm: 785, dju18: 2126, windDir: "O", windKmh: 11.4, risks: ["Inondation", "Mouvement de terrain", "Radon", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "la-rochelle": { sunKwh: 1350, tmean: 13.5, tminJan: -3.2, rainMm: 748, dju18: 1766, windDir: "ONO", windKmh: 14.8, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "le-blanc-mesnil": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "le-havre": { sunKwh: 1168, tmean: 11.7, tminJan: -3.5, rainMm: 803, dju18: 2307, windDir: "OSO", windKmh: 16.5, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "le-kremlin-bicetre": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "le-mans": { sunKwh: 1258, tmean: 11.3, tminJan: -10.9, rainMm: 708, dju18: 2513, windDir: "OSO", windKmh: 10.4, risks: ["Inondation", "Mouvement de terrain", "Risque industriel"], sismicite: "2 - FAIBLE" },
    "le-perreux-sur-marne": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "le-plessis-robinson": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "le-vesinet": { sunKwh: 1210, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "levallois-perret": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "lille": { sunKwh: 1134, tmean: 10.4, tminJan: -10.9, rainMm: 730, dju18: 2783, windDir: "SO", windKmh: 11.1, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "limoges": { sunKwh: 1334, tmean: 11.2, tminJan: -10.6, rainMm: 869, dju18: 2608, windDir: "SSO", windKmh: 10.2, risks: ["Inondation", "Mouvement de terrain", "Radon", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "lorient": { sunKwh: 1325, tmean: 13.1, tminJan: -1.6, rainMm: 730, dju18: 1834, windDir: "O", windKmh: 17.4, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "lyon": { sunKwh: 1367, tmean: 11.4, tminJan: -11.6, rainMm: 843, dju18: 2641, windDir: "ONO", windKmh: 8.2, risks: ["Inondation", "Radon", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "maisons-alfort": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "maisons-laffitte": { sunKwh: 1210, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "malakoff": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "mantes-la-jolie": { sunKwh: 1208, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "marne-la-vallee": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "marnes-la-coquette": { sunKwh: 1210, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "marseille": { sunKwh: 1621, tmean: 14.2, tminJan: -5.9, rainMm: 558, dju18: 1935, windDir: "NNO", windKmh: 10.9, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "massy": { sunKwh: 1210, tmean: 11.1, tminJan: -12.1, rainMm: 657, dju18: 2610, windDir: "OSO", windKmh: 10.3, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "meaux": { sunKwh: 1210, tmean: 10.6, tminJan: -12.1, rainMm: 708, dju18: 2755, windDir: "OSO", windKmh: 10.3, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "metz": { sunKwh: 1150, tmean: 9.9, tminJan: -15.5, rainMm: 752, dju18: 3034, windDir: "SO", windKmh: 9.6, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "mont-de-marsan": { sunKwh: 1363, tmean: 13.7, tminJan: -7.8, rainMm: 829, dju18: 1892, windDir: "O", windKmh: 0.4, risks: ["Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "montauban": { sunKwh: 1386, tmean: 13.3, tminJan: -9.9, rainMm: 694, dju18: 2078, windDir: "ONO", windKmh: 8.7, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "montpellier": { sunKwh: 1508, tmean: 15.2, tminJan: -2.4, rainMm: 573, dju18: 1604, windDir: "NNO", windKmh: 12.4, risks: ["Inondation", "Mouvement de terrain", "Radon", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "montreuil": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "montrouge": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "mulhouse": { sunKwh: 1254, tmean: 9.9, tminJan: -13.3, rainMm: 847, dju18: 3049, windDir: "OSO", windKmh: 6.3, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "nancy": { sunKwh: 1197, tmean: 9.9, tminJan: -12.1, rainMm: 759, dju18: 3030, windDir: "SO", windKmh: 9.3, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "nanterre": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "nantes": { sunKwh: 1270, tmean: 11.8, tminJan: -9.8, rainMm: 799, dju18: 2310, windDir: "OSO", windKmh: 10.4, risks: ["Inondation", "Mouvement de terrain", "Radon", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "neuilly-sur-seine": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "nice": { sunKwh: 1569, tmean: 16.7, tminJan: 2.5, rainMm: 683, dju18: 1046, windDir: "E", windKmh: 12.8, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "4 - MOYENNE" },
    "nimes": { sunKwh: 1609, tmean: 14.0, tminJan: -9.2, rainMm: 737, dju18: 2046, windDir: "N", windKmh: 9.6, risks: ["Mouvement de terrain", "Radon", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "niort": { sunKwh: 1350, tmean: 11.9, tminJan: -9.5, rainMm: 781, dju18: 2301, windDir: "O", windKmh: 10.3, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "nogent-sur-marne": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "noisy-le-grand": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "orleans": { sunKwh: 1258, tmean: 11.2, tminJan: -11.4, rainMm: 664, dju18: 2575, windDir: "OSO", windKmh: 10.3, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "orly": { sunKwh: 1210, tmean: 11.1, tminJan: -12.1, rainMm: 657, dju18: 2610, windDir: "OSO", windKmh: 10.3, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "palaiseau": { sunKwh: 1210, tmean: 11.1, tminJan: -12.1, rainMm: 657, dju18: 2610, windDir: "OSO", windKmh: 10.3, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "paris": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Transport de marchandises dangereuses"] },
    "pau": { sunKwh: 1363, tmean: 13.6, tminJan: -6.5, rainMm: 960, dju18: 1922, windDir: "O", windKmh: 6.8, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "4 - MOYENNE" },
    "pays-de-gex": { sunKwh: 1309, tmean: 9.0, tminJan: -18.3, rainMm: 1164, dju18: 3318, windDir: "O", windKmh: 7.6, risks: ["Inondation", "Mouvement de terrain"], sismicite: "3 - MODEREE" },
    "perpignan": { sunKwh: 1487, tmean: 15.7, tminJan: -0.8, rainMm: 584, dju18: 1389, windDir: "NNO", windKmh: 15.0, risks: ["Inondation", "Mouvement de terrain", "Radon", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "poissy": { sunKwh: 1210, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "poitiers": { sunKwh: 1297, tmean: 11.9, tminJan: -9.0, rainMm: 770, dju18: 2391, windDir: "OSO", windKmh: 10.0, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "quimper": { sunKwh: 1298, tmean: 12.4, tminJan: -3.0, rainMm: 934, dju18: 2038, windDir: "O", windKmh: 16.5, risks: ["Inondation", "Mouvement de terrain", "Radon"], sismicite: "2 - FAIBLE" },
    "reims": { sunKwh: 1149, tmean: 10.4, tminJan: -12.1, rainMm: 741, dju18: 2819, windDir: "SO", windKmh: 10.1, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "rennes": { sunKwh: 1208, tmean: 11.6, tminJan: -10.4, rainMm: 708, dju18: 2364, windDir: "OSO", windKmh: 10.8, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "rodez": { sunKwh: 1401, tmean: 11.0, tminJan: -12.1, rainMm: 796, dju18: 2714, windDir: "NNO", windKmh: 9.8, risks: ["Inondation", "Mouvement de terrain", "Radon", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "roissy-en-france": { sunKwh: 1164, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "roubaix": { sunKwh: 1134, tmean: 10.4, tminJan: -10.9, rainMm: 730, dju18: 2783, windDir: "SO", windKmh: 11.1, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "rouen": { sunKwh: 1168, tmean: 10.4, tminJan: -11.0, rainMm: 748, dju18: 2757, windDir: "OSO", windKmh: 11.3, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "rueil-malmaison": { sunKwh: 1210, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "saint-cloud": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "saint-denis": { sunKwh: 2112, tmean: 21.7, tminJan: 19.2, rainMm: 792, dju18: 0, windDir: "E", windKmh: 16.4, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "saint-etienne": { sunKwh: 1367, tmean: 10.2, tminJan: -13.8, rainMm: 694, dju18: 2976, windDir: "ONO", windKmh: 8.5, risks: ["Inondation", "Mouvement de terrain", "Radon", "Risque industriel"], sismicite: "2 - FAIBLE" },
    "saint-exupery": { sunKwh: 1378, tmean: 13.4, tminJan: -9.4, rainMm: 756, dju18: 2012, windDir: "ONO", windKmh: 5.8, risks: ["Mouvement de terrain"], sismicite: "1 - TRES FAIBLE" },
    "saint-germain-en-laye": { sunKwh: 1210, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "saint-maur-des-fosses": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "saint-maurice": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "saint-nom-la-breteche": { sunKwh: 1210, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "sarcelles": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "sartrouville": { sunKwh: 1210, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "sceaux": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "sevran": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "sevres": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "strasbourg": { sunKwh: 1197, tmean: 10.3, tminJan: -13.0, rainMm: 756, dju18: 2949, windDir: "OSO", windKmh: 6.9, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "tarbes": { sunKwh: 1396, tmean: 9.7, tminJan: -12.3, rainMm: 869, dju18: 3044, windDir: "O", windKmh: 6.0, risks: ["Inondation", "Mouvement de terrain", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "4 - MOYENNE" },
    "toulon": { sunKwh: 1621, tmean: 16.1, tminJan: 0.8, rainMm: 562, dju18: 1175, windDir: "NO", windKmh: 18.1, risks: ["Inondation", "Mouvement de terrain", "Radon", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "toulouse": { sunKwh: 1409, tmean: 13.6, tminJan: -7.7, rainMm: 785, dju18: 2016, windDir: "ONO", windKmh: 8.2, risks: ["Inondation", "Mouvement de terrain", "Risque industriel"], sismicite: "1 - TRES FAIBLE" },
    "tourcoing": { sunKwh: 1134, tmean: 10.4, tminJan: -10.9, rainMm: 730, dju18: 2783, windDir: "SO", windKmh: 11.1, risks: ["Inondation", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "tours": { sunKwh: 1258, tmean: 11.6, tminJan: -10.9, rainMm: 697, dju18: 2462, windDir: "OSO", windKmh: 10.3, risks: ["Inondation", "Mouvement de terrain"], sismicite: "2 - FAIBLE" },
    "troyes": { sunKwh: 1203, tmean: 10.8, tminJan: -11.2, rainMm: 734, dju18: 2741, windDir: "SO", windKmh: 9.8, risks: ["Inondation", "Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "tulle": { sunKwh: 1334, tmean: 10.2, tminJan: -14.3, rainMm: 909, dju18: 2908, windDir: "SO", windKmh: 7.1, risks: ["Inondation"], sismicite: "1 - TRES FAIBLE" },
    "valence": { sunKwh: 1468, tmean: 11.6, tminJan: -11.6, rainMm: 781, dju18: 2611, windDir: "N", windKmh: 9.5, risks: ["Inondation", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "3 - MODEREE" },
    "vanves": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "vaucresson": { sunKwh: 1210, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "versailles": { sunKwh: 1210, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "ville-davray": { sunKwh: 1210, tmean: 10.8, tminJan: -12.1, rainMm: 672, dju18: 2687, windDir: "OSO", windKmh: 10.6, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "villejuif": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "villeurbanne": { sunKwh: 1367, tmean: 11.4, tminJan: -11.6, rainMm: 843, dju18: 2641, windDir: "ONO", windKmh: 8.2, risks: ["Inondation", "Radon", "Transport de marchandises dangereuses"], sismicite: "2 - FAIBLE" },
    "villiers-sur-marne": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Mouvement de terrain", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "vincennes": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
    "vitry-sur-seine": { sunKwh: 1210, tmean: 10.9, tminJan: -12.3, rainMm: 661, dju18: 2648, windDir: "OSO", windKmh: 10.5, risks: ["Inondation", "Risque industriel", "Transport de marchandises dangereuses"], sismicite: "1 - TRES FAIBLE" },
};

/**
 * Faits locaux d'une commune. Accepte indifferemment le slug de la cible
 * national-targets et le slug derive du nom de la commune.
 */
export function getLocalFacts(...candidates: (string | undefined | null)[]): LocalFacts | undefined {
    for (const candidate of candidates) {
        if (!candidate) continue;
        const direct = LOCAL_FACTS[candidate];
        if (direct) return direct;
    }
    return undefined;
}
