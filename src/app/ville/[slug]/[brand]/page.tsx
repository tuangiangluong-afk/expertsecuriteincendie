export const revalidate = 86400; // 24h ISR cache
import { getCityByCleanSlug, CITIES } from "@/lib/db";
import { brands, rangeLabel, brandEditorial, brandLocalContext, agentsMid } from "@/data/brands";
import { slugify } from "@/lib/slugify";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import SchemaJSON from "@/components/SchemaJSON";
import FAQ from "@/components/FAQ";
import Reviews from "@/components/Reviews";
import { InternalMesh } from "@/components/InternalMesh";
import { CheckCircle, Flame, Shield, ArrowRight, Factory, MapPin } from "lucide-react";
import { getPseoContent } from "@/lib/pseo";
import { getBrandFAQData } from "@/components/LocalFAQ";

type Params = Promise<{ slug: string; brand: string }>;

// Generate all combinations of City x Brand
export async function generateStaticParams() {
    const params: { slug: string; brand: string }[] = [];

    Object.values(CITIES).forEach(city => {
        brands.forEach(brand => {
            params.push({
                slug: slugify(city.city),
                brand: brand.slug
            });
        });
    });

    return params;
}

import { headers } from "next/headers";
import LocalSources from "@/components/LocalSources";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug, brand: brandSlug } = await params;
    const site = getCityByCleanSlug(slug);
    const brandData = brands.find(b => b.slug === brandSlug);

    if (!site || !brandData) return {};

    const agents = agentsMid(brandData);
    const title = `Vérification extincteurs ${brandData.name} à ${site.city}${site.postalCode ? ` (${site.postalCode})` : ''} | Devis gratuit`;
    const description = `Contrôle annuel des extincteurs ${brandData.name} à ${site.city} : ${agents}. Techniciens qualifiés APSAD R4, conformité NF EN 3, registre de sécurité mis à jour. Devis gratuit sous 24h.`;

    const headersList = await headers();
    const canonicalDomain = headersList.get("x-incendie-canonical-domain") || "expertsecuriteincendie.fr";
    const canonicalUrl = `https://${canonicalDomain}/ville/${slug}/${brandSlug}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                "fr-FR": canonicalUrl,
                "x-default": canonicalUrl,
            },
        },
        openGraph: {
            title,
            description,
            siteName: "Expert Sécurité Incendie",
            locale: "fr_FR",
            type: "website",
            images: [
                {
                    url: `https://www.expertsecuriteincendie.fr/api/og?q=${slug}`,
                    width: 1200,
                    height: 630,
                    alt: `maintenance extincteur ${brandData.name} ${site.city}`
                }
            ]
        },
        robots: { index: true, follow: true },
    };
}

export default async function CityBrandPage({ params }: { params: Params }) {
    const { slug, brand: brandSlug } = await params;
    const site = getCityByCleanSlug(slug);
    const brand = brands.find(b => b.slug === brandSlug);

    if (!site || !brand) return notFound();

    // Faits locaux réels (département, région, préfecture, SDIS, code INSEE,
    // intercommunalité, population) : c'est ce qui rend deux pages ville x marque
    // réellement différentes, plutôt qu'une substitution de nom de commune.
    const pseo = await getPseoContent(site);
    const localFacts = pseo.local_facts || [];
    const cityFaqs = getBrandFAQData(site.city, site.department, brand);
    // Angle rédactionnel de la marque, rapporté au territoire de la commune.
    const editorial = brandEditorial(brand, { city: site.city, deptName: site.deptName });
    const localContext = brandLocalContext(brand, {
        city: site.city,
        postalCode: site.postalCode,
        population: site.population,
        insee: site.insee,
        epci: site.epci,
        deptName: site.deptName,
        department: site.department,
        regionName: site.regionName,
    });

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} city={site.city} phoneNumber={site.phoneNumber} variant="default" />

            {/* Schema JSON — type Service spécifique à la marque */}
            <SchemaJSON type="Service" site={site} brand={brand} />

            {/* Breadcrumb structuré */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.expertsecuriteincendie.fr" },
                            { "@type": "ListItem", "position": 2, "name": site.city, "item": `https://www.expertsecuriteincendie.fr/ville/${slug}` },
                            { "@type": "ListItem", "position": 3, "name": `extincteur ${brand.name}`, "item": `https://www.expertsecuriteincendie.fr/ville/${slug}/${brand.slug}` }
                        ]
                    })
                }}
            />

            {/* Hero Section */}
            <div className="bg-slate-900 text-white pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${site.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(8px)' }}></div>
                <div className="absolute inset-0 bg-slate-900/80"></div>

                <div className="mx-auto max-w-4xl relative z-10">
                    {/* Breadcrumb visuel */}
                    <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
                        <Link href="/" className="hover:text-white transition">Accueil</Link>
                        <span>/</span>
                        <Link href={`/ville/${slug}`} className="hover:text-white transition">{site.city}</Link>
                        <span>/</span>
                        <span className="text-red-400 font-bold">extincteur {brand.name}</span>
                    </nav>

                    <div className="text-center">
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-red-500/20 text-red-400 text-sm font-bold mb-6 border border-red-500/30">
                            <Flame size={14} />
                            Techniciens qualifiés APSAD R4 — parc {brand.name}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                            Vérification extincteurs <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-teal-400">{brand.name}</span><br />
                            à {site.city}
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
                            Votre établissement est équipé d'extincteurs {brand.name} à {agentsMid(brand)} ?
                            Nos techniciens assurent le contrôle annuel et la remise en état de votre matériel, avec le geste correspondant à chaque agent extincteur.
                        </p>
                        <a href="#devis" className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold inline-flex items-center gap-2 transition">
                            Obtenir un devis gratuit
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">

                        <div className="prose prose-lg text-slate-600 max-w-none">
                            <h2>Ce que nous vérifions sur un parc {brand.name} à {site.city}</h2>
                            <p>
                                La marque d'un extincteur ne change pas la nature du contrôle annuel, mais elle détermine
                                les <strong>agents extincteurs</strong> présents dans vos locaux — donc le geste technique que
                                le technicien applique appareil par appareil. Voici, pour {brand.name}, ce qui est réellement
                                contrôlé dans un établissement situé à <strong>{site.city}{site.postalCode ? ` (${site.postalCode})` : ''}</strong>.
                            </p>

                            {editorial.map((p, i) => (
                                <p key={`ed-${i}`}>{p}</p>
                            ))}

                            <h3>Gammes {brand.name} prises en charge</h3>
                            {brand.ranges.map((r) => (
                                <div key={rangeLabel(r)} className="not-prose mb-4 rounded-2xl border border-slate-200 bg-white p-5">
                                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                                        <strong className="text-slate-900 text-base">{rangeLabel(r)}</strong>
                                        <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 rounded-full px-2.5 py-1">
                                            Feux {r.classes}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-2">
                                        Capacités usuelles sur ce type d'appareil : {r.capacites.join(', ')}.
                                    </p>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        <strong className="text-slate-900">Vérification annuelle :</strong> {r.controle}.
                                    </p>
                                </div>
                            ))}

                            {brand.verifieConstructeur && (brand.groupe || brand.reseau) && (
                                <>
                                    <h3>Le constructeur et son réseau</h3>
                                    <p>
                                        {brand.groupe && <><strong>{brand.name}</strong> est exploitée par <strong>{brand.groupe}</strong>. </>}
                                        {brand.perimetre}
                                        {brand.reseau ? ` ${brand.reseau}` : ""}
                                    </p>
                                    {brand.faits.length > 0 && (
                                        <ul>
                                            {brand.faits.map((f) => (
                                                <li key={f}>{f}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {brand.source && (
                                        <p className="text-sm">
                                            Informations constructeur vérifiées sur{" "}
                                            <a href={brand.source} target="_blank" rel="noopener noreferrer nofollow">
                                                {brand.source.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                                            </a>.
                                        </p>
                                    )}
                                </>
                            )}

                            {/* Contexte local réel : données administratives officielles (IGN/Etalab).
                                Le paragraphe est conditionné par la marque pour ne pas répéter mot
                                pour mot le même texte sur les quatre pages d'une même commune. */}
                            <h3>Le contexte local de votre intervention à {site.city}</h3>
                            <p>{localContext}</p>
                            <p>
                                Un parc {brand.name} installé sur ce territoire relève du même cadre réglementaire que
                                n'importe quel autre matériel : vérification annuelle tracée au registre de sécurité, et
                                règlement de sécurité contre les risques d'incendie pour les établissements recevant du public.
                            </p>

                            {localFacts.length > 0 && (
                                <>
                                    <h3>Le cadre administratif applicable à {site.city}</h3>
                                    <p>
                                        Les contrôles et les correspondances administratives d&apos;un établissement de {site.city} ne dépendent pas du prestataire retenu mais du territoire : voici les interlocuteurs et le cadre réels de la commune.
                                    </p>
                                    <ul>
                                        {localFacts.map((f) => (
                                            <li key={f.label}><strong>{f.label} :</strong> {f.value}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {site.zones && site.zones.length > 0 && (
                                <>
                                    <h3>Communes desservies autour de {site.city}</h3>
                                    <p>
                                        Nos tournées couvrent les communes limitrophes, ce qui permet de regrouper les vérifications et d&apos;intervenir sans frais de déplacement supplémentaires :
                                    </p>
                                    <ul>
                                        {site.zones.map((z) => (
                                            <li key={z.nom}>
                                                <strong>{z.nom}</strong> — à {String(z.km).replace(".", ",")} km de {site.city}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 sticky top-24">
                            <h3 className="font-bold text-lg mb-4 text-slate-900 border-b pb-2">Résumé de l&apos;intervention</h3>
                            <ul className="space-y-4 text-sm text-slate-600">
                                <li className="flex items-start gap-3">
                                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="block text-slate-900">Agents couverts</strong>
                                        {brand.ranges.map(r => r.agent).join(', ')}
                                    </div>
                                </li>
                                {brand.groupe && (
                                    <li className="flex items-start gap-3">
                                        <Factory size={18} className="text-slate-500 shrink-0 mt-0.5" />
                                        <div>
                                            <strong className="block text-slate-900">Constructeur</strong>
                                            {brand.groupe}
                                        </div>
                                    </li>
                                )}
                                <li className="flex items-start gap-3">
                                    <MapPin size={18} className="text-slate-500 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="block text-slate-900">Zone d&apos;intervention</strong>
                                        {site.city}{site.deptName ? ` et ${site.deptName}` : ""}
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Shield size={18} className="text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="block text-slate-900">Certifications & Garanties</strong>
                                        Conforme NF EN 3 & APSAD R4 à {site.city}
                                    </div>
                                </li>
                            </ul>
                            <a href="#devis" className="mt-6 block w-full text-center bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition">
                                Devis gratuit →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Lead Form */}
                <div id="devis" className="mt-20 pt-16 border-t border-slate-200">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-slate-900 mb-4">
                            Devis pour vos extincteurs {brand.name} à {site.city}
                        </h2>
                        <p className="text-slate-500">
                            Visite technique et chiffrage par un technicien qualifié à {site.city} et dans les communes limitrophes.
                        </p>
                    </div>
                    <LeadForm domain={site.domain} city={site.city} themeColor="red" />
                </div>
            </div>

            {/* SEO Power Components */}
            <FAQ
                themeColor="red"
                items={cityFaqs.map(f => ({ q: f.question, a: f.answer }))}
                heading={`Vos questions sur les extincteurs ${brand.name} à ${site.city}`}
            />
            <Reviews site={site} themeColor="red" />
            <InternalMesh city={site.city} config={site} />
            <LocalSources site={site} path={`/ville/${slug}/${brandSlug}`} />
            <Footer config={site} />
        </div>
    );
}
