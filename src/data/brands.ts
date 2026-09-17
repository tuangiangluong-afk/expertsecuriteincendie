/**
 * Marques de matériel incendie prises en charge.
 *
 * Règle de conception : ce fichier ne contient QUE des faits publiés par le
 * constructeur lui-même, avec l'URL de la source. Les pages ville x marque
 * tirent leur contenu de ce fichier ; si une information n'est pas vérifiée,
 * elle est absente plutôt qu'inventée.
 *
 * Historique : la version précédente listait des « modèles » fabriqués
 * (« Star 6 », « Heavy 9L », « Pydrex 6L ») qui ne correspondent à aucun
 * produit réel. La dimension marque était donc à la fois fausse et vide :
 * 4 pages par commune identiques à 88 %.
 */

export interface BrandRange {
    /** Nom de gamme publié par le constructeur, quand il en publie un */
    range?: string;
    /** Agent extincteur réellement mis en œuvre */
    agent: string;
    /** Classes de feu couvertes (NF EN 2) */
    classes: string;
    /** Capacités usuelles de ce type d'appareil */
    capacites: string[];
    /**
     * Ce que le technicien vérifie sur cet appareil lors du passage annuel.
     * La procédure dépend de l'agent extincteur, pas du logo sur le corps :
     * on pèse un CO2, on fluidise une poudre, on contrôle le taux d'additif
     * d'un appareil à eau + additif.
     */
    controle: string;
}

export interface Brand {
    name: string;
    slug: string;
    /** Raison sociale ou groupe qui exploite la marque aujourd'hui */
    groupe: string;
    /** Périmètre réel de la marque, tel que le constructeur le décrit */
    perimetre: string;
    /** Réseau et implantation, tels que le constructeur les publie */
    reseau: string;
    /** Gammes et agents réellement couverts */
    ranges: BrandRange[];
    /** Faits vérifiables complémentaires, sourcés */
    faits: string[];
    /** Type de matériel, pour les blocs de synthèse */
    type: string;
    /** URL de la source constructeur */
    source: string;
    /**
     * true si le constructeur publie lui-même les informations ci-dessus.
     * Quand c'est false, la page n'affiche pas de bloc groupe/réseau : on
     * n'écrit pas de faits non vérifiés pour remplir une page.
     */
    verifieConstructeur: boolean;
}

export type BrandData = Brand;

// Procédures de vérification par agent (NF EN 3 et NF S 61-919).
// Ce sont les mêmes opérations pour tous les fabricants : c'est l'agent qui
// détermine le geste technique, et c'est ce qui différencie réellement deux
// marques dès lors qu'elles ne couvrent pas les mêmes agents.
const CONTROLE_EAU_ADDITIF =
    "contrôle de la pression au manomètre (zone verte), vérification du taux d'additif et de la date de péremption du produit, essai du flexible et de la buse, contrôle du percuteur et du joint de tête";

const CONTROLE_EAU_SANS_ADDITIF =
    "contrôle de la pression de la cartouche de gaz propulseur, essai du flexible, vérification du plombage et de la goupille de sécurité";

const CONTROLE_EAU_SANS_FLUOR =
    "contrôle de la pression au manomètre, vérification de la composition de l'additif (formule sans composés fluorés), essai du flexible et contrôle du dispositif de sécurité de tête";

const CONTROLE_POUDRE =
    "fluidisation de la poudre (retournement de l'appareil ou apport de gaz propulseur), contrôle de la cartouche de gaz, vérification du tuyau, de la lance et du plombage";

const CONTROLE_CO2 =
    "pesée de la bouteille pour détecter une fuite (perte de charge tolérée : 10 % du poids net), contrôle du diffuseur exposé au bouchage par la neige carbonique, du tube plongeur et de la poignée";

const CONTROLE_ROUES =
    "contrôle séparé de la bouteille de gaz propulseur et de la réserve d'agent, du dévidoir et du flexible haute pression, avec essai de propulsion";

export const brands: Brand[] = [
    {
        name: "Desautel",
        slug: "desautel",
        groupe: "Desautel",
        perimetre:
            "Matériel et systèmes de protection incendie, maintenance et formation, à destination des entreprises, sur l'ensemble du territoire français.",
        reseau: "Protection incendie dans toute la France.",
        verifieConstructeur: true,
        source: "https://www.desautel.fr/",
        type: "Extincteurs portables & systèmes",
        faits: [
            "Maintenance et formation assurées par le constructeur lui-même, en complément de la fourniture de matériel",
            "Interventions sur les ERP et les locaux professionnels de toute la France",
        ],
        ranges: [
            {
                agent: "Eau + additif",
                classes: "A et B",
                capacites: ["6 L", "9 L"],
                controle: CONTROLE_EAU_ADDITIF,
            },
            {
                agent: "Poudre ABC",
                classes: "A, B et C",
                capacites: ["1 kg", "2 kg", "6 kg", "9 kg"],
                controle: CONTROLE_POUDRE,
            },
            {
                agent: "CO2",
                classes: "B et feux d'origine électrique",
                capacites: ["2 kg", "5 kg"],
                controle: CONTROLE_CO2,
            },
        ],
    },
    {
        name: "Sicli",
        slug: "sicli",
        groupe: "Chubb Fire & Security France",
        perimetre:
            "Extincteurs mobiles de la gamme SICLI INgénio (versions eau & additifs, poudre et CO2), gamme INtégral eau + additif sans fluor (sans PFAS), et extincteurs sur roues INstant E50 AB N2 à pression auxiliaire.",
        reseau:
            "Marque exploitée par Chubb Fire & Security France : plus de 12 000 collaborateurs et plus de 200 agences implantées dans 17 pays.",
        verifieConstructeur: true,
        source: "https://chubbfs.com/fr-fr/extincteur-ingenio-e6-e9-ab/",
        type: "Extincteurs portables & sur roues",
        faits: [
            "La marque historique Sicli est aujourd'hui portée par Chubb Fire & Security France, qui publie le catalogue SICLI",
            "La gamme INtégral eau et additif est présentée par le constructeur comme sans composés fluorés (PFAS)",
            "INstant E50 AB N2 est un extincteur sur roues à pression auxiliaire, destiné aux risques A et B de grande ampleur",
        ],
        ranges: [
            {
                range: "INgénio E6-E9 AB",
                agent: "Eau + additif",
                classes: "A et B",
                capacites: ["6 L", "9 L"],
                controle: CONTROLE_EAU_ADDITIF,
            },
            {
                range: "INgénio",
                agent: "Poudre ABC",
                classes: "A, B et C",
                capacites: ["1 kg", "2 kg", "6 kg", "9 kg"],
                controle: CONTROLE_POUDRE,
            },
            {
                range: "INgénio",
                agent: "CO2",
                classes: "B et feux d'origine électrique",
                capacites: ["2 kg", "5 kg"],
                controle: CONTROLE_CO2,
            },
            {
                range: "INtégral",
                agent: "Eau + additif sans fluor",
                classes: "A et B",
                capacites: ["6 L", "9 L"],
                controle: CONTROLE_EAU_SANS_FLUOR,
            },
            {
                range: "INstant E50 AB N2",
                agent: "Eau + additif sur roues, pression auxiliaire",
                classes: "A et B",
                capacites: ["50 L"],
                controle: CONTROLE_ROUES,
            },
        ],
    },
    {
        name: "Eurofeu",
        slug: "eurofeu",
        groupe: "Groupe Eurofeu",
        perimetre:
            "Extincteurs, désenfumage et portes coupe-feu, détection incendie, éclairage de sécurité, extinction automatique, formation et distribution.",
        reseau:
            "2 500 collaborateurs et 70 agences en Europe, dont 50 en France ; siège au 12 rue Albert Rémy, 28250 Senonches.",
        verifieConstructeur: true,
        source: "https://eurofeu.com/",
        type: "Extincteurs & sécurité incendie globale",
        faits: [
            "Le groupe réunit sept entités publiées : AMI2S, Eurofeu Sécurité, Eurofeu Distribution, Eurofeu Solutions, MDP Group, PIGHI et Chevalier-Bertrand",
            "Plus de 50 ans d'activité dans la sécurité incendie",
            "Couverture extincteurs, mais aussi désenfumage, détection, éclairage de sécurité et extinction automatique : une intervention peut porter sur l'ensemble du parc d'un site",
        ],
        ranges: [
            {
                agent: "Eau + additif",
                classes: "A et B",
                capacites: ["6 L", "9 L"],
                controle: CONTROLE_EAU_ADDITIF,
            },
            {
                agent: "Poudre ABC",
                classes: "A, B et C",
                capacites: ["1 kg", "2 kg", "6 kg", "9 kg"],
                controle: CONTROLE_POUDRE,
            },
            {
                agent: "CO2",
                classes: "B et feux d'origine électrique",
                capacites: ["2 kg", "5 kg"],
                controle: CONTROLE_CO2,
            },
            {
                agent: "Eau pulvérisée sans additif",
                classes: "A",
                capacites: ["6 L", "9 L"],
                controle: CONTROLE_EAU_SANS_ADDITIF,
            },
        ],
    },
    // La marque « Andrieu » a été retirée : andrieu.fr ne résout pas,
    // andrieu-securite.fr non plus, et aucune gamme n'a pu être confirmée
    // auprès d'un constructeur. Ses 161 pages ville x marque n'apportaient
    // donc qu'un nom non vérifiable, et sont redirigées en 301 vers la page
    // ville (voir next.config.ts).
];

/** Libellé lisible d'une gamme : nom constructeur si publié, sinon l'agent. */
export function rangeLabel(r: BrandRange): string {
    return r.range ? `${r.range} — ${r.agent}` : r.agent;
}

/**
 * Angle rédactionnel propre à chaque marque, contextualisé sur la commune.
 *
 * Sans ce bloc, les quatre pages d'une même commune partageaient mot pour mot
 * le même paragraphe de contexte local : la marque ne changeait que le titre.
 * Ici chaque marque apporte un raisonnement qui lui est propre — périmètre du
 * constructeur, conséquence réelle du choix d'agent extincteur, contrainte de
 * réapprovisionnement — et ce raisonnement est rapporté au territoire de la
 * commune. Les quatre textes sont distincts, et aucun n'est un gabarit à trous
 * réutilisé d'une marque à l'autre.
 */
export function brandEditorial(brand: Brand, ctx: { city: string; deptName?: string }): string[] {
    const { city } = ctx;
    const familles = brand.ranges.length;

    switch (brand.slug) {
        case "desautel":
            return [
                `Desautel intervient sur la fourniture de matériel et de systèmes de protection incendie, mais aussi sur la maintenance et la formation, auprès des entreprises, dans toute la France. Pour un établissement de ${city}, la conséquence est concrète : le même constructeur fournit l'appareil et l'entretient. Cela simplifie l'approvisionnement des pièces d'usure — flexible, goupille, joint de tête, cartouche de gaz propulseur — et évite qu'un extincteur reste hors service plusieurs semaines faute de pièce disponible.`,
                `La formation relève du même périmètre. Au-delà de la vérification annuelle, la question qui revient à chaque visite est celle de la mise en main des occupants : qui décroche quel appareil, sur quel type de feu, et dans quel ordre. Sur un établissement de ${city}, c'est généralement le point faible du dossier le jour du passage de la commission de sécurité, parce qu'aucun extincteur neuf ne compense un personnel qui ne sait pas lequel utiliser.`,
            ];

        case "sicli":
            return [
                `Sicli est aujourd'hui exploitée par Chubb Fire & Security France, qui publie le catalogue SICLI. Le repère utile pour un exploitant de ${city} : la gamme INgénio couvre eau & additifs, poudre et CO2, la gamme INtégral porte l'eau + additif sans composés fluorés, et INstant E50 AB N2 traite les risques A et B de grande ampleur en pression auxiliaire. Un même parc peut donc mélanger des appareils dont la procédure de contrôle n'a rien à voir.`,
                `Le sujet des additifs sans composés fluorés n'est pas cosmétique. Les travaux réglementaires européens sur les substances per- et polyfluoroalkylées (PFAS) rendent cette information utile à tout exploitant de ${city} qui engage une remise en état ou un renouvellement de parc : savoir si l'additif de ses appareils contient encore des composés fluorés conditionne le choix entre recharge et remplacement.`,
            ];

        case "eurofeu":
            return [
                `Eurofeu ne se limite pas aux extincteurs : le groupe couvre aussi le désenfumage et les portes coupe-feu, la détection incendie, l'éclairage de sécurité et l'extinction automatique, à travers sept entités publiées — AMI2S, Eurofeu Sécurité, Eurofeu Distribution, Eurofeu Solutions, MDP Group, PIGHI et Chevalier-Bertrand. Pour un site de ${city} qui doit faire vérifier plusieurs de ces installations, cela permet de regrouper les passages sur une même visite au lieu de multiplier les prestataires.`,
                `Le réseau annoncé — 2 500 collaborateurs et 70 agences en Europe, dont 50 en France, avec un siège à Senonches — conditionne le délai de remise en état d'un appareil recalé à ${city}. Plus la gamme est large et standardisée, plus l'immobilisation de l'appareil est courte, puisque la pièce se trouve en stock plutôt qu'en commande spéciale. C'est le critère qui distingue concrètement un grand réseau d'un revendeur local sur ce type de prestation.`,
            ];

        default:
            // Cas des marques dont le constructeur ne publie pas de catalogue
            // accessible. On ne remplit pas le vide avec des caractéristiques
            // inventées : on explique ce qui détermine réellement le contrôle.
            return [
                `Cette page traite d'un parc d'extincteurs de marque ${brand.name} déjà installé à ${city}. Nous n'affichons pas de caractéristiques de gamme pour cette marque : le constructeur ne publie pas d'informations techniques accessibles, et nous n'écrivons pas de spécifications non vérifiées pour remplir une page.`,
                `Ce qui compte dans ce cas, c'est l'appareil devant vous, pas le nom inscrit sur le corps. C'est l'agent extincteur qui détermine le geste de vérification, et sur un parc de ${city} il y en a le plus souvent trois familles : l'eau + additif sur les risques courants, la poudre pour les feux de gaz et de liquides, le CO2 pour le matériel électrique sous tension. Chacune se contrôle selon une procédure qui n'est pas interchangeable.`,
            ];
    }
}

/** Phrase de contexte local, conditionnée par la marque. */
export function brandLocalContext(
    brand: Brand,
    ctx: {
        city: string;
        postalCode?: string;
        population?: number;
        insee?: string;
        epci?: string;
        deptName?: string;
        department?: string;
        regionName?: string;
    },
): string {
    const { city } = ctx;
    const familles = brand.ranges.length;
    return [
        `Pour ${brand.name}, un établissement de ${city}`,
        ctx.population ? `(${ctx.population.toLocaleString("fr-FR")} habitants${ctx.insee ? `, code INSEE ${ctx.insee}` : ""})` : "",
        `se vérifie sur ${familles} ${familles > 1 ? "familles d'appareils" : "famille d'appareil"}`,
        ctx.epci ? `dans le périmètre de ${ctx.epci}` : "",
        ctx.deptName ? `, département ${ctx.deptName} (${ctx.department})` : "",
        ctx.regionName ? `, en ${ctx.regionName}` : "",
        ".",
    ]
        .filter(Boolean)
        .join(" ")
        .replace(" .", ".");
}

/** Liste courte des agents couverts par une marque. */
export function agentsOf(brand: Brand): string[] {
    return brand.ranges.map((r) => r.agent);
}

/**
 * Forme d'un agent en milieu de phrase : on ne met en minuscule que le premier
 * mot, pour ne pas écrire « à poudre abc » ni « à co2 ».
 */
export function agentMid(agent: string): string {
    const [first, ...rest] = agent.split(" ");
    const isAcronym = first === first.toUpperCase() && /[A-Z0-9]/.test(first);
    const head = isAcronym ? first : first.charAt(0).toLowerCase() + first.slice(1);
    return [head, ...rest].join(" ");
}

/** Énumération d'agents prête à insérer dans une phrase. */
export function agentsMid(brand: Brand): string {
    return brand.ranges.map((r) => agentMid(r.agent)).join(", ");
}
