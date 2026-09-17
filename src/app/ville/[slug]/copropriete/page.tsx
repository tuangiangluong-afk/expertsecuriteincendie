export const revalidate = 86400; // 24h ISR cache
import { getCityByCleanSlug, CITIES } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, CheckCircle, Users, Euro, FileText, Award, Shield, ArrowRight } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { slugify } from "@/lib/slugify";
import { InternalMesh } from "@/components/InternalMesh";
import SchemaJSON from "@/components/SchemaJSON";
import { VillesVoisines } from "@/components/VillesVoisines";
import { LocalFAQ } from "@/components/LocalFAQ";

import { getPseoB2bContent } from "@/lib/pseo-b2b";

// ========================================
// PSEO B2B — Copropriété x Ville
// /ville/lyon/copropriete
// ========================================

export async function generateStaticParams() {
    const uniqueCities = new Map<string, boolean>();
    return Object.values(CITIES)
        .filter(city => {
            const slug = slugify(city.city);
            if (uniqueCities.has(slug)) return false;
            uniqueCities.set(slug, true);
            return city.slug !== 'home';
        })
        .map(city => ({ slug: slugify(city.city) }));
}

import { headers } from "next/headers";
import LocalSources from "@/components/LocalSources";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const site = getCityByCleanSlug(resolvedParams.slug);

    if (!site) return {};

    const b2bContent = await getPseoB2bContent(site, 'COPRO');
    const headersList = await headers();
    const canonicalDomain = headersList.get("x-incendie-canonical-domain") || "expertsecuriteincendie.fr";
    const canonicalUrl = `https://${canonicalDomain}/ville/${resolvedParams.slug}/copropriete`;

    return {
        title: b2bContent.meta_title,
        description: b2bContent.meta_description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: b2bContent.meta_title,
            description: b2bContent.meta_description,
            siteName: "Expert Sécurité Incendie",
            locale: "fr_FR",
            type: "website",
        },
        robots: { index: true, follow: true },
    };
}

export default async function CoproCityPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const site = getCityByCleanSlug(resolvedParams.slug);

    if (!site) return notFound();

    const b2bContent = await getPseoB2bContent(site, 'COPRO');
    const cityName = site.city;
    const dept = site.department || "";
    const neighborhoods = site.neighborhoods || [];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            <SchemaJSON type="LocalBusiness" site={site} />
            <SchemaJSON type="B2BService" site={site} b2bType="Copropriété" />
            <SchemaJSON type="FAQPage" site={site} faqSegment="COPRO" />
            <SchemaJSON
                type="Breadcrumb"
                breadcrumbItems={[
                    { name: "Accueil", item: "https://www.expertsecuriteincendie.fr" },
                    { name: site.city, item: `https://www.expertsecuriteincendie.fr/ville/${resolvedParams.slug}` },
                    { name: "Copropriété", item: `https://www.expertsecuriteincendie.fr/ville/${resolvedParams.slug}/copropriete` }
                ]}
            />

            {/* ============================== */}
            {/* HERO — B2B Copropriété Tone */}
            {/* ============================== */}
            <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-28 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">

                        {/* Left: Content + Form */}
                        <div className="lg:col-span-7 flex flex-col gap-8">
                            <div className="text-center lg:text-left space-y-6">
                                {/* Breadcrumb */}
                                <nav className="flex items-center gap-2 text-sm text-slate-500 justify-center lg:justify-start">
                                    <Link href="/" className="hover:text-red-600 transition">Accueil</Link>
                                    <span>/</span>
                                    <Link href={`/ville/${resolvedParams.slug}`} className="hover:text-red-600 transition">{cityName}</Link>
                                    <span>/</span>
                                    <span className="text-purple-700 font-bold">Copropriété</span>
                                </nav>

                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                    <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-1.5 text-sm font-bold text-purple-800 border border-purple-200">
                                        <Building2 size={16} className="mr-2" />
                                        {b2bContent.hero_badge}
                                    </div>
                                    <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-sm font-bold text-green-800 border border-green-200">
                                        <Euro size={16} className="mr-2" />
                                        Devis sous 24h
                                    </div>
                                </div>

                                <h1 
                                    className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
                                    dangerouslySetInnerHTML={{ __html: b2bContent.hero_title }}
                                />

                                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Mettez en conformité les extincteurs, l&apos;éclairage de sécurité et le désenfumage des parties communes à {cityName} {dept ? `(${dept})` : ''}.
                                    État des lieux écrit, chiffrage détaillé et registre de sécurité de l&apos;immeuble tenu par nos techniciens agréés APSAD.
                                </p>
                            </div>

                            {/* LEAD FORM PRO — B2B Copro */}
                            <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-30 text-left" id="etude">
                                <LeadForm
                                    city={cityName}
                                    domain="expertsecuriteincendie.fr"
                                />
                            </div>
                        </div>

                        {/* Right: Trust + Stats */}
                        <div className="lg:col-span-5 hidden lg:block relative w-full space-y-6">
                            <div className="relative h-[320px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/10 border border-slate-100 bg-white p-2">
                                <div className="relative w-full h-full rounded-xl overflow-hidden bg-purple-100">
                                    <Image
                                        src="/images/realizations/hero-extincteur.jpg"
                                        alt={`Copropriété extincteur protection ${cityName}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-xl flex items-center gap-3">
                                            <div className="bg-purple-100 p-2.5 rounded-full shrink-0">
                                                <CheckCircle className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">Registre de sécurité remis</div>
                                                <div className="text-sm text-slate-500">Présentable en assemblée générale</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Stats B2B */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
                                    <div className="text-3xl font-black text-purple-700">1&nbsp;an</div>
                                    <div className="text-xs text-slate-500 mt-1">Périodicité des extincteurs</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
                                    <div className="text-3xl font-black text-green-700">1&nbsp;h</div>
                                    <div className="text-xs text-slate-500 mt-1">Autonomie minimale des BAES</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
                                    <div className="text-3xl font-black text-red-700">24h</div>
                                    <div className="text-xs text-slate-500 mt-1">Réponse au devis</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
                                    <div className="text-3xl font-black text-amber-600">1986</div>
                                    <div className="text-xs text-slate-500 mt-1">Arrêté immeubles d&apos;habitation</div>
                                </div>
                            </div>

                            {/* Trust badges */}
                            <div className="flex flex-wrap items-center gap-3 justify-center">
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
                                    <Award size={20} className="text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-slate-900 text-sm">APSAD Incendie</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
                                    <Shield size={20} className="text-green-500" />
                                    <span className="font-bold text-slate-900 text-sm">NF EN 3 & APSAD R4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================== */}
            {/* CONTENT — SEO B2B Copro */}
            {/* ============================== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <article className="prose prose-lg prose-slate max-w-none">
                        <h2>Pourquoi installer des extincteurs en copropriété à {cityName} ?</h2>
                        <div dangerouslySetInnerHTML={{ __html: b2bContent.intro_html }} />

                        <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-xl my-8 not-prose">
                            <h4 className="text-purple-950 font-bold mb-2 flex items-center gap-2">
                                <Building2 className="text-purple-700" size={20} />
                                Note Conseil Syndic à {cityName}
                            </h4>
                            <p className="text-purple-800 text-sm leading-relaxed">{b2bContent.expert_tip}</p>
                        </div>

                        <div className="not-prose grid md:grid-cols-2 gap-6 my-10">
                            <div className="border-2 border-purple-200 bg-purple-50/30 rounded-2xl p-6 shadow-sm">
                                <h3 className="font-bold text-xl mb-3 flex items-center gap-2 text-purple-800">
                                    <Building2 className="text-purple-600" /> Contrat collectif sur parties communes
                                </h3>
                                <p className="text-sm text-slate-600 mb-4">
                                    Un seul contrat couvre l&apos;ensemble des extincteurs, blocs d&apos;éclairage de sécurité et dispositifs de désenfumage des parties communes de l&apos;immeuble.
                                </p>
                                <ul className="text-sm space-y-2">
                                    <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Une visite annuelle unique pour tout l&apos;immeuble</li>
                                    <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Registre de sécurité de l&apos;immeuble tenu par le prestataire</li>
                                    <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Attestation annuelle remise au syndic et à l&apos;assureur</li>
                                    <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Tarif dégressif au-delà de 20 appareils</li>
                                </ul>
                            </div>
                            <div className="border border-slate-200 rounded-2xl p-6">
                                <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                                    <Users className="text-red-500" /> Interventions au coup par coup
                                </h3>
                                <p className="text-sm text-slate-600 mb-4">
                                    Chaque copropriétaire fait vérifier séparément l&apos;appareil dont il a la charge, sans contrat global.
                                </p>
                                <ul className="text-sm space-y-2">
                                    <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Souple pour un besoin isolé</li>
                                    <li className="text-red-500 flex gap-2"><span className="shrink-0">⚠️</span> Historique de vérification difficile à reconstituer</li>
                                    <li className="text-red-500 flex gap-2"><span className="shrink-0">⚠️</span> Tarif unitaire plus élevé et registre incomplet</li>
                                </ul>
                            </div>
                        </div>

                        <h2>Ce que la copropriété doit réellement entretenir à {cityName}</h2>
                        <p>
                            Dans un immeuble d&apos;habitation collectif, l&apos;arrêté du 31 janvier 1986 impose au syndicat de maintenir en état les moyens de secours des parties communes :
                            les <strong>extincteurs</strong> (vérification annuelle, règle APSAD R4 et NF EN 3), les <strong>blocs autonomes d&apos;éclairage de sécurité</strong> des circulations et cages d&apos;escalier
                            (essai mensuel de fonctionnement suivi par l&apos;exploitant, essai annuel d&apos;autonomie par un prestataire, NF C 71-820), le <strong>désenfumage</strong> des circulations et
                            éventuels parcs de stationnement couverts (vérification semestrielle des commandes, annuelle de l&apos;installation), ainsi que les <strong>portes coupe-feu</strong> et les consignes affichées.
                            L&apos;ensemble de ces passages doit être consigné dans le <strong>registre de sécurité de l&apos;immeuble</strong>.
                        </p>
                        <blockquote>
                            &ldquo;Le registre de sécurité est la première pièce demandée lors d&apos;un contrôle de la commission de sécurité ou d&apos;une vente de lot. L&apos;alimenter à chaque passage coûte moins cher que de le reconstituer après coup.&rdquo;
                        </blockquote>

                        <h2>Budget de conformité constaté à {cityName} {dept ? `(${dept})` : ''}</h2>
                        <div className="not-prose">
                            <table className="min-w-full bg-white border border-slate-200 rounded-lg shadow-sm">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Prestation</th>
                                        <th className="px-4 py-3 text-left">Coût indicatif HT</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr>
                                        <td className="px-4 py-3">Vérification annuelle des extincteurs (parties communes)</td>
                                        <td className="px-4 py-3 font-bold text-purple-700">15 € à 30 € par appareil</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3">Vérification annuelle des blocs d&apos;éclairage de sécurité</td>
                                        <td className="px-4 py-3 font-bold text-purple-700">15 € à 30 € par bloc</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3">Remplacement d&apos;un extincteur hors d&apos;usage</td>
                                        <td className="px-4 py-3 font-bold text-purple-700">89 € à 149 € (6 L eau + support)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3">Audit écrit présentable en assemblée générale</td>
                                        <td className="px-4 py-3 font-bold text-purple-700">250 € à 600 €</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="text-xs text-slate-500 mt-3">
                                Ces montants sont des fourchettes constatées ; les travaux de conformité obligatoires relèvent de l&apos;entretien de l&apos;immeuble et ne donnent pas lieu aux aides fiscales annoncées pour d&apos;autres équipements.
                            </p>
                        </div>

                        <h2>Comment se passe l&apos;AG pour les copropriétés à {cityName} ?</h2>
                        <p>
                            Notre technicien local à {cityName} vous accompagne de A à Z :
                        </p>
                        <ol>
                            <li><strong>Visite technique gratuite</strong> des parties communes et des parkings de la copropriété.</li>
                            <li><strong>État des lieux écrit</strong> remis au syndic : appareils présents, dates de vérification, manques et réserves.</li>
                            <li><strong>Chiffrage détaillé</strong> distinguant les obligations réglementaires des améliorations facultatives.</li>
                            <li><strong>Vote en assemblée générale</strong> selon la nature des travaux : entretien et mise en conformité (art. 24) ou amélioration de l&apos;immeuble (art. 25 et suivants).</li>
                        </ol>

                        {neighborhoods.length > 0 && (
                            <>
                                <h2>Zones d&apos;intervention à {cityName}</h2>
                                <p>
                                    Nos techniciens certifiés interviennent à {cityName} et dans les communes limitrophes,
                                    notamment : <strong>{neighborhoods.join(', ')}</strong>.
                                </p>
                            </>
                        )}
                    </article>

                    {/* CTA bottom */}
                    <div className="mt-12 bg-purple-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                <FileText /> Syndic à {cityName} ?
                            </h3>
                            <p className="text-purple-200">
                                Obtenez une étude de faisabilité gratuite pour l&apos;infrastructure collective de votre copropriété.
                                Dossier AG clé en main inclus.
                            </p>
                        </div>
                        <a
                            href="#etude"
                            className="bg-white text-purple-900 font-bold py-3 px-6 rounded-xl hover:bg-purple-50 transition shadow-lg whitespace-nowrap flex items-center gap-2"
                        >
                            Demander l&apos;étude gratuite <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>

            <LocalFAQ site={site} />
            <VillesVoisines currentCitySlug={slugify(site.city)} department={site.department || ""} cityName={cityName} />
            <InternalMesh city={cityName} config={site} />
            <LocalSources site={site} path={`/ville/${resolvedParams.slug}/copropriete`} />
            <Footer config={site} />
        </div>
    );
}
