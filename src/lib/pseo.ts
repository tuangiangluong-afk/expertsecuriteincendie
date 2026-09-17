import type { CityConfig } from "@/lib/db";
import { departementFromPostal, type Departement } from "@/data/fr-departements";
import { composeLocalIntro } from "@/lib/pseo-local";

export interface PseoPageContent {
    meta_title: string;
    meta_description: string;
    hero_title: string;
    hero_badge: string;
    intro_html: string;
    cta_primary: string;
    pricing_estimated: string;
    regional_subsidy: string;
    expert_tip: string;
    local_climate_info?: string;
    installation_timeline?: string;
    local_compliance_info?: string;
    /** Faits locaux vérifiables, affichés en bloc sur la page ville */
    local_facts?: { label: string; value: string }[];
    /** Contexte technique local (littoral / montagne / métropole) */
    local_risk_factor?: string;
}

// ========================================
// TARIFS PUBLIÉS DU SITE (grille unique, utilisée telle quelle)
// ========================================
const PRICE_RANGE = "150€ – 1 800€";
const PRICE_MAINTENANCE = "15€ – 28€ / appareil";

// ========================================
// CONTEXTE LOCAL RÉEL
// ========================================
interface LocalContext {
    city: string;
    postal: string;
    /** Communes limitrophes réelles (données IGN/Etalab), utilisées comme zones d'intervention */
    quartiers: string[];
    zones: { nom: string; km: number }[];
    insee?: string;
    epci?: string;
    population?: number;
    dept?: Departement;
    deptCode: string;
    deptName: string;
    region: string;
    prefecture: string;
    sdis: string;
    zone: string;
    littoral: boolean;
    montagne: boolean;
    /** Départements à forte densité d'ERP (Île-de-France + grandes métropoles) */
    dense: boolean;
}

const DENSE = new Set(["75", "92", "93", "94", "78", "91", "95", "77", "69", "13", "31", "33", "59", "44", "67", "06", "34", "38", "76", "06"]);

function buildContext(cityConfig: CityConfig): LocalContext {
    const postal = cityConfig.postalCode || "";
    const dept = departementFromPostal(postal);
    return {
        city: cityConfig.city,
        postal,
        quartiers: cityConfig.neighborhoods || [],
        zones: cityConfig.zones || [],
        insee: cityConfig.insee,
        epci: cityConfig.epci,
        population: cityConfig.population,
        dept,
        deptCode: dept?.code || cityConfig.department || "",
        deptName: dept?.name || cityConfig.deptName || cityConfig.region || "France",
        region: cityConfig.regionName || dept?.region || "France",
        prefecture: dept?.prefecture || "",
        sdis: dept?.sdis || "le SDIS local",
        zone: dept?.zone || "zone de défense et de sécurité",
        littoral: !!dept?.littoral,
        montagne: !!dept?.montagne,
        dense: DENSE.has(dept?.code || ""),
    };
}

/** Hash déterministe : deux villes voisines ne doivent pas tomber sur le même texte. */
function hash(...parts: (string | number)[]): number {
    const s = parts.join("|");
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return Math.abs(h);
}

const pick = <T,>(arr: T[], h: number): T => arr[h % arr.length];

// ========================================
// PARAGRAPHES D'OUVERTURE (ancrés sur la région / la préfecture / le SDIS)
// ========================================
const OPENERS: ((c: LocalContext) => string)[] = [
    (c) => `<p class="mb-4 leading-relaxed">Vous exploitez un commerce, des bureaux, un atelier ou vous gérez une copropriété à <strong>${c.city}${c.postal ? ` (${c.postal})` : ""}</strong> ? Le département ${c.deptCode ? `${c.deptCode} — ${c.deptName}` : c.deptName} relève de la <strong>${c.region}</strong>, et les contrôles y sont pilotés par ${c.sdis} sous l'autorité du préfet${c.prefecture ? ` (préfecture : ${c.prefecture})` : ""}.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">À <strong>${c.city}</strong>, la mise en conformité incendie ne s'improvise pas : application du Code du travail pour les salariés, du règlement ERP pour les locaux recevant du public, et visite de la commission de sécurité. Votre interlocuteur technique local est ${c.sdis}${c.prefecture ? `, placé sous l'autorité du préfet de ${c.prefecture}` : ""}.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">Recherchez-vous un <strong>prestataire de sécurité incendie à ${c.city}${c.postal ? ` (${c.postal})` : ""}</strong> ? Les 165 communes que nous couvrons en <strong>${c.region}</strong> suivent le même cadre réglementaire, mais chaque dossier dépend concrètement de ${c.sdis} et de la commission de sécurité compétente.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">À <strong>${c.city}</strong>, en <strong>${c.region}</strong>, l'audit de vos locaux et la remise en conformité de votre parc de matériel se préparent en amont de la visite de la commission de sécurité. Nos techniciens connaissent le référentiel appliqué par ${c.sdis} sur le département ${c.deptCode ? `${c.deptCode} (${c.deptName})` : c.deptName}.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">Entreprises, commerces et copropriétés de <strong>${c.city}</strong> : votre obligation de protection contre l'incendie s'articule avec le dispositif départemental de secours. Pour le ${c.deptCode} (${c.deptName}), le service d'incendie et de secours compétent est ${c.sdis}.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">Vous préparez l'ouverture d'un local ou la vérification périodique de vos équipements à <strong>${c.city}</strong> ? Nous intervenons sur l'ensemble du département ${c.deptCode} (${c.deptName}), en <strong>${c.region}</strong>, avec des techniciens qui maîtrisent les exigences locales portées par ${c.sdis}.</p>`,
];

// ========================================
// PARAGRAPHES MÉTIER (communes limitrophes réelles + prestations)
// ========================================
const MIDDLES: ((c: LocalContext) => string)[] = [
    (c) => `<p class="mb-4 leading-relaxed">${c.quartiers.length >= 2 ? `Nos équipes interviennent à <strong>${c.city}</strong> et dans les communes limitrophes de <strong>${c.quartiers.slice(0, 3).join(", ")}</strong>.` : "Nos équipes couvrent l'ensemble de la commune et des communes limitrophes."} Nous assurons l'audit, la fourniture et la pose d'extincteurs certifiés NF EN 3, de blocs autonomes d'éclairage de sécurité (BAES), d'alarmes et de plans d'évacuation normés.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">${c.quartiers.length >= 2 ? `Tournées régulières vers <strong>${c.quartiers.slice(0, 3).join(", ")}</strong> depuis ${c.city}.` : "Tournées régulières sur toute la commune."} Au programme : contrôle et recharge des appareils, vérification des BAES, mise à jour du registre de sécurité et signalétique photoluminescente conforme.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">${c.quartiers.length >= 2 ? `Basés à ${c.city}, nous desservons <strong>${c.quartiers.slice(0, 3).join(", ")}</strong>` : `Sur toute la commune de ${c.city},`} et nous adaptons les agents extincteurs à vos risques réels : eau pulvérisée 6 L pour les surfaces de bureaux et commerces, CO2 pour les armoires électriques et salles serveurs, poudre ABC pour les ateliers et zones de stockage.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">Engagés sur le département ${c.deptCode} : ${c.quartiers.length >= 2 ? `nous suivons en priorité les zones d'activité de <strong>${c.city}</strong> et des communes voisines (${c.quartiers.slice(0, 3).join(", ")}).` : "nous suivons les zones d'activité de la commune."} Contrats annuels, attestations pour votre assureur et registre de sécurité tenu à jour à chaque passage.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">${c.quartiers.length >= 2 ? `Déjà intervenus à <strong>${c.quartiers.slice(0, 3).join(", ")}</strong>` : "Déjà intervenus sur la commune"} et à ${c.city}. Diagnostic gratuit, chiffrage détaillé par équipement et pose aux emplacements stratégiques avec remise du procès-verbal de vérification.</p>`,
    (c) => `<p class="mb-4 leading-relaxed">${c.quartiers.length >= 2 ? `Secteur couvert : <strong>${c.city}</strong> et <strong>${c.quartiers.slice(0, 3).join(", ")}</strong>` : "Couverture communale complète"}, avec un technicien qui connaît le terrain. Contrats de maintenance avec vérification mécanique du percuteur, contrôle de la charge manométrique et réfection annuelle de la vignette.</p>`,
];

// ========================================
// PARAGRAPHE DE CONTRAINTE LOCALE (littoral / montagne / densité)
// ========================================
function riskParagraph(c: LocalContext): string {
    if (c.littoral) {
        return `<p class="leading-relaxed">Contrainte locale : sur ${c.city} et les communes littorales du ${c.deptCode}, <strong>l'air salin accélère la corrosion</strong> des corps de bouteilles, des percuteurs et des supports muraux. Nous intégrons systématiquement un contrôle renforcé de l'état de surface et des fixations, ainsi que des supports traités anticorrosion.</p>`;
    }
    if (c.montagne) {
        return `<p class="leading-relaxed">Contrainte locale : en zone de montagne (${c.deptName}), les <strong>cycles gel/dégel et l'humidité hivernale</strong> éprouvent les batteries des BAES et durcissent les joints d'étanchéité des appareils installés en locaux non chauffés. Nous vérifions l'autonomie réelle des blocs et remplaçons le cas échéant les accumulateurs.</p>`;
    }
    if (c.dense) {
        return `<p class="leading-relaxed">Contrainte locale : le département ${c.deptCode} (${c.deptName}) figurait déjà parmi les plus denses en établissements recevant du public, ce qui allonge les délais d'accès à la visite de la commission de sécurité. <strong>Anticiper le contrôle</strong> évite une mise en demeure et un délai administratif supplémentaire.</p>`;
    }
    return `<p class="leading-relaxed">Contrainte locale : sur le département ${c.deptCode} (${c.deptName}), les locaux professionnels anciens disposent souvent de sous-sols et de locaux techniques <strong>non desservis par le réseau d'incendie</strong>, ce qui renforce l'exigence de moyens de première intervention à disposition immédiate.</p>`;
}

// ========================================
// CONSEILS D'EXPERT (ancrés localement, jamais inventés)
// ========================================
const TIPS: ((c: LocalContext) => string)[] = [
    (c) => `À ${c.city}, le Code du travail impose au minimum 1 extincteur à eau pulvérisée de 6 litres pour 200 m² de plancher, avec au moins un appareil par niveau.`,
    (c) => `Pour les locaux techniques et salles serveurs de ${c.city}, l'extincteur au dioxyde de carbone (CO2) est à privilégier : il étouffe le feu électrique sans laisser de résidu.`,
    (c) => `Les ERP de ${c.city} relèvent de la commission de sécurité compétente sur le département ${c.deptCode} ; leur vérification périodique des extincteurs et des BAES doit être tracée dans le registre de sécurité.`,
    (c) => `Les blocs autonomes d'éclairage de sécurité de ${c.city} doivent garantir une autonomie d'une heure en cas de coupure générale du réseau.`,
    (c) => `${c.quartiers.length ? `À ${c.quartiers[0]}, commune limitrophe de ${c.city}, ` : `À ${c.city}, `}le registre de sécurité doit être présenté à jour lors de tout contrôle : il conditionne la couverture par votre assurance.`,
    (c) => `À ${c.city}, ${c.sdis} est l'autorité opérationnelle de référence : ses officiers sont associés aux visites de conformité des ERP de ${c.deptName}.`,
    (c) => `${c.littoral ? `Sur le littoral du ${c.deptCode}, l'air salin impose un contrôle visuel renforcé des corps de bouteilles à ${c.city} : corrosion, peinture, goupille et percuteur.` : c.montagne ? `En zone de montagne (${c.deptName}), les BAES de ${c.city} subissent des variations de température importantes : leur autonomie doit être testée à chaque passage.` : `À ${c.city}, la vérification mécanique du percuteur et de la charge manométrique doit être refaite à chaque visite annuelle.`}`,
    (c) => `La formation à la manipulation des extincteurs pour le personnel est obligatoire ; nos techniciens l'assurent directement dans vos locaux à ${c.city}.`,
    (c) => `Chaque appareil vérifié à ${c.city} reçoit un plombage horodaté et une étiquette de conformité reconnue par votre compagnie d'assurance.`,
    (c) => `À ${c.city}, les plans d'évacuation et d'intervention doivent être conformes à la norme NF X 08-070 et affichés à chaque niveau exploité.`,
    (c) => `Sur le département ${c.deptCode} (${c.deptName}), les règles APSAD R1 et R4 restent la référence des assureurs pour la conception des moyens de secours à ${c.city}.`,
    (c) => `${c.dense ? `Le ${c.deptCode} (${c.deptName}) concentre un nombre élevé d'ERP : à ${c.city}, déposer un dossier complet avant la visite de la commission de sécurité raccourcit sensiblement le délai.` : `À ${c.city}, anticiper la visite annuelle sur le département ${c.deptCode} évite toute mise en demeure et sécurise votre activité.`}`,
];

// ========================================
// GÉNÉRATEUR
// ========================================
export async function getPseoContent(cityConfig: CityConfig, _targetType: string = "MIXED"): Promise<PseoPageContent> {
    const c = buildContext(cityConfig);
    const h = hash(c.city, c.postal, c.deptCode);

    const realPrice = cityConfig.pricing?.base || PRICE_RANGE;
    const isFrance = c.city.toLowerCase() === "france";
    const prep = isFrance ? "en" : "à";
    const postalSpan = c.postal ? ` <span class="text-slate-400 text-3xl">(${c.postal})</span>` : "";

    // --- Meta : variées et ancrées localement ---
    const metaTitleVariants = [
        `Sécurité Incendie ${c.city} (${c.postal}) | Extincteurs & ERP`,
        `Extincteurs & BAES ${c.city} | Conformité ERP ${c.deptName}`,
        `Expert Incendie ${c.city} | Registre & Commission de Sécurité`,
        `Mise en Conformité Incendie ${c.city} (${c.deptCode}) | Devis 24h`,
        `Maintenance Extincteurs ${c.city} | ERP & Code du Travail`,
    ];
    const meta_title = isFrance
        ? "Expert Sécurité Incendie en France | Extincteurs & ERP"
        : pick(metaTitleVariants, h);

    const metaDescVariants = [
        `Installation et maintenance d'extincteurs, BAES et désenfumage à ${c.city} (${c.deptCode}). Conformité ERP/ERT et règles APSAD, devis gratuit sous 24h.`,
        `Extincteurs, blocs de secours et plans d'évacuation à ${c.city}, en ${c.region}. Registre de sécurité tenu à jour, attestation pour votre assurance.`,
        `Mise aux normes incendie à ${c.city} : audit gratuit de vos locaux, vérification annuelle des appareils et accompagnement avant la commission de sécurité.`,
        `Prestataire sécurité incendie à ${c.city} (${c.deptName}) : extincteurs NF EN 3, BAES, alarmes et registre de sécurité. Devis gratuit sous 24h.`,
        `Conformité incendie de votre commerce, atelier ou copropriété à ${c.city}. Techniciens qualifiés, interventions sous 48h, devis immédiat.`,
    ];
    const meta_description = pick(metaDescVariants, h >> 3);

    const hero_title = `Expert <span class="text-red-500">Sécurité Incendie</span> ${prep} ${c.city}${postalSpan}`;

    // --- Intro : 6 emplacements factuels assemblés (voir pseo-local.ts) ---
    const intro_html =
        composeLocalIntro(
            {
                city: c.city,
                postal: c.postal,
                deptCode: c.deptCode,
                deptName: c.deptName,
                region: c.region,
                prefecture: c.prefecture,
                authority: c.sdis,
                zones: c.quartiers,
                littoral: c.littoral,
                montagne: c.montagne,
                dense: c.dense,
            },
            {
                audience: "Les entreprises, commerces et copropriétés",
                service: "l'audit, la fourniture et la pose d'extincteurs et de blocs d'éclairage de sécurité",
                norms: "la norme NF EN 3 et les règles APSAD",
                document: "le registre de sécurité",
                authorityLabel: "le service d'incendie et de secours compétent",
                project: "votre mise en conformité",
            },
            {
                openers: OPENERS.map((fn) => () => fn(c)),
                middles: MIDDLES.map((fn) => () => fn(c)),
            },
            hash(c.city, c.postal, c.deptCode),
        ) +
        riskParagraph(c);

    const expert_tip = pick(TIPS, h >> 7)(c);

    // --- Faits locaux vérifiables (bloc affiché sur la page) ---
    const local_facts: { label: string; value: string }[] = [];
    if (c.deptCode) local_facts.push({ label: "Département", value: `${c.deptCode} — ${c.deptName}` });
    if (c.region !== "France") local_facts.push({ label: "Région", value: c.region });
    if (c.prefecture) local_facts.push({ label: "Préfecture", value: c.prefecture });
    local_facts.push({ label: "Service de secours compétent", value: c.sdis });
    if (c.postal) local_facts.push({ label: "Code postal", value: c.postal });
    // Identité administrative réelle de la commune (source IGN / Etalab) :
    // c'est ce qui distingue Saint-Cloud de Chambéry, plutôt qu'un texte réécrit.
    if (c.insee) local_facts.push({ label: "Code INSEE", value: c.insee });
    if (c.epci) local_facts.push({ label: "Intercommunalité", value: c.epci });
    if (c.population) local_facts.push({ label: "Population", value: `${c.population.toLocaleString("fr-FR")} habitants` });
    local_facts.push({ label: "Tarif de maintenance", value: PRICE_MAINTENANCE });
    if (c.littoral) local_facts.push({ label: "Contrainte", value: "Ambiance saline — corrosion renforcée" });
    if (c.montagne) local_facts.push({ label: "Contrainte", value: "Zone de montagne — gel et humidité" });

    const local_risk_factor = c.littoral
        ? "Corrosion saline (bord de mer)"
        : c.montagne
            ? "Cycles gel/dégel et humidité"
            : c.dense
                ? "Forte densité d'ERP"
                : "Locaux techniques isolés";

    const timelineVariants = [
        "Intervention sous 24h à 48h",
        "Visite technique gratuite sous 48h",
        "Devis sous 24h, pose planifiée sous 5 jours",
    ];

    return {
        meta_title,
        meta_description,
        hero_title,
        hero_badge: c.dense
            ? "Conformité ERP & Code du travail"
            : "Conformité ERP/ERT & APSAD",
        intro_html,
        cta_primary: pick(
            [
                "Demander un audit sécurité gratuit",
                "Obtenir mon devis sous 24h",
                "Faire vérifier mes extincteurs",
            ],
            h >> 11
        ),
        pricing_estimated: realPrice,
        regional_subsidy: `Attestation de conformité pour votre assureur — cadre ${c.region !== "France" ? c.region : "national"}`,
        expert_tip,
        local_climate_info: expert_tip,
        installation_timeline: pick(timelineVariants, h >> 13),
        local_compliance_info: `Contrôles assurés par ${c.sdis} — département ${c.deptCode || "—"}`,
        local_facts,
        local_risk_factor,
    };
}
