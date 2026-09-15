// ========================================
// BASE DÉPARTEMENTS FRANCE — données réelles
// ========================================
// Source : découpage administratif officiel (INSEE).
// Utilisée pour produire un contenu réellement local sur les pages villes :
// région, préfecture, SDIS compétent, contexte littoral / montagne.
//
// `sdis` : override quand le département n'est PAS couvert par un SDIS
//   - 75 (Paris) et 92/93/94 : Brigade de sapeurs-pompiers de Paris (BSPP)
//   - 13 (Bouches-du-Rhône) : Bataillon de marins-pompiers de Marseille (BMPM)

export interface Departement {
    code: string;
    name: string;
    region: string;
    prefecture: string;
    littoral: boolean;
    montagne: boolean;
    sdis: string;
    /** Zone de défense et de sécurité */
    zone: string;
}

type Raw = [string, string, string, string, number, number, string?];

// [code, nom, région, préfecture, littoral, montagne, sdisOverride]
const RAW: Raw[] = [
    ["01", "Ain", "Auvergne-Rhône-Alpes", "Bourg-en-Bresse", 0, 1],
    ["02", "Aisne", "Hauts-de-France", "Laon", 0, 0],
    ["03", "Allier", "Auvergne-Rhône-Alpes", "Moulins", 0, 1],
    ["04", "Alpes-de-Haute-Provence", "Provence-Alpes-Côte d'Azur", "Digne-les-Bains", 0, 1],
    ["05", "Hautes-Alpes", "Provence-Alpes-Côte d'Azur", "Gap", 0, 1],
    ["06", "Alpes-Maritimes", "Provence-Alpes-Côte d'Azur", "Nice", 1, 1],
    ["07", "Ardèche", "Auvergne-Rhône-Alpes", "Privas", 0, 1],
    ["08", "Ardennes", "Grand Est", "Charleville-Mézières", 0, 0],
    ["09", "Ariège", "Occitanie", "Foix", 0, 1],
    ["10", "Aube", "Grand Est", "Troyes", 0, 0],
    ["11", "Aude", "Occitanie", "Carcassonne", 1, 0],
    ["12", "Aveyron", "Occitanie", "Rodez", 0, 1],
    ["13", "Bouches-du-Rhône", "Provence-Alpes-Côte d'Azur", "Marseille", 1, 0, "Bataillon de marins-pompiers de Marseille (BMPM)"],
    ["14", "Calvados", "Normandie", "Caen", 1, 0],
    ["15", "Cantal", "Auvergne-Rhône-Alpes", "Aurillac", 0, 1],
    ["16", "Charente", "Nouvelle-Aquitaine", "Angoulême", 0, 0],
    ["17", "Charente-Maritime", "Nouvelle-Aquitaine", "La Rochelle", 1, 0],
    ["18", "Cher", "Centre-Val de Loire", "Bourges", 0, 0],
    ["19", "Corrèze", "Nouvelle-Aquitaine", "Tulle", 0, 1],
    ["2A", "Corse-du-Sud", "Corse", "Ajaccio", 1, 1],
    ["2B", "Haute-Corse", "Corse", "Bastia", 1, 1],
    ["21", "Côte-d'Or", "Bourgogne-Franche-Comté", "Dijon", 0, 0],
    ["22", "Côtes-d'Armor", "Bretagne", "Saint-Brieuc", 1, 0],
    ["23", "Creuse", "Nouvelle-Aquitaine", "Guéret", 0, 0],
    ["24", "Dordogne", "Nouvelle-Aquitaine", "Périgueux", 0, 0],
    ["25", "Doubs", "Bourgogne-Franche-Comté", "Besançon", 0, 1],
    ["26", "Drôme", "Auvergne-Rhône-Alpes", "Valence", 0, 1],
    ["27", "Eure", "Normandie", "Évreux", 0, 0],
    ["28", "Eure-et-Loir", "Centre-Val de Loire", "Chartres", 0, 0],
    ["29", "Finistère", "Bretagne", "Quimper", 1, 0],
    ["30", "Gard", "Occitanie", "Nîmes", 1, 0],
    ["31", "Haute-Garonne", "Occitanie", "Toulouse", 0, 1],
    ["32", "Gers", "Occitanie", "Auch", 0, 0],
    ["33", "Gironde", "Nouvelle-Aquitaine", "Bordeaux", 1, 0],
    ["34", "Hérault", "Occitanie", "Montpellier", 1, 0],
    ["35", "Ille-et-Vilaine", "Bretagne", "Rennes", 1, 0],
    ["36", "Indre", "Centre-Val de Loire", "Châteauroux", 0, 0],
    ["37", "Indre-et-Loire", "Centre-Val de Loire", "Tours", 0, 0],
    ["38", "Isère", "Auvergne-Rhône-Alpes", "Grenoble", 0, 1],
    ["39", "Jura", "Bourgogne-Franche-Comté", "Lons-le-Saunier", 0, 1],
    ["40", "Landes", "Nouvelle-Aquitaine", "Mont-de-Marsan", 1, 0],
    ["41", "Loir-et-Cher", "Centre-Val de Loire", "Blois", 0, 0],
    ["42", "Loire", "Auvergne-Rhône-Alpes", "Saint-Étienne", 0, 1],
    ["43", "Haute-Loire", "Auvergne-Rhône-Alpes", "Le Puy-en-Velay", 0, 1],
    ["44", "Loire-Atlantique", "Pays de la Loire", "Nantes", 1, 0],
    ["45", "Loiret", "Centre-Val de Loire", "Orléans", 0, 0],
    ["46", "Lot", "Occitanie", "Cahors", 0, 0],
    ["47", "Lot-et-Garonne", "Nouvelle-Aquitaine", "Agen", 0, 0],
    ["48", "Lozère", "Occitanie", "Mende", 0, 1],
    ["49", "Maine-et-Loire", "Pays de la Loire", "Angers", 0, 0],
    ["50", "Manche", "Normandie", "Saint-Lô", 1, 0],
    ["51", "Marne", "Grand Est", "Châlons-en-Champagne", 0, 0],
    ["52", "Haute-Marne", "Grand Est", "Chaumont", 0, 0],
    ["53", "Mayenne", "Pays de la Loire", "Laval", 0, 0],
    ["54", "Meurthe-et-Moselle", "Grand Est", "Nancy", 0, 0],
    ["55", "Meuse", "Grand Est", "Bar-le-Duc", 0, 0],
    ["56", "Morbihan", "Bretagne", "Vannes", 1, 0],
    ["57", "Moselle", "Grand Est", "Metz", 0, 0],
    ["58", "Nièvre", "Bourgogne-Franche-Comté", "Nevers", 0, 0],
    ["59", "Nord", "Hauts-de-France", "Lille", 1, 0],
    ["60", "Oise", "Hauts-de-France", "Beauvais", 0, 0],
    ["61", "Orne", "Normandie", "Alençon", 0, 0],
    ["62", "Pas-de-Calais", "Hauts-de-France", "Arras", 1, 0],
    ["63", "Puy-de-Dôme", "Auvergne-Rhône-Alpes", "Clermont-Ferrand", 0, 1],
    ["64", "Pyrénées-Atlantiques", "Nouvelle-Aquitaine", "Pau", 1, 1],
    ["65", "Hautes-Pyrénées", "Occitanie", "Tarbes", 0, 1],
    ["66", "Pyrénées-Orientales", "Occitanie", "Perpignan", 1, 1],
    ["67", "Bas-Rhin", "Grand Est", "Strasbourg", 0, 0],
    ["68", "Haut-Rhin", "Grand Est", "Colmar", 0, 1],
    ["69", "Rhône", "Auvergne-Rhône-Alpes", "Lyon", 0, 0],
    ["70", "Haute-Saône", "Bourgogne-Franche-Comté", "Vesoul", 0, 0],
    ["71", "Saône-et-Loire", "Bourgogne-Franche-Comté", "Mâcon", 0, 0],
    ["72", "Sarthe", "Pays de la Loire", "Le Mans", 0, 0],
    ["73", "Savoie", "Auvergne-Rhône-Alpes", "Chambéry", 0, 1],
    ["74", "Haute-Savoie", "Auvergne-Rhône-Alpes", "Annecy", 0, 1],
    ["75", "Paris", "Île-de-France", "Paris", 0, 0, "Brigade de sapeurs-pompiers de Paris (BSPP)"],
    ["76", "Seine-Maritime", "Normandie", "Rouen", 1, 0],
    ["77", "Seine-et-Marne", "Île-de-France", "Melun", 0, 0],
    ["78", "Yvelines", "Île-de-France", "Versailles", 0, 0],
    ["79", "Deux-Sèvres", "Nouvelle-Aquitaine", "Niort", 0, 0],
    ["80", "Somme", "Hauts-de-France", "Amiens", 1, 0],
    ["81", "Tarn", "Occitanie", "Albi", 0, 0],
    ["82", "Tarn-et-Garonne", "Occitanie", "Montauban", 0, 0],
    ["83", "Var", "Provence-Alpes-Côte d'Azur", "Toulon", 1, 0],
    ["84", "Vaucluse", "Provence-Alpes-Côte d'Azur", "Avignon", 0, 0],
    ["85", "Vendée", "Pays de la Loire", "La Roche-sur-Yon", 1, 0],
    ["86", "Vienne", "Nouvelle-Aquitaine", "Poitiers", 0, 0],
    ["87", "Haute-Vienne", "Nouvelle-Aquitaine", "Limoges", 0, 0],
    ["88", "Vosges", "Grand Est", "Épinal", 0, 1],
    ["89", "Yonne", "Bourgogne-Franche-Comté", "Auxerre", 0, 0],
    ["90", "Territoire de Belfort", "Bourgogne-Franche-Comté", "Belfort", 0, 0],
    ["91", "Essonne", "Île-de-France", "Évry-Courcouronnes", 0, 0],
    ["92", "Hauts-de-Seine", "Île-de-France", "Nanterre", 0, 0, "Brigade de sapeurs-pompiers de Paris (BSPP)"],
    ["93", "Seine-Saint-Denis", "Île-de-France", "Bobigny", 0, 0, "Brigade de sapeurs-pompiers de Paris (BSPP)"],
    ["94", "Val-de-Marne", "Île-de-France", "Créteil", 0, 0, "Brigade de sapeurs-pompiers de Paris (BSPP)"],
    ["95", "Val-d'Oise", "Île-de-France", "Cergy", 0, 0],
    ["971", "Guadeloupe", "Guadeloupe", "Basse-Terre", 1, 0],
    ["972", "Martinique", "Martinique", "Fort-de-France", 1, 0],
    ["973", "Guyane", "Guyane", "Cayenne", 1, 0],
    ["974", "La Réunion", "La Réunion", "Saint-Denis", 1, 0],
    ["976", "Mayotte", "Mayotte", "Mamoudzou", 1, 0],
];

const ZONES: Record<string, string> = {
    "Île-de-France": "zone de défense et de sécurité de Paris",
    "Auvergne-Rhône-Alpes": "zone de défense et de sécurité Sud-Est",
    "Provence-Alpes-Côte d'Azur": "zone de défense et de sécurité Sud",
    "Occitanie": "zone de défense et de sécurité Sud",
    "Corse": "zone de défense et de sécurité Sud",
    "Nouvelle-Aquitaine": "zone de défense et de sécurité Sud-Ouest",
    "Pays de la Loire": "zone de défense et de sécurité Ouest",
    "Bretagne": "zone de défense et de sécurité Ouest",
    "Normandie": "zone de défense et de sécurité Ouest",
    "Centre-Val de Loire": "zone de défense et de sécurité Ouest",
    "Hauts-de-France": "zone de défense et de sécurité Nord",
    "Grand Est": "zone de défense et de sécurité Est",
    "Bourgogne-Franche-Comté": "zone de défense et de sécurité Est",
};

export const DEPARTEMENTS: Record<string, Departement> = RAW.reduce((acc, r) => {
    const [code, name, region, prefecture, littoral, montagne, sdis] = r;
    acc[code] = {
        code,
        name,
        region,
        prefecture,
        littoral: littoral === 1,
        montagne: montagne === 1,
        sdis: sdis || `SDIS ${code.length === 3 ? name : code + " " + name}`,
        zone: ZONES[region] || "zone de défense et de sécurité",
    };
    return acc;
}, {} as Record<string, Departement>);

/**
 * Déduit le département depuis un code postal français.
 * Gère la Corse (20xxx → 2A/2B), qui casse un simple substring(0, 2).
 */
export function departementFromPostal(postal: string): Departement | undefined {
    if (!postal) return undefined;
    const cp = postal.trim();

    // Corse : 20000–20190 → Corse-du-Sud (2A) ; 20200–20600 → Haute-Corse (2B)
    if (cp.startsWith("20")) {
        const n = parseInt(cp, 10);
        if (n >= 20000 && n <= 20190) return DEPARTEMENTS["2A"];
        if (n >= 20200 && n <= 20600) return DEPARTEMENTS["2B"];
        return DEPARTEMENTS["2A"];
    }

    // Outre-mer à 3 chiffres (971–976)
    const om = cp.substring(0, 3);
    if (DEPARTEMENTS[om]) return DEPARTEMENTS[om];

    return DEPARTEMENTS[cp.substring(0, 2)];
}

// ========================================
// VENTS LOCAUX NOMMÉS (données réelles)
// ========================================
// Les vents régionaux français portent un nom, et ce nom compte :
// il détermine le dimensionnement mécanique d'une structure extérieure.
const VENTS: Record<string, string> = {
    // Provence / vallée du Rhône
    "04": "le mistral", "05": "le mistral", "13": "le mistral", "30": "le mistral",
    "83": "le mistral", "84": "le mistral", "26": "le mistral", "07": "le mistral",
    // Occitanie méditerranéenne
    "11": "la tramontane", "66": "la tramontane", "34": "la tramontane",
    // Occitanie intérieure
    "31": "le vent d'autan", "81": "le vent d'autan", "82": "le vent d'autan",
    "12": "le vent d'autan", "46": "le vent d'autan",
    // Est / nord-est
    "01": "la bise", "08": "la bise", "10": "la bise", "18": "la bise", "21": "la bise",
    "25": "la bise", "39": "la bise", "42": "la bise", "51": "la bise", "52": "la bise",
    "54": "la bise", "55": "la bise", "57": "la bise", "58": "la bise", "67": "la bise",
    "68": "la bise", "69": "la bise", "70": "la bise", "71": "la bise", "88": "la bise",
    "89": "la bise", "90": "la bise", "03": "la bise", "38": "la bise",
    // Façade atlantique et Manche
    "14": "les vents d'ouest océaniques", "22": "les vents d'ouest océaniques",
    "29": "les vents d'ouest océaniques", "35": "les vents d'ouest océaniques",
    "44": "les vents d'ouest océaniques", "49": "les vents d'ouest océaniques",
    "50": "les vents d'ouest océaniques", "53": "les vents d'ouest océaniques",
    "56": "les vents d'ouest océaniques", "61": "les vents d'ouest océaniques",
    "72": "les vents d'ouest océaniques", "76": "les vents d'ouest océaniques",
    "85": "les vents d'ouest océaniques", "17": "les vents d'ouest océaniques",
    "16": "les vents d'ouest océaniques", "79": "les vents d'ouest océaniques",
    "86": "les vents d'ouest océaniques", "87": "les vents d'ouest océaniques",
    "24": "les vents d'ouest océaniques", "19": "les vents d'ouest océaniques",
    "23": "les vents d'ouest océaniques", "33": "les vents d'ouest océaniques",
    "40": "les vents d'ouest océaniques", "47": "les vents d'ouest océaniques",
    "64": "les vents d'ouest océaniques", "65": "les vents d'ouest océaniques",
    "63": "les vents d'ouest océaniques", "15": "les vents d'ouest océaniques",
    "43": "les vents d'ouest océaniques", "48": "les vents d'ouest océaniques",
    "09": "les vents d'ouest océaniques", "32": "les vents d'ouest océaniques",
    // Corse
    "2A": "le libeccio", "2B": "le libeccio",
    // Vallée du Rhône / Auvergne
    "59": "les vents d'ouest océaniques", "62": "les vents d'ouest océaniques",
    "80": "les vents d'ouest océaniques", "02": "les vents d'ouest océaniques",
    "27": "les vents d'ouest océaniques", "60": "les vents d'ouest océaniques",
    "28": "les vents d'ouest océaniques", "36": "les vents d'ouest océaniques",
    "37": "les vents d'ouest océaniques", "41": "les vents d'ouest océaniques",
    "45": "les vents d'ouest océaniques",
};

/** Retourne le vent dominant nommé d'un département (ex. "13" → "le mistral"). */
export function ventForDepartement(code: string | undefined): string {
    if (!code) return "les vents d'ouest dominants";
    return VENTS[code] || "les vents d'ouest dominants";
}
