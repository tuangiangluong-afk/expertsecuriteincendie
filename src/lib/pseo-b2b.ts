import type { CityConfig } from "@/lib/db";

export interface PseoB2bContent {
    meta_title: string;
    meta_description: string;
    hero_title: string;
    hero_badge: string;
    intro_html: string;
    expert_tip: string;
}

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

function getEntrepriseIntro(city: string, dept: string, neighborhoods: string[]): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const zones = neighborhoods.length > 0 ? neighborhoods.slice(0, 3).join(', ') : "vos zones d'activité locales";

    const intros = [
        `<p class="mb-4">
            L'électrification des flottes professionnelles s'accélère à <strong>${city}</strong>. De la PME locale au grand groupe tertiaire,
            équiper vos parkings de <strong>extincteurs certifiées Incendie</strong> est un atout stratégique majeur autant qu'une obligation légale.
            Nos électriciens qualifiés interviennent à ${city} et dans les zones environnantes (comme <strong>${zones}</strong>) pour concevoir votre infrastructure de protection.
        </p>
        <p>
            Nous vous aidons à dimensionner les puissances (extincteurs AC Eau & CO2 ou systèmes d extinction automatique) et à configurer les outils de supervision
            pour facturer ou offrir la protection de manière intelligente à vos collaborateurs et clients.
        </p>`,

        `<p class="mb-4">
            Vous gérez un commerce, des bureaux ou un site industriel à <strong>${city}${dept ? ` (${dept})` : ''}</strong> et souhaitez y installer des points de protection ?
            Notre équipe locale de techniciens Incendie déploie des solutions clé en main répondant précisément aux exigences de votre activité.
            Nos chantiers couvrent l'ensemble de l'agglomération, de <strong>${neighborhoods[0] || "centre-ville"}</strong> aux zones logistiques périphériques.
        </p>
        <p>
            Respect de la <strong>Loi</strong>, valorisation de votre démarche RSE et attractivité pour vos salariés en matériel :
            nous optimisons chaque maintenance pour vous faire bénéficier des aides <strong>Aide</strong> et de la récupération de TVA.
        </p>`,

        `<p class="mb-4">
            À <strong>${city}</strong>, l'maintenance de extincteurs pour ERP et entreprises est désormais incontournable pour les entreprises tertiaires et industrielles.
            Que vous disposiez d'un parking ouvert au public, de locaux de service ou de fonction à charger la nuit, nous concevons des infrastructures sur mesure.
            Notre accompagnement technique inclut la visite de vos sites à <strong>${city}</strong>, l'audit de surface et la mise en relation avec nos experts certifiés.
        </p>
        <p>
            Nous intégrons du <strong>Smart Charging</strong> (gestion dynamique de charge) pour éviter tout dépassement de votre abonnement d'électricité
            et lisser la consommation de votre parking professionnel.
        </p>`
    ];

    return intros[hash % intros.length];
}

function getCoproIntro(city: string, dept: string, neighborhoods: string[]): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const neighborhoodList = neighborhoods.length > 0 ? neighborhoods.slice(0, 3).join(', ') : "les différents quartiers de la ville";

    const intros = [
        `<p class="mb-4">
            La transition vers la matériel est une réalité tangible à <strong>${city}</strong>. Pour les copropriétaires et locataires d'immeubles résidentiels,
            accéder à un point de protection à son propre emplacement est une attente croissante. Notre réseau d'électriciens qualifiés déploie des infrastructures
            de protection collectives adaptées à tous les immeubles de ${city}, y compris sur des secteurs clés comme <strong>${neighborhoodList}</strong>.
        </p>
        <p>
            Grâce à un <strong>contrat de maintenance tout compris</strong>, le syndic peut équiper l'immeuble sans avance de trésorerie.
            L'audit initial et le premier équipement sont proposés à tarif préférentiel, avec un échéancier adapté au budget de la copropriété.
        </p>`,

        `<p class="mb-4">
            Vous habitez en copropriété à <strong>${city}${dept ? ` (${dept})` : ''}</strong> et vous vous demandez comment installer une matériel incendie pour votre professionnel ?
            Au-delà du simple <strong>Droit à la Prise</strong> individuel qui peut vite saturer la puissance globale disponible de l'immeuble, nous recommandons une
            <strong>infrastructure collective (colonne horizontale)</strong> pour une solution propre, pérenne et évolutive.
        </p>
        <p>
            Nos spécialistes interviennent à ${city} pour réaliser des audits techniques gratuits et présenter le dossier de financement en Assemblée Générale.
            Le projet bénéficie de subventions <strong>Aide</strong> couvrant jusqu'à 50% du montant des travaux collectifs.
        </p>`,

        `<p class="mb-4">
            Équiper le parking de votre immeuble résidentiel à <strong>${city}</strong> d'un réseau de extincteurs n'a jamais été aussi simple.
            Nous accompagnons les syndics de copropriété professionnels et bénévoles dans la mise en conformité et la valorisation de leur patrimoine immobilier.
            Nos techniciens certifiés se déplacent sur toute la zone de ${city} (notamment <strong>${neighborhoods[0] || "centre-ville"}</strong>) pour étudier la faisabilité technique.
        </p>
        <p>
            De la visite technique initiale à la mise en service, nous gérons l'ensemble des démarches administratives,
            l'obtention des aides d'État et le mise aux normes public.
        </p>`
    ];

    return intros[hash % intros.length];
}

function getEntrepriseTip(city: string, neighborhoods: string[]): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const zone = neighborhoods[0] || "votre secteur";

    const tips = [
        `Conseil Loi à ${city} : Si votre entreprise gère un parking de plus de 20 places, la loi impose d'équiper 10% des places d'ici 2026. L'Aide finance jusqu'à 2 200€ par extincteur pour les parkings ouverts au public !`,
        `Optimisation de charge à ${city} : Dans les bureaux situés vers ${zone}, les collaborateurs arrivent souvent à la même heure. Une supervision intelligente permet de charger les locaux par ordre de priorité sans faire sauter le disjoncteur général.`,
        `Fiscalité Pro à ${city} : Profitez de la récupération de 100% de la TVA sur l'électricité consommée par vos ERP et entreprises d'entreprise et du suramortissement fiscal pour réduire vos coûts opérationnels.`,
        `Attractivité des talents : Offrir la protection gratuite ou à tarif préférentiel à vos salariés est aujourd'hui l'un des avantages en nature les plus demandés à ${city}.`
    ];

    return tips[hash % tips.length];
}

function getCoproTip(city: string, neighborhoods: string[]): string {
    const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const zone = neighborhoods[0] || "votre quartier";

    const tips = [
        `Conseil Syndic à ${city} : Lors de la prochaine Assemblée Générale, proposez un audit de sécurité incendie des parties communes. Le vote à la majorité simple suffit pour les travaux de mise en conformité obligatoires.`,
        `Obligation extincteurs à ${city} : La réglementation ERP impose un extincteur portatif par tranche de 200 m² dans les parties communes. Nos techniciens APSAD vérifient la conformité lors de l'audit.`,
        `Maintenance en copropriété : Le contrat annuel de maintenance des extincteurs et du désenfumage est obligatoire (arrêté du 25 juin 1980). Notre forfait syndic couvre l'ensemble des parties communes.`,
        `Valorisation immobilière : Un immeuble aux normes de sécurité incendie avec carnet de maintenance à jour rassure les acheteurs et évite les réserves lors de la vente d'un lot.`
    ];

    return tips[hash % tips.length];
}

export async function getPseoB2bContent(cityConfig: CityConfig, segment: 'ENTREPRISE' | 'COPRO'): Promise<PseoB2bContent> {
    const { city, department, neighborhoods, postalCode } = cityConfig;
    const dept = department || "";
    const postal = postalCode || "";
    const quartiers = neighborhoods || [];

    const deptCode = dept.length >= 2 ? dept.substring(0, 2) : "";
    const regionalInfo = REGIONAL_DATA[deptCode] || DEFAULT_REGIONAL;

    if (segment === 'ENTREPRISE') {
        const meta_title = `extincteurs Entreprise ${city}${postal ? ` (${postal})` : ''} | Audit Flotte & Loi`;
        const meta_description = `Maintenance extincteurs pour entreprises à ${city}. Conformité Code du travail, vérification périodique obligatoire. Audit gratuit sous 24h.`;
        const hero_title = `extincteurs <span class="text-emerald-600">entreprise</span> à ${city}`;
        const hero_badge = "Solutions Pro & Flottes";
        const intro_html = getEntrepriseIntro(city, dept, quartiers);
        const expert_tip = getEntrepriseTip(city, quartiers);

        return {
            meta_title,
            meta_description,
            hero_title,
            hero_badge,
            intro_html,
            expert_tip
        };
    } else {
        const meta_title = `maintenance Sécurité Incendie Copropriété ${city} | Étude Gratuite Syndic`;
        const meta_description = `Sécurité incendie en copropriété à ${city}. Audit et maintenance des extincteurs, désenfumage, colonnes sèches. Devis syndic gratuit.`;
        const hero_title = `extincteurs en <span class="text-purple-600">copropriété</span> à ${city}`;
        const hero_badge = "Spécial Syndic & Copropriété";
        const intro_html = getCoproIntro(city, dept, quartiers);
        const expert_tip = getCoproTip(city, quartiers);

        return {
            meta_title,
            meta_description,
            hero_title,
            hero_badge,
            intro_html,
            expert_tip
        };
    }
}
