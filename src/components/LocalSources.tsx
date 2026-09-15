import type { CityConfig } from "@/lib/db";

/**
 * BLOC DE PREUVE ÉDITORIALE (sources, auteur, date)
 * =================================================
 * POURQUOI CE COMPOSANT EXISTE
 * ----------------------------
 * Les pages villes portent l'essentiel du trafic, mais elles ne citaient
 * aucune source, ne nommaient aucun auteur et n'affichaient aucune date de
 * révision. C'est exactement ce qu'un moteur de recherche ou un moteur de
 * réponse vérifie avant de citer une page : d'où vient le chiffre, qui l'a
 * écrit, et quand cela a-t-il été revu.
 *
 * Ici : les textes et organismes officiels réellement utilisés pour rédiger la
 * page sont cités, l'éditeur est nommé, la date de dernière révision est
 * affichée, et le tout est déclaré en Schema.org (`citation`, `author`,
 * `dateModified`) pour que les moteurs de réponse puissent le lire.
 *
 * IMPORTANT : `CONTENT_UPDATED` doit être mis à jour à la main, uniquement
 * quand le fond de la page change réellement. Ne jamais la faire bouger à
 * chaque déploiement : une date qui change sans que le contenu change est un
 * faux signal de fraîcheur.
 */

const BRAND = "Expert Sécurité Incendie";
const BASE = "https://www.expertsecuriteincendie.fr";

const CONTENT_UPDATED = "2026-09-16";
const CONTENT_UPDATED_LABEL = "16 septembre 2026";

const SOURCES: { label: string; url: string; note: string }[] = [
    { label: "Code de la construction et de l'habitation — Légifrance", url: "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006074096", note: "classement des établissements et obligations de sécurité incendie" },
    { label: "Code du travail — Légifrance", url: "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072050", note: "obligations de l'employeur en matière de sécurité incendie des lieux de travail" },
    { label: "Ministère de l'Intérieur — Sécurité civile", url: "https://www.interieur.gouv.fr/", note: "organisation des services départementaux d'incendie et de secours" },
    { label: "INRS — risque incendie en entreprise", url: "https://www.inrs.fr/", note: "prévention, moyens de secours et consignes" },
    { label: "Service-Public.fr", url: "https://www.service-public.fr/", note: "démarches et obligations applicables aux entreprises et aux ERP" },
];

const METHOD =
    "Les obligations réglementaires citées renvoient aux codes et arrêtés en vigueur, consultables dans les textes liés ci-dessus. Les fourchettes de prix sont indicatives : elles correspondent aux prestations de maintenance et de mise en conformité constatées sur le marché local et ne remplacent pas un devis établi après visite technique. Les noms des services de secours locaux proviennent du découpage administratif officiel du département.";

export default function LocalSources({
    site,
    url,
    path,
}: {
    site: CityConfig;
    /** URL canonique exacte de la page (pages villes x marques, B2B...) */
    url?: string;
    /** Chemin relatif au site, si l'URL absolue n'est pas connue de l'appelant */
    path?: string;
}) {
    const pageUrl = url ?? `${BASE}${path ?? `/ville/${site.slug}`}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Sécurité incendie à ${site.city}`,
        url: pageUrl,
        inLanguage: "fr-FR",
        isPartOf: { "@type": "WebSite", name: BRAND, url: BASE },
        author: { "@type": "Organization", name: BRAND, url: BASE },
        publisher: { "@type": "Organization", name: BRAND, url: BASE },
        dateModified: CONTENT_UPDATED,
        citation: SOURCES.map((s) => ({
            "@type": "WebPage",
            name: s.label,
            url: s.url,
        })),
    };

    return (
        <section className="py-12 bg-white border-t border-slate-200" aria-labelledby="sources-title">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 id="sources-title" className="text-2xl font-bold text-slate-900 mb-4">
                    Sources et méthode
                </h2>

                <p className="text-sm text-slate-600 mb-6">
                    Page rédigée par l&apos;équipe éditoriale de <strong>{BRAND}</strong>
                    {site.city ? ` pour ${site.city}` : ""}. Dernière révision :{" "}
                    <time dateTime={CONTENT_UPDATED}>{CONTENT_UPDATED_LABEL}</time>.
                </p>

                <ul className="space-y-3 mb-6">
                    {SOURCES.map((s) => (
                        <li key={s.url} className="text-sm text-slate-700 leading-relaxed">
                            <a
                                href={s.url}
                                target="_blank"
                                rel="noopener"
                                className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-900"
                            >
                                {s.label}
                            </a>
                            <span className="text-slate-500"> — {s.note}</span>
                        </li>
                    ))}
                </ul>

                <p className="text-xs text-slate-500 leading-relaxed">{METHOD}</p>
            </div>
        </section>
    );
}
