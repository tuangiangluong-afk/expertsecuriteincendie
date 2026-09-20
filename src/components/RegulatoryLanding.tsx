import Link from "next/link";
import { ArrowRight, CheckCircle, ClipboardCheck, FileCheck2, ShieldCheck, MapPin, Building2 } from "lucide-react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import RegulatoryLeadForm from "@/components/RegulatoryLeadForm";
import { getHubConfig } from "@/lib/sites-config";
import SchemaJSON from "@/components/SchemaJSON";
import type { CityConfig } from "@/lib/db";

type RegulatoryPage = "ssi" | "q18" | "commission";

const DEPARTMENTS: Record<string, string> = {
    "01": "Ain", "02": "Aisne", "03": "Allier", "04": "Alpes-de-Haute-Provence", "05": "Hautes-Alpes",
    "06": "Alpes-Maritimes", "07": "Ardèche", "08": "Ardennes", "09": "Ariège", "10": "Aube",
    "11": "Aude", "12": "Aveyron", "13": "Bouches-du-Rhône", "14": "Calvados", "15": "Cantal",
    "16": "Charente", "17": "Charente-Maritime", "18": "Cher", "19": "Corrèze", "2A": "Corse-du-Sud",
    "2B": "Haute-Corse", "21": "Côte-d'Or", "22": "Côtes-d'Armor", "23": "Creuse", "24": "Dordogne",
    "25": "Doubs", "26": "Drôme", "27": "Eure", "28": "Eure-et-Loir", "29": "Finistère",
    "30": "Gard", "31": "Haute-Garonne", "32": "Gers", "33": "Gironde", "34": "Hérault",
    "35": "Ille-et-Vilaine", "36": "Indre", "37": "Indre-et-Loire", "38": "Isère", "39": "Jura",
    "40": "Landes", "41": "Loir-et-Cher", "42": "Loire", "43": "Haute-Loire", "44": "Loire-Atlantique",
    "45": "Loiret", "46": "Lot", "47": "Lot-et-Garonne", "48": "Lozère", "49": "Maine-et-Loire",
    "50": "Manche", "51": "Marne", "52": "Haute-Marne", "53": "Mayenne", "54": "Meurthe-et-Moselle",
    "55": "Meuse", "56": "Morbihan", "57": "Moselle", "58": "Nièvre", "59": "Nord",
    "60": "Oise", "61": "Orne", "62": "Pas-de-Calais", "63": "Puy-de-Dôme", "64": "Pyrénées-Atlantiques",
    "65": "Hautes-Pyrénées", "66": "Pyrénées-Orientales", "67": "Bas-Rhin", "68": "Haut-Rhin", "69": "Rhône",
    "70": "Haute-Saône", "71": "Saône-et-Loire", "72": "Sarthe", "73": "Savoie", "74": "Haute-Savoie",
    "75": "Paris", "76": "Seine-Maritime", "77": "Seine-et-Marne", "78": "Yvelines", "79": "Deux-Sèvres",
    "80": "Somme", "81": "Tarn", "82": "Tarn-et-Garonne", "83": "Var", "84": "Vaucluse",
    "85": "Vendée", "86": "Vienne", "87": "Haute-Vienne", "88": "Vosges", "89": "Yonne",
    "90": "Territoire de Belfort", "91": "Essonne", "92": "Hauts-de-Seine", "93": "Seine-Saint-Denis",
    "94": "Val-de-Marne", "95": "Val-d'Oise", "971": "Guadeloupe", "972": "Martinique",
    "973": "Guyane", "974": "La Réunion", "976": "Mayotte"
};

function getLocalContext(city?: CityConfig) {
    if (!city) return null;
    const postal = city.postalCode || "";
    let deptCode = city.department || (postal.length >= 2 ? postal.substring(0, 2) : "");
    if (postal.startsWith("97")) deptCode = postal.substring(0, 3);
    const deptName = city.deptName || DEPARTMENTS[deptCode] || `Département ${deptCode}`;

    let fireAuthority = `SDIS ${deptCode} (${deptName})`;
    if (["75", "92", "93", "94"].includes(deptCode)) {
        fireAuthority = "Brigade de Sapeurs-Pompiers de Paris (BSPP)";
    } else if (deptCode === "13" && city.city.toLowerCase().includes("marseille")) {
        fireAuthority = "Bataillon de Marins-Pompiers de Marseille (BMPM)";
    } else if (deptCode === "69") {
        fireAuthority = "Service Départemental-Métropolitain d'Incendie et de Secours (SDMIS)";
    }

    const neighborText = city.zones && city.zones.length > 0
        ? ` et le bassin limitrophe (${city.zones.slice(0, 3).map(z => z.nom).join(', ')})`
        : "";

    return {
        city: city.city,
        deptCode,
        deptName,
        postal,
        fireAuthority,
        neighborText,
    };
}

const pageData: Record<RegulatoryPage, {
    title: string;
    description: string;
    eyebrow: string;
    intro: string;
    need: "ssi_triennale" | "q18" | "commission_erp";
    h2: string;
    paragraphs: string[];
    bullets: string[];
    faq: Array<{ q: string; a: string }>;
}> = {
    ssi: {
        title: "Vérification réglementaire SSI en ERP | Qualification et devis",
        description: "Besoin d'une vérification de votre SSI en ERP ? Décrivez votre établissement, votre échéance et vos documents pour être orienté vers un intervenant adapté.",
        eyebrow: "Système de sécurité incendie · ERP",
        intro: "Préparez votre vérification SSI avec un interlocuteur qui commence par qualifier le périmètre réel de votre établissement.",
        need: "ssi_triennale",
        h2: "À quoi sert une vérification SSI ?",
        paragraphs: [
            "Une vérification SSI permet de contrôler, selon le périmètre applicable à l'établissement et le référentiel retenu, le fonctionnement et la cohérence des équipements qui concourent à la sécurité incendie. Elle ne se résume pas à la maintenance d'un extincteur : le type de SSI, les zones protégées, les scénarios de mise en sécurité et les documents disponibles doivent être examinés.",
            "La périodicité, le contenu du rapport et la qualification de l'intervenant dépendent notamment de la catégorie de l'ERP, de ses installations et des exigences de la commission de sécurité ou de l'assureur. Notre formulaire recueille ces éléments avant toute orientation ; il ne promet ni agrément automatique ni validation réglementaire.",
        ],
        bullets: ["Identifier le type d'établissement et le périmètre SSI", "Faire le point sur la dernière vérification et les réserves", "Préparer les documents utiles : registre, rapports, plans et contrats", "Orienter vers un prestataire ou organisme adapté à la demande"],
        faq: [
            { q: "La vérification SSI est-elle toujours triennale ?", a: "La périodicité dépend du cadre applicable à l'établissement et à ses installations. Elle doit être confirmée au cas par cas à partir du registre de sécurité, des prescriptions et des rapports précédents." },
            { q: "Qui réalise une vérification SSI ?", a: "Cela dépend du type de vérification et du périmètre. L'intervenant doit disposer des compétences, qualifications ou accréditations requises pour la mission concernée ; la qualification est vérifiée lors de l'orientation." },
        ],
    },
    q18: {
        title: "Contrôle électrique ERP et rapport Q18 | Demande de qualification",
        description: "Votre assureur ou votre établissement demande un contrôle électrique ? Qualifiez votre site, votre échéance et votre besoin de rapport avant d'être orienté.",
        eyebrow: "Installations électriques · ERP et entreprises",
        intro: "Ne demandez pas un rapport au hasard : le bon contrôle dépend de l'installation, du document demandé et de l'usage qui en sera fait.",
        need: "q18",
        h2: "Contrôle électrique : clarifier le bon document",
        paragraphs: [
            "Les termes Q18, vérification électrique, thermographie ou rapport pour l'assureur sont parfois employés indistinctement alors qu'ils ne recouvrent pas nécessairement la même mission. Le périmètre doit être précisé avec l'exploitant, l'assureur et l'intervenant compétent.",
            "Nous recueillons le type de bâtiment, le code postal, l'échéance et le besoin exprimé afin de transmettre une demande exploitable. Le rapport final et ses conclusions relèvent exclusivement du professionnel ou de l'organisme chargé de la mission.",
        ],
        bullets: ["Distinguer contrôle périodique, thermographie et rapport demandé par l'assureur", "Décrire le site et ses installations principales", "Indiquer la prochaine échéance ou la demande de la commission", "Recevoir une orientation vers un intervenant adapté au périmètre"],
        faq: [
            { q: "Un rapport Q18 est-il obligatoire pour tous les établissements ?", a: "Les obligations et demandes documentaires varient selon le site, son activité, ses installations et son contrat d'assurance. Il faut confirmer le document exigé avant de commander une mission." },
            { q: "Le contrôle électrique remplace-t-il la vérification SSI ?", a: "Non. Les installations électriques et le système de sécurité incendie peuvent relever de contrôles distincts, avec des intervenants et des rapports différents." },
        ],
    },
    commission: {
        title: "Préparer une commission de sécurité ERP | Mise au point conformité",
        description: "Commission de sécurité proche ? Faites qualifier les équipements, rapports et réserves de votre ERP avant de demander une intervention.",
        eyebrow: "Commission de sécurité · Établissements recevant du public",
        intro: "Gagnez du temps avant la commission : listez votre établissement, vos réserves et vos échéances pour obtenir une orientation précise.",
        need: "commission_erp",
        h2: "Préparer une commission de sécurité sans fausse promesse",
        paragraphs: [
            "Une commission de sécurité examine la situation de l'établissement au regard des règles qui lui sont applicables et des prescriptions qui lui ont été notifiées. Une intervention commerciale ne remplace ni la commission, ni l'autorité compétente, ni un avis administratif.",
            "En revanche, une qualification en amont peut aider à réunir les rapports, vérifier les contrats de maintenance, identifier les réserves techniques et solliciter les bons interlocuteurs dans le délai disponible.",
        ],
        bullets: ["Centraliser la date de visite et les prescriptions connues", "Lister les rapports manquants ou arrivés à échéance", "Distinguer maintenance, vérification et travaux correctifs", "Prioriser les demandes selon le calendrier réel du site"],
        faq: [
            { q: "Une demande urgente garantit-elle une intervention avant la commission ?", a: "Non. Le délai dépend de la disponibilité et du périmètre de la mission. Le formulaire sert à prioriser la qualification, sans garantir une date d'intervention." },
            { q: "Pouvez-vous garantir un avis favorable ?", a: "Non. Seule l'autorité compétente rend son avis. Un prestataire peut contrôler ou corriger certains points, mais ne peut pas garantir la décision de la commission." },
        ],
    },
};

function getEnrichedContent(page: RegulatoryPage, city?: CityConfig) {
    const base = pageData[page];
    const loc = getLocalContext(city);
    if (!loc) return base;

    if (page === "ssi") {
        return {
            ...base,
            title: `Vérification SSI ERP à ${loc.city} (${loc.deptCode}) | Conformité & Devis`,
            description: `Contrôle et vérification réglementaire triennale SSI pour ERP à ${loc.city} (${loc.postal}). Préparation du registre de sécurité pour le ${loc.fireAuthority}.`,
            intro: `Préparez la vérification de votre Système de Sécurité Incendie (SSI) à ${loc.city} avec un accompagnement rigoureux adapté aux exigences locales du ${loc.deptName}.`,
            h2: `Cadre réglementaire du SSI pour les ERP à ${loc.city}`,
            paragraphs: [
                `À ${loc.city} (${loc.deptCode}), tout Établissement Recevant du Public (ERP de la 1ère à la 5ème catégorie) doté d'un Système de Sécurité Incendie est soumis aux obligations du Code de la construction et de l'habitation et de la norme NF S 61-933. La vérification triennale porte sur l'ensemble de la chaîne de sécurité : de la détection automatique d'incendie (DAI) et des déclencheurs manuels jusqu'aux asservissements (portes coupe-feu, clapets télécommandés, désenfumage mécanique ou naturel et signalisation sonore d'évacuation).`,
                `Les contrôles périodiques effectués par la Commission Communale de Sécurité de ${loc.city}${loc.neighborText}, sous l'égide du ${loc.fireAuthority}, exigent la présentation de rapports récents attestant du bon fonctionnement de chaque zone d'alarme et de mise en sécurité. Notre service qualifie votre besoin afin de vérifier la complétude de vos pièces techniques avant toute visite officielle.`
            ],
            bullets: [
                `Audit du périmètre SSI selon le classement de votre ERP à ${loc.city}`,
                `Contrôle de l'historique des visites et vérification des réserves formulées par le ${loc.fireAuthority}`,
                `Centralisation des rapports de maintenance des asservissements (volets de désenfumage, compartimentage)`,
                `Orientation vers des techniciens ou organismes vérificateurs qualifiés intervenant sur ${loc.city} et le ${loc.deptName}`
            ],
            faq: [
                {
                    q: `Quelle est la périodicité de la vérification SSI pour un ERP à ${loc.city} ?`,
                    a: `Le SSI doit faire l'objet d'une maintenance annuelle par une entreprise spécialisée et d'une vérification triennale approfondie par un technicien compétent ou organisme agréé, conformément au règlement de sécurité applicable dans le département ${loc.deptName} (${loc.deptCode}).`
                },
                {
                    q: `Quels documents présenter lors du passage de la commission de sécurité à ${loc.city} ?`,
                    a: `L'exploitant doit présenter le Registre de Sécurité de l'établissement à jour, le rapport de vérification triennale du SSI, les bons d'intervention de maintenance des extincteurs et blocs autonomes d'éclairage de sécurité (BAES), ainsi que les justificatifs de levée des réserves précédemment émises par le ${loc.fireAuthority}.`
                }
            ]
        };
    }

    if (page === "q18") {
        return {
            ...base,
            title: `Contrôle Électrique ERP & Rapport Q18 à ${loc.city} (${loc.postal}) | Devis`,
            description: `Vérification périodique des installations électriques et document Q18 pour ERP, commerces et copropriétés à ${loc.city} (${loc.deptCode}). Prévention du risque incendie.`,
            intro: `Obtenez votre compte-rendu de vérification électrique ou document Q18 à ${loc.city} selon les exigences de votre assureur et de la réglementation ERP du ${loc.deptName}.`,
            h2: `Vérification électrique périodique et compte-rendu Q18 à ${loc.city}`,
            paragraphs: [
                `Les exploitants d'ERP et chefs d'entreprise à ${loc.city} (${loc.deptCode}) sont tenus de faire vérifier annuellement leurs installations électriques en application de l'arrêté du 26 décembre 2011 et des prescriptions de sécurité au travail. Le rapport Q18 (référentiel APSAD D19) est un document contractuel demandé par les assureurs pour valider la garantie incendie de vos locaux professionnels.`,
                `Sur le secteur de ${loc.city}${loc.neighborText}, cette mission permet d'identifier les anomalies d'isolement, les défauts de mise à la terre et les surcharges sur tableaux TGBT. La réalisation conjointe d'un contrôle thermographique infrarouge (Q19) peut également être requise pour prévenir les échauffements anormaux avant la visite de contrôle périodique.`
            ],
            bullets: [
                `Vérification réglementaire des armoires et réseaux électriques basse tension à ${loc.city}`,
                `Établissement du compte-rendu Q18 normalisé pour les compagnies d'assurance`,
                `Détection préventive par thermographie infrarouge des points chauds sur installations sensibles`,
                `Orientation rapide vers des diagnostiqueurs ou organismes de contrôle agréés dans le ${loc.deptName}`
            ],
            faq: [
                {
                    q: `Pourquoi mon assureur me demande-t-il un rapport Q18 à ${loc.city} ?`,
                    a: `Le document Q18 atteste auprès de votre compagnie d'assurance que les installations électriques de votre établissement à ${loc.city} ne présentent pas de facteurs aggravants de risque incendie. Sans ce rapport annuel à jour, l'assureur peut appliquer une franchise majorée ou refuser l'indemnisation en cas de sinistre.`
                },
                {
                    q: `Le contrôle Q18 remplace-t-il la vérification périodique obligatoire en ERP ?`,
                    a: `Non, le rapport Q18 est un document assurantiel complémentaire basé sur le référentiel technique APSAD D19. Il s'appuie sur la vérification réglementaire des installations électriques mais cible spécifiquement la prévention du risque d'incendie électrique.`
                }
            ]
        };
    }

    // Commission ERP
    return {
        ...base,
        title: `Préparation Commission de Sécurité ERP à ${loc.city} (${loc.deptCode}) | Audit & Levée de Réserves`,
        description: `Préparez la visite périodique ou d'ouverture de la commission de sécurité ERP à ${loc.city} (${loc.postal}). Mise en conformité registre et exigences du ${loc.fireAuthority}.`,
        intro: `Abordez la visite de la commission communale de sécurité à ${loc.city} en toute sérénité grâce à une qualification préalable de vos installations et de votre registre.`,
        h2: `Déroulement et préparation de la commission de sécurité ERP à ${loc.city}`,
        paragraphs: [
            `À ${loc.city} (${loc.deptCode}), la Commission Communale de Sécurité contrôle périodiquement les établissements recevant du public pour s'assurer du respect des règles d'évacuation, de désenfumage, de détection et de cloisonnement coupe-feu. Placée sous l'autorité du Maire de ${loc.city} ou de la Préfecture de ${loc.deptName}, elle compte parmi ses membres permanents l'officier préventionniste du ${loc.fireAuthority}.`,
            `Avant le passage des inspecteurs, l'exploitant de l'ERP à ${loc.city}${loc.neighborText} doit s'assurer que toutes les vérifications périodiques obligatoires sont à jour (SSI, électricité, extincteurs, éclairage de sécurité BAES, désenfumage) et que les réserves notifiées lors des visites antérieures ont été valablement levées et consignées dans le Registre de Sécurité.`
        ],
        bullets: [
            `Revue complète des procès-verbaux antérieurs et inventaire des prescriptions du ${loc.fireAuthority}`,
            `Vérification de la validité des attestations techniques (triennale SSI, électricité, désenfumage)`,
            `Mise à jour et structuration du Registre de Sécurité communal de ${loc.city}`,
            `Orientation vers des entreprises spécialisées pour les interventions de mise aux normes prioritaires`
        ],
        faq: [
            {
                q: `Qui siège à la commission de sécurité ERP de ${loc.city} ?`,
                a: `La commission est présidée par le Maire de ${loc.city} (ou son représentant) ou le Préfet du département ${loc.deptName}, assisté du sapeur-pompier préventionniste du ${loc.fireAuthority}, d'un représentant de la direction départementale des territoires (DDT) et des services de police ou gendarmerie compétents.`
            },
            {
                q: `Que faire si la commission de sécurité a émis un avis défavorable à ${loc.city} ?`,
                a: `L'exploitant doit analyser la liste des observations notifiées au procès-verbal et engager sans délai les travaux correctifs ou vérifications demandées. Une fois les réserves levées par des professionnels qualifiés, un dossier justificatif doit être transmis au secrétariat de la commission en Mairie de ${loc.city} pour solliciter une visite de levée d'avis défavorable.`
            }
        ]
    };
}

export default function RegulatoryLanding({ page, city }: { page: RegulatoryPage; city?: CityConfig }) {
    const data = getEnrichedContent(page, city);
    const loc = getLocalContext(city);
    const hub = getHubConfig();
    const basePath = page === "ssi" ? "verifications-reglementaires/ssi-triennale" : page === "q18" ? "verifications-reglementaires/controle-electrique-q18" : "commission-de-securite-erp/mise-aux-normes";
    const canonical = `https://www.expertsecuriteincendie.fr/${city ? `ville/${city.slug}/${basePath}` : basePath}`;
    const locationLabel = city ? ` à ${city.city}` : "";
    const breadcrumb = [{ name: "Accueil", item: "https://www.expertsecuriteincendie.fr" }, { name: data.eyebrow, item: canonical }];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <SchemaJSON type="Breadcrumb" breadcrumbItems={breadcrumb} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: data.title, description: data.description, url: canonical, provider: { "@type": "Organization", name: "Expert Sécurité Incendie", url: "https://www.expertsecuriteincendie.fr" }, areaServed: { "@type": "Country", name: "France" } }) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: data.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }) }} />
            <Header isHub={true} city={city?.city} phoneNumber={city?.phoneNumber} variant="default" />
            <main>
                <section className="border-b border-slate-200 bg-white py-16 lg:py-24">
                    <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_460px] lg:items-center">
                        <div>
                            <div className="mb-5 flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700">
                                    <ShieldCheck size={17} /> {data.eyebrow}{locationLabel}
                                </span>
                                {loc && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                                        <MapPin size={13} className="text-red-600" /> {loc.city} ({loc.postal}) · {loc.deptName}
                                    </span>
                                )}
                            </div>
                            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-6xl">
                                {data.title.split("|")[0]}
                            </h1>
                            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-600">
                                {data.intro}
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
                                <span className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2">
                                    <ClipboardCheck size={17} className="text-red-600" /> Qualification du besoin
                                </span>
                                <span className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2">
                                    <FileCheck2 size={17} className="text-red-600" /> Documents et échéances
                                </span>
                            </div>
                        </div>
                        <RegulatoryLeadForm defaultNeed={data.need} city={city?.city} />
                    </div>
                </section>
                <section className="container mx-auto grid gap-12 px-4 py-16 lg:grid-cols-[1fr_350px]">
                    <article className="prose prose-lg prose-slate max-w-none">
                        {loc && (
                            <div className="not-prose mb-8 rounded-2xl border border-blue-200 bg-blue-50/60 p-5">
                                <div className="flex items-start gap-3">
                                    <Building2 className="mt-0.5 shrink-0 text-blue-700" size={20} />
                                    <div>
                                        <h3 className="font-bold text-blue-950">Compétence territoriale et prévention : {loc.city}</h3>
                                        <p className="mt-1 text-sm leading-relaxed text-blue-900">
                                            Les établissements recevant du public situés à {loc.city} ({loc.postal}) relèvent de la compétence du <strong>{loc.fireAuthority}</strong> pour les avis techniques et prescriptions de sécurité incendie, et des services municipaux de la Mairie de {loc.city} pour la délivrance des autorisations d'ouverture et procès-verbaux de commission.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <h2>{data.h2}</h2>
                        {data.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                        <h2>Ce que la qualification permet de préparer</h2>
                        <ul>
                            {data.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                            ))}
                        </ul>
                        <div className="not-prose my-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
                            <h3 className="font-bold text-amber-950">Important : orientation technique, pas décision administrative</h3>
                            <p className="mt-2 text-sm leading-relaxed text-amber-900">
                                Expert Sécurité Incendie qualifie une demande et oriente vers des professionnels certifiés intervenant sur {loc?.city || "votre secteur"}. La conformité réglementaire, l'accréditation applicable, le contenu des rapports techniques et l'avis final de la commission relèvent exclusivement des professionnels et autorités compétentes.
                            </p>
                        </div>
                        <h2>Questions fréquentes{locationLabel}</h2>
                        {data.faq.map((item) => (
                            <div key={item.q} className="not-prose mb-5 rounded-xl border border-slate-200 bg-white p-5">
                                <h3 className="font-bold text-slate-900">{item.q}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
                            </div>
                        ))}
                    </article>
                    <aside className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
                        <div className="rounded-2xl border-2 border-red-200 bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900">Autres besoins ERP{locationLabel}</h2>
                            <nav className="mt-4 space-y-3">
                                <Link className="flex items-center justify-between rounded-lg bg-slate-50 p-3 font-medium hover:bg-red-50" href={city ? `/ville/${city.slug}/verifications-reglementaires/ssi-triennale` : "/verifications-reglementaires/ssi-triennale"}>
                                    Vérification SSI <ArrowRight size={16} />
                                </Link>
                                <Link className="flex items-center justify-between rounded-lg bg-slate-50 p-3 font-medium hover:bg-red-50" href={city ? `/ville/${city.slug}/verifications-reglementaires/controle-electrique-q18` : "/verifications-reglementaires/controle-electrique-q18"}>
                                    Contrôle électrique Q18 <ArrowRight size={16} />
                                </Link>
                                <Link className="flex items-center justify-between rounded-lg bg-slate-50 p-3 font-medium hover:bg-red-50" href={city ? `/ville/${city.slug}/commission-de-securite-erp/mise-aux-normes` : "/commission-de-securite-erp/mise-aux-normes"}>
                                    Commission ERP <ArrowRight size={16} />
                                </Link>
                            </nav>
                        </div>
                        <div className="rounded-2xl bg-slate-900 p-6 text-white">
                            <h2 className="text-xl font-bold">Besoin d'un devis de maintenance ?</h2>
                            <p className="mt-2 text-sm text-slate-300">Pour extincteurs, BAES, désenfumage ou contrat annuel, consultez aussi notre offre entreprise.</p>
                            <Link href="/solutions/entreprise" className="mt-4 inline-flex items-center gap-2 font-bold text-red-300">
                                Voir l'offre entreprise <ArrowRight size={16} />
                            </Link>
                        </div>
                    </aside>
                </section>
            </main>
            <Footer config={hub} />
        </div>
    );
}

export { pageData, getEnrichedContent };
