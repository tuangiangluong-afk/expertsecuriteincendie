import type { CityConfig } from "@/lib/db";

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
}

const DEFAULT_REGIONAL = {
    subsidyName: "Conformité Légale & Assurance",
    subsidyAmount: "Attestation de conformité pour assurances (APSAD)",
    avgPrice: "150€ – 1 800€"
};

const TIPS = [
        "À {city}, le Code du travail et les arrêtés ERP imposent 1 extincteur à eau pulvérisée de 6L pour 200 m² de surface au sol par niveau.",
        "Pour les tableaux électriques et locaux serveurs à {city}, l'extincteur au dioxyde de carbone (CO2) est obligatoire pour étouffer le feu sans dégât résiduel.",
        "Les commerces et établissements recevant du public à {city} doivent procéder à la vérification annuelle obligatoire de leurs extincteurs par un technicien certifié.",
        "Les Blocs Autonomes d'Éclairage de Sécurité (BAES) doivent assurer 1 heure d'autonomie lumineuse en cas de coupure de courant générale à {city}.",
        "Les entreprises de {neighborhood_0} doivent maintenir à jour leur Registre de Sécurité sous peine de sanctions lors du passage de la commission de sécurité.",
        "L'installation d'un système de désenfumage naturel permet d'évacuer les fumées toxiques et facilite l'évacuation rapide des personnes à {city}.",
        "Nos techniciens réalisent la formation obligatoire à la manipulation des extincteurs pour le personnel de votre entreprise à {city}.",
        "Chaque appareil vérifié par nos équipes reçoit un plombage horodaté et une étiquette de conformité officielle reconnue par votre compagnie d'assurance."
];
const INTROS = [
        "<p class=\"mb-4 leading-relaxed\">Vous exploitez un commerce, des bureaux, un atelier ou gérez une copropriété à <strong>{city}{postalMention}</strong> ? La <strong>protection contre les risques d'incendie</strong> relève d'une obligation légale stricte régie par le Code du travail et la réglementation des ERP (Établissements Recevant du Public). {neighborhoodMention}</p><p class=\"mb-4 leading-relaxed\">Nos techniciens certifiés en sécurité incendie assurent l'audit gratuit de vos locaux, la fourniture et la pose d'extincteurs certifiés NF EN 3, de blocs d'éclairage de secours (BAES), d'alarmes sonores et de plans d'évacuation normés. Tarif moyen pour une mise en conformité à {city} : <strong>{avgPrice}</strong> selon la surface exploitée.</p><p class=\"leading-relaxed\">Garantissez la sécurité de vos collaborateurs et de vos clients tout en protégeant votre responsabilité juridique vis-à-vis des assurances. Contactez nos experts locaux pour un audit de conformité sous 24h.</p>",
        "<p class=\"mb-4 leading-relaxed\">Mettez vos installations aux normes incendie à <strong>{city}</strong>{deptMention} avec un partenaire certifié et réactif. Que vous prépariez l'ouverture d'un nouveau local ou le contrôle périodique annuel de vos équipements, nous vous délivrons une attestation de vérification officielle pour votre dossier d'assurance.</p><p class=\"mb-4 leading-relaxed\">{neighborhoodMention} Nous intervenons sur l'ensemble des systèmes de protection : extincteurs à eau, poudre ou CO2, Robinets d'Incendie Armés (RIA) et désenfumage pneumatique. Budget d'intervention moyen : <strong>{avgPrice}</strong>.</p><p class=\"leading-relaxed\">Nos contrats de maintenance annuelle incluent la recharge, le remplacement des joints et le dépannage rapide de vos dispositifs d'alerte en cas de défaillance. Devis immédiat sans engagement.</p>",
        "<p class=\"mb-4 leading-relaxed\">À <strong>{city}</strong>, anticipez les risques et assurez la conformité de votre bâtiment avant le passage de la commission de sécurité municipale ou départementale. {neighborhoodMention}</p><p class=\"mb-4 leading-relaxed\">Nos spécialistes rédigent vos consignes de sécurité, éditent vos plans d'intervention plastifiés et fournissent un registre de sécurité complet et à jour. Coût indicatif moyen pour les entreprises de votre secteur : <strong>{avgPrice}</strong>.</p><p class=\"leading-relaxed\">Faites confiance à des professionnels aguerris maîtrisant parfaitement les règles de l'art APSAD R4 pour protéger vos biens et vos collaborateurs.</p>",
        "<p class=\"mb-4 leading-relaxed\">Recherchez-vous une <strong>entreprise de sécurité incendie et maintenance d'extincteurs à {city}{postalMention}</strong> ? Nos techniciens habilités se déplacent rapidement dans tout votre département pour contrôler l'état de votre parc matériel.</p><p class=\"mb-4 leading-relaxed\">{neighborhoodMention} Du remplacement d'une goupille percutée au renouvellement complet de vos têtes de désenfumage, nous garantissons un matériel fiable certifié conforme aux normes françaises et européennes. Investissement moyen : <strong>{avgPrice}</strong>.</p><p class=\"leading-relaxed\">Bénéficiez de tarifs transparents sans mauvaise surprise et d'un suivi informatisé de vos dates de révision périodique. Demandez votre devis gratuit.</p>",
        "<p class=\"mb-4 leading-relaxed\">Protégez votre activité professionnelle contre le risque de sinistre majeur à <strong>{city}</strong>. Plus de 70% des entreprises touchées par un incendie grave ne rouvrent jamais leurs portes dans les 3 ans.</p><p class=\"mb-4 leading-relaxed\">{neighborhoodMention} En équipant vos locaux de dispositifs de première intervention adaptés et bien signalés, vous neutralisez tout départ de feu avant qu'il ne se propage. Le budget moyen observé s'établit entre <strong>{avgPrice}</strong>.</p><p class=\"leading-relaxed\">Prenez rendez-vous avec l'un de nos conseillers techniques à {city} pour planifier votre visite de conformité sans interruption de votre activité.</p>"
];

function getExpertTip(city: string, dept: string, neighborhoods: string[]): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const n0 = neighborhoods.length > 0 ? neighborhoods[0] : city;
    const t = TIPS[hash % TIPS.length];
    return t
        .replace(/{city}/g, city)
        .replace(/{dept}/g, dept || "votre département")
        .replace(/{neighborhood_0}/g, n0);
}

function getIntroHtml(city: string, dept: string, neighborhoods: string[], postalCode: string, avgPrice: string): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const isFrance = city.toLowerCase() === "france";
    const prep = isFrance ? "en" : "à";

    const neighborhoodMention = neighborhoods.length >= 2
        ? `Nos artisans et techniciens spécialisés interviennent dans tous les secteurs de la commune : <strong>${neighborhoods.slice(0, 3).join(', ')}</strong> ainsi que dans les localités périphériques.`
        : "Nos spécialistes qualifiés assurent une couverture totale de l'ensemble de votre secteur et de ses environs.";

    const postalMention = postalCode ? ` (${postalCode})` : "";
    const deptMention = dept ? ` (${dept})` : "";

    const t = INTROS[hash % INTROS.length];
    return t
        .replace(/{city}/g, city)
        .replace(/{prep}/g, prep)
        .replace(/{postalMention}/g, postalMention)
        .replace(/{deptMention}/g, deptMention)
        .replace(/{neighborhoodMention}/g, neighborhoodMention)
        .replace(/{avgPrice}/g, avgPrice);
}

export async function getPseoContent(cityConfig: CityConfig, targetType: string = 'MIXED'): Promise<PseoPageContent> {
    const { city, department, postalCode, neighborhoods, pricing } = cityConfig;
    const dept = department || "";
    const postal = postalCode || "";
    const quartiers = neighborhoods || [];

    const regionalInfo = DEFAULT_REGIONAL;
    const realPrice = pricing?.base || regionalInfo.avgPrice;

    const isFrance = city.toLowerCase() === "france";
    const prep = isFrance ? "en" : "à";
    const postalSpan = postal ? ` <span class="text-slate-400 text-3xl">(${postal})</span>` : "";

    const meta_title = `Expert Sécurité Incendie {city}{postal} | Extincteurs & ERP`
        .replace("{city}", isFrance ? "en France" : city)
        .replace("{postal}", postal ? ` (${postal})` : "");

    const meta_description = `Installation et maintenance d'extincteurs, désenfumage, BAES et alarmes incendie à {city}. Conformité stricte ERP/ERT et règles APSAD. Devis gratuit sous 24h.`
        .replace("{city}", city)
        .replace("{price}", realPrice)
        .replace("{prep}", prep);

    const hero_title = `Expert <span class="text-red-500">Sécurité Incendie</span> {prep} {city}{postalSpan}`
        .replace("{city}", city)
        .replace("{prep}", prep)
        .replace("{postalSpan}", postalSpan);

    const intro_html = getIntroHtml(city, dept, quartiers, postal, realPrice);
    const expert_tip = getExpertTip(city, dept, quartiers);

    return {
        meta_title,
        meta_description,
        hero_title,
        hero_badge: regionalInfo.subsidyName,
        intro_html,
        cta_primary: "Demander un audit sécurité gratuit",
        pricing_estimated: realPrice,
        regional_subsidy: regionalInfo.subsidyAmount,
        expert_tip,
        local_climate_info: expert_tip,
        installation_timeline: "Intervention sous 24h à 48h",
        local_compliance_info: regionalInfo.subsidyAmount
    };
}
