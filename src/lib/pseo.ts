import type { CityConfig } from "@/lib/db";

// Structure d'une page pSEO générée
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
}

// ============================================
// Données régionales réelles pour enrichir le contenu
// ============================================
const REGIONAL_DATA: Record<string, { subsidyName: string; subsidyAmount: string; gridOperator: string; avgPrice: string; }> = {
    "75": { subsidyName: "Paris Éco-Rénovation", subsidyAmount: "Jusqu'à 4 000€ (Ville de Paris + NF)", gridOperator: "Enedis Île-de-France", avgPrice: "1 200€ – 2 500€" },
    "69": { subsidyName: "Métropole de Lyon Éco-Énergie", subsidyAmount: "Certification NF + Bonus Métropole Lyon", gridOperator: "Enedis Rhône", avgPrice: "890€ – 1 800€" },
    "13": { subsidyName: "Région Sud Mobilité Verte", subsidyAmount: "Certification NF + Aide Région Sud", gridOperator: "Enedis Provence", avgPrice: "850€ – 1 700€" },
    "06": { subsidyName: "Métropole Nice Côte d'Azur", subsidyAmount: "Certification NF + Aide MNCA", gridOperator: "Enedis Alpes-Maritimes", avgPrice: "950€ – 2 200€" },
    "33": { subsidyName: "Bordeaux Métropole Climat", subsidyAmount: "Certification NF applicable", gridOperator: "Enedis Gironde", avgPrice: "890€ – 1 800€" },
    "31": { subsidyName: "Toulouse Métropole Transition", subsidyAmount: "Certification NF applicable", gridOperator: "Enedis Haute-Garonne", avgPrice: "850€ – 1 700€" },
    "59": { subsidyName: "MEL sécurité incendie", subsidyAmount: "Certification NF + Aide MEL", gridOperator: "Enedis Nord", avgPrice: "890€ – 1 800€" },
    "67": { subsidyName: "Eurométropole de Strasbourg", subsidyAmount: "Certification NF applicable", gridOperator: "Électricité de Strasbourg", avgPrice: "890€ – 1 800€" },
    "44": { subsidyName: "Nantes Métropole Climat", subsidyAmount: "Certification NF applicable", gridOperator: "Enedis Loire-Atlantique", avgPrice: "850€ – 1 600€" },
    "34": { subsidyName: "Montpellier Méditerranée Métropole", subsidyAmount: "Certification NF applicable", gridOperator: "Enedis Hérault", avgPrice: "850€ – 1 700€" },
};

const DEFAULT_REGIONAL = {
    subsidyName: "Programme national Aide",
    subsidyAmount: "Audit gratuit & conformité NF EN3",
    gridOperator: "Enedis",
    avgPrice: "890€ – 1 800€"
};

// Varier les structures d'expert tips par ville
function getExpertTip(city: string, dept: string, neighborhoods: string[], priceStart?: number): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const isFrance = city.toLowerCase() === "france";
    const prep = isFrance ? "en" : "à";
    const prepCapital = isFrance ? "En" : "À";

    const tips = [
        `${prepCapital} ${city}, ${priceStart && priceStart >= 1000 ? "les villas et maisons individuelles sont majoritaires" : "les copropriétés représentent 60% des demandes"}. Nous recommandons une extincteur ${priceStart && priceStart >= 1000 ? "CO2 ou Poudre" : "eau pulvérisée 6L"} pour un rapport qualité/prix optimal.`,
        `Les résidents de ${neighborhoods[0] || (isFrance ? "toutes les régions" : city)} privilégient les extincteurs avec contrat de maintenance annuelle.${isFrance ? "" : ` En ${dept}, le`} délai moyen d'intervention est de 5 jours ouvrés après validation du devis.`,
        `${isFrance ? "Notre réseau national" : city} fait partie des zones à forte adoption de ERP et entreprises. Nos techniciens certifiés interviennent sous 48h pour la visite technique${neighborhoods.length > 1 ? `, de ${neighborhoods[0]} à ${neighborhoods[1]}` : ""}.`,
        `Pour une maintenance ${prep} ${city}, vérifiez que votre extincteur est à jour de sa vérification annuelle obligatoire (arrêté du 20 mai 1963) et que le registre de sécurité est accessible.`,
    ];
    return tips[hash % tips.length];
}

// Varier les intros par ville avec de vrais éléments locaux
function getIntroHtml(city: string, dept: string, neighborhoods: string[], postalCode: string, avgPrice: string): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const isFrance = city.toLowerCase() === "france";
    const prep = isFrance ? "en" : "à";

    const neighborhoodMention = neighborhoods.length >= 2
        ? `Nous intervenons dans tous les quartiers : <strong>${neighborhoods.slice(0, 3).join(', ')}</strong> et alentours.`
        : "";

    const postalCodeMention = postalCode ? ` (${postalCode})` : "";

    const intros = [
        `<p class="mb-4">
            Vous recherchez un <strong>technicien de matériel incendie certifié Incendie</strong> ${prep} <strong>${city}${postalCodeMention}</strong> ?
            Nos techniciens certifiés APSAD réalisent la maintenance complète de votre extincteur à domicile, en copropriété ou en entreprise.
            ${neighborhoodMention}
        </p>
        <p>
            Le prix moyen d'une maintenance ${prep} ${city} se situe entre <strong>${avgPrice}</strong> (fourniture et pose incluses, avant déduction des aides).
            Nous constituons gratuitement votre dossier de subventions pour maximiser vos économies.
        </p>`,

        `<p class="mb-4">
            <strong>${city}</strong>${dept ? ` (${dept})` : ''} : trouvez votre technicien Incendie de confiance pour la pose de votre matériel incendie.
            De la vérification périodique à la révision complète, nos techniciens agréés gèrent l'intégralité du projet en respectant la norme <strong>NF S 61-919</strong>.
        </p>
        <p>
            ${neighborhoodMention} Budget indicatif : <strong>${avgPrice}</strong> tout compris avant aides.
            Nous nous occupons de votre dossier de conformité et du registre de sécurité.
        </p>`,

        `<p class="mb-4">
            La maintenance d'un extincteur ${prep} <strong>${city}</strong> par un professionnel <strong>certifié APSAD</strong> est obligatoire chaque année (arrêté du 20 mai 1963).
            C'est aussi la condition pour rester en conformité avec le Code du travail et la réglementation ERP.
        </p>
        <p>
            Nos techniciens ${prep} ${city} proposent des solutions adaptées à chaque situation : maison individuelle (extincteur portatif), parking de copropriété (extincteurs sur roues), ou flotte d'entreprise (vérification périodique).
            ${neighborhoodMention} Tarifs constatés : <strong>${avgPrice}</strong>.
        </p>`,
    ];

    return intros[hash % intros.length];
}

// ============================================
// Génération du contenu pSEO — données réelles
// ============================================
export async function getPseoContent(cityConfig: CityConfig, targetType: string = 'MIXED'): Promise<PseoPageContent> {
    const { city, department, region, postalCode, neighborhoods, pricing } = cityConfig;
    const dept = department || "";
    const postal = postalCode || "";
    const quartiers = neighborhoods || [];

    // Récupérer les données régionales réelles
    const deptCode = dept.length >= 2 ? dept.substring(0, 2) : "";
    const regionalInfo = REGIONAL_DATA[deptCode] || DEFAULT_REGIONAL;

    // Prix réel depuis la config de la ville
    const realPrice = pricing?.base || `À partir de ${regionalInfo.avgPrice.split('–')[0].trim()}`;

    const isFrance = city.toLowerCase() === "france";
    const prep = isFrance ? "en" : "à";

    // Meta title optimisé pour le CTR
    const meta_title = `technicien matériel incendie ${isFrance ? "en France" : city}${postal ? ` (${postal})` : ''} | Devis Gratuit Incendie`;
    const meta_description = `maintenance matériel incendie ${prep} ${city} par un électricien certifié Incendie. ${realPrice} avant aides. ${regionalInfo.subsidyAmount}. Devis gratuit en 2 min.`;

    const hero_title = `technicien <span class="text-red-500">matériel incendie</span> ${prep} ${city}${postal ? ` <span class="text-slate-400 text-3xl">(${postal})</span>` : ''}`;
    const hero_badge = regionalInfo.subsidyName;

    const intro_html = getIntroHtml(city, dept, quartiers, postal, regionalInfo.avgPrice);

    return {
        meta_title,
        meta_description,
        hero_title,
        hero_badge,
        intro_html,
        cta_primary: "Obtenir 3 devis gratuits",
        pricing_estimated: realPrice,
        regional_subsidy: regionalInfo.subsidyAmount,
        expert_tip: getExpertTip(city, dept, quartiers, parseInt(realPrice.replace(/\D/g, '')) || undefined),
    };
}
