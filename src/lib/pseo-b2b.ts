import type { CityConfig } from "@/lib/db";
import { composeLocalIntro } from "@/lib/pseo-local";
import { clampTitle, clampDescription } from "@/lib/seo-meta";

export interface PseoB2bContent {
    meta_title: string;
    meta_description: string;
    hero_title: string;
    hero_badge: string;
    intro_html: string;
    expert_tip: string;
}

/**
 * Service de secours compétent sur la commune.
 * Les SDIS sont numérotés par département : « le SDIS 69 » est vérifiable.
 * Deux exceptions réelles : Paris (BSPP) et Marseille (BMPM).
 */
function secours(dept: string, city: string): string {
    const d = (dept || "").substring(0, 2);
    if (city.toLowerCase() === "marseille") return "le bataillon de marins-pompiers de Marseille (BMPM)";
    if (city.toLowerCase() === "paris" || d === "75") return "la brigade de sapeurs-pompiers de Paris (BSPP)";
    if (!d) return "le service départemental d'incendie et de secours (SDIS)";
    return `le SDIS ${d}`;
}

function getEntrepriseIntro(city: string, dept: string, zones: string[]): string {
    // L'intro est assemblée à partir de six emplacements factuels (voir
    // pseo-local.ts) : l'ancienne version piochait 1 texte sur 3 par hash, ce
    // qui donnait des pages identiques à un mot près sur tout le département.
    return composeLocalIntro(
        {
            city,
            deptCode: dept,
            zones,
            authority: secours(dept, city),
        },
        {
            audience: "Les entreprises, commerces et sites industriels",
            service: "l'audit, la fourniture et la maintenance des moyens de secours",
            norms: "le règlement de sécurité contre les risques d'incendie et de panique (arrêté du 25 juin 1980 pour les ERP) et le Code du travail pour les lieux de travail",
            document: "le registre de sécurité de l'établissement",
            authorityLabel: "le service qui contrôle les établissements",
            project: "votre mise en conformité",
        },
        {
            openers: [
                (f) => `Vous exploitez un commerce, des bureaux ou un site industriel à ${f.city} : les extincteurs, le désenfumage et les colonnes sèches relèvent d'une vérification périodique obligatoire.`,
                (f) => `Un établissement recevant du public ou du personnel à ${f.city} doit pouvoir présenter un registre de sécurité à jour.`,
                (f) => `L'audit incendie de vos locaux à ${f.city} commence par l'inventaire des moyens de secours existants et de leur date de dernière vérification.`,
                (f) => `Les obligations de sécurité incendie à ${f.city} dépendent de l'effectif, de l'activité et du classement de votre établissement.`,
                (f) => `Votre établissement à ${f.city} doit être couvert par des extincteurs adaptés aux risques réels de chaque local, pas seulement présents.`,
                (f) => `Lors d'un contrôle à ${f.city}, ce sont les moyens de secours, leur maintenance et les consignes affichées qui sont vérifiés.`,
            ],
            middles: [
                (_f, v) =>
                    `Notre intervention couvre ${v.service} : inventaire, remplacement des extincteurs hors date, vérification du désenfumage et des éclairages de sécurité.`,
                (f) => `Chaque équipement posé à ${f.city} est répertorié avec sa date de contrôle, de façon à préparer vos vérifications sans recherche dans les factures.`,
                (f, v) =>
                    `Le rapport remis après le passage à ${f.city} alimente directement ${v.document} et reste opposable en cas de contrôle.`,
                (f) => `Les extincteurs proposés à ${f.city} sont choisis selon les classes de feu présentes sur le site (A, B, C, F) et non selon un modèle standard.`,
                (f) => `Nous vérifions aussi l'adéquation des moyens de secours à l'usage réel des locaux à ${f.city} : atelier, réserve, local technique, parking couvert.`,
                (f) => `L'audit réalisé à ${f.city} distingue ce qui relève de l'obligation réglementaire et ce que l'exploitant peut programmer plus tard.`,
            ],
        },
    );
}

function getCoproIntro(city: string, dept: string, zones: string[]): string {
    return composeLocalIntro(
        {
            city,
            deptCode: dept,
            zones,
            authority: secours(dept, city),
        },
        {
            audience: "Les copropriétés et leurs syndics",
            service: "l'audit, la fourniture et la maintenance des équipements de sécurité incendie des parties communes",
            norms: "l'arrêté du 31 janvier 1986 relatif à la sécurité contre l'incendie des bâtiments d'habitation",
            document: "le registre de sécurité de l'immeuble",
            authorityLabel: "l'autorité qui contrôle l'immeuble",
            project: "la mise en conformité de l'immeuble",
        },
        {
            openers: [
                (f) => `Dans un immeuble d'habitation à ${f.city}, les extincteurs, le désenfumage et les colonnes sèches des parties communes doivent être maintenus en état et vérifiés périodiquement.`,
                (f) => `La mise en conformité sécurité incendie d'une copropriété à ${f.city} se décide en assemblée générale, sur la base d'un état des lieux écrit.`,
                (f) => `Avant l'assemblée générale, l'audit réalisé à ${f.city} chiffre les travaux obligatoires et distingue les améliorations facultatives.`,
                (f) => `Une copropriété à ${f.city} doit pouvoir présenter au syndic le registre de sécurité des parties communes à jour.`,
                (f) => `Les obligations incendie d'un immeuble à ${f.city} dépendent de sa date de construction, de sa hauteur et du nombre de niveaux.`,
                (f) => `Les réserves émises lors d'une vente de lot visent souvent l'absence de registre de sécurité à jour dans les copropriétés de ${f.city}.`,
            ],
            middles: [
                (_f, v) => `L'audit couvre ${v.service} : extincteurs, éclairage de sécurité, désenfumage et issues.`,
                (f) => `Le rapport remis pour l'immeuble de ${f.city} est présenté en assemblée générale avec la liste des travaux obligatoires et leur ordre de priorité.`,
                (f, v) => `Chaque passage alimente ${v.document}, ce qui évite au syndic de reconstituer l'historique à chaque contrôle.`,
                (f) => `Nous vérifions la signalisation, l'accès des secours et l'état des portes coupe-feu des parties communes à ${f.city}.`,
                (f) => `Le contrat de maintenance proposé à ${f.city} couvre les vérifications périodiques et la fourniture des équipements manquants.`,
                (f) => `Les comptes rendus sont datés et signés : le conseil syndical de ${f.city} dispose d'une trace pour chaque exercice.`,
            ],
        },
    );
}

function getEntrepriseTip(city: string, zones: string[]): string {
    const zone = zones[0] || "votre secteur";
    const tips = [
        `À ${city}, les vérifications périodiques des extincteurs et du désenfumage se programment une fois par an : les inscrire au calendrier évite de découvrir une date dépassée pendant un contrôle.`,
        `Sur la zone de ${zone}, les réserves émises portent le plus souvent sur les extincteurs non signalés et sur les consignes de sécurité absentes.`,
        `Le registre de sécurité n'est pas un document à reconstituer après coup : chaque passage, chaque remplacement et chaque formation y sont consignés au moment où ils ont lieu à ${city}.`,
        `Un local technique ou une réserve non déclarés à ${city} changent le classement de votre établissement : l'inventaire des locaux fait partie de l'audit.`,
    ];
    return tips[city.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % tips.length];
}

function getCoproTip(city: string, zones: string[]): string {
    const zone = zones[0] || "votre secteur";
    const tips = [
        `À ${city}, un audit avant l'assemblée générale permet de voter les travaux de mise en conformité sur des montants chiffrés plutôt que sur une estimation.`,
        `Dans les immeubles de ${zone}, l'éclairage de sécurité et le désenfumage sont les deux postes les plus souvent en défaut lors de l'état des lieux.`,
        `Le contrat de maintenance des équipements de sécurité incendie d'une copropriété se vote en assemblée générale : il couvre les vérifications périodiques et la fourniture des équipements manquants.`,
        `Tenez le registre de sécurité de l'immeuble à jour : c'est la première pièce demandée lors d'une vérification ou d'une vente de lot à ${city}.`,
    ];
    return tips[city.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % tips.length];
}

export async function getPseoB2bContent(cityConfig: CityConfig, segment: 'ENTREPRISE' | 'COPRO'): Promise<PseoB2bContent> {
    const { city, department, neighborhoods, postalCode } = cityConfig;
    const dept = department || "";
    const postal = postalCode || "";
    const zones = neighborhoods || [];
    const postalMention = postal ? ` (${postal})` : "";

    if (segment === 'ENTREPRISE') {
        const meta_title = `Sécurité incendie entreprise à ${city} | Audit et conformité`;
        const meta_description = `Audit des extincteurs, du désenfumage et des éclairages de sécurité pour les ERP à ${city}. Visite technique sur place.`;
        const hero_title = `Sécurité <span class="text-red-600">incendie en entreprise</span> à ${city}`;
        const hero_badge = "ERP, commerces, sites industriels";
        const intro_html = getEntrepriseIntro(city, dept, zones);
        const expert_tip = getEntrepriseTip(city, zones);

        return { meta_title: clampTitle(meta_title), meta_description: clampDescription(meta_description), hero_title, hero_badge, intro_html, expert_tip };
    }

    const meta_title = `Sécurité incendie copropriété à ${city} | Audit syndic`;
    const meta_description = `Audit des extincteurs, du désenfumage et des colonnes sèches des parties communes à ${city}. État des lieux écrit présentable en AG.`;
    const hero_title = `Sécurité <span class="text-red-600">incendie en copropriété</span> à ${city}`;
    const hero_badge = "Syndics et conseils syndicaux";
    const intro_html = getCoproIntro(city, dept, zones);
    const expert_tip = getCoproTip(city, zones);

    return { meta_title: clampTitle(meta_title), meta_description: clampDescription(meta_description), hero_title, hero_badge, intro_html, expert_tip };
}
