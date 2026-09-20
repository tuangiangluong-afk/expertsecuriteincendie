export const revalidate = 86400; // 24h ISR cache
import { getCityByCleanSlug, CITIES } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, CheckCircle, FileCheck, TrendingUp, Globe, Zap, BarChart3, Award, Shield, ArrowRight } from "lucide-react";
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
// PSEO B2B — Entreprise x Ville
// /ville/lyon/entreprise
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

import LocalSources from "@/components/LocalSources";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const site = getCityByCleanSlug(resolvedParams.slug);

    if (!site) return {};

    const b2bContent = await getPseoB2bContent(site, 'ENTREPRISE');
    // Static canonical domain (avoid headers() which forces dynamic SSR)
    const canonicalDomain = "www.expertsecuriteincendie.fr";
    const canonicalUrl = `https://${canonicalDomain}/ville/${resolvedParams.slug}/entreprise`;

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

export default async function EntrepriseCityPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const site = getCityByCleanSlug(resolvedParams.slug);

    if (!site) return notFound();

    const b2bContent = await getPseoB2bContent(site, 'ENTREPRISE');
    const cityName = site.city;
    const dept = site.department || "";
    const neighborhoods = site.neighborhoods || [];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            <SchemaJSON type="LocalBusiness" site={site} />
            <SchemaJSON type="B2BService" site={site} b2bType="Entreprise" />
            <SchemaJSON type="FAQPage" site={site} faqSegment="ENTREPRISE" />
            <SchemaJSON
                type="Breadcrumb"
                breadcrumbItems={[
                    { name: "Accueil", item: "https://www.expertsecuriteincendie.fr" },
                    { name: site.city, item: `https://www.expertsecuriteincendie.fr/ville/${resolvedParams.slug}` },
                    { name: "Entreprise", item: `https://www.expertsecuriteincendie.fr/ville/${resolvedParams.slug}/entreprise` }
                ]}
            />

            {/* ============================== */}
            {/* HERO — B2B Entreprise Tone */}
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
                                    <span className="text-emerald-700 font-bold">Entreprise</span>
                                </nav>

                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                    <div className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-800 border border-emerald-200">
                                        <Briefcase size={16} className="mr-2" />
                                        {b2bContent.hero_badge}
                                    </div>
                                    <div className="inline-flex items-center rounded-full bg-amber-100 px-4 py-1.5 text-sm font-bold text-amber-800 border border-amber-200">
                                        <FileCheck size={16} className="mr-2" />
                                        Conformité Loi
                                    </div>
                                </div>

                                <h1 
                                    className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
                                    dangerouslySetInnerHTML={{ __html: b2bContent.hero_title }}
                                />

                                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Électrifiez votre parking professionnel à {cityName} {dept ? `(${dept})` : ''}.
                                    De la PME au grand groupe, respectez la Loi, valorisez votre RSE
                                    et offrez la protection à vos collaborateurs et visiteurs.
                                </p>
                            </div>

                            {/* LEAD FORM PRO — B2B Entreprise */}
                            <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-30 text-left" id="audit">
                                <LeadForm
                                    city={cityName}
                                    domain="expertsecuriteincendie.fr"
                                />
                            </div>
                        </div>

                        {/* Right: Trust + Stats */}
                        <div className="lg:col-span-5 hidden lg:block relative w-full space-y-6">
                            <div className="relative h-[320px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/10 border border-slate-100 bg-white p-2">
                                <div className="relative w-full h-full rounded-xl overflow-hidden bg-emerald-100">
                                    <Image
                                        src="/images/realizations/hero-extincteur.jpg"
                                        alt={`Parking entreprise extincteur protection ${cityName}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-xl flex items-center gap-3">
                                            <div className="bg-emerald-100 p-2.5 rounded-full shrink-0">
                                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">Conformité Loi</div>
                                                <div className="text-sm text-slate-500">20% des places pré-équipées</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Stats B2B */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
                                    <div className="text-2xl font-black text-emerald-700">1 / 200 m²</div>
                                    <div className="text-[10px] text-slate-500 mt-1">Extincteurs exigés (Code du travail)</div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
                                    <div className="text-2xl font-black text-red-700">1 an</div>
                                    <div className="text-[10px] text-slate-500 mt-1">Périodicité de vérification</div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
                                    <div className="text-2xl font-black text-amber-600">24h</div>
                                    <div className="text-[10px] text-slate-500 mt-1">Devis remis</div>
                                </div>
                            </div>

                            {/* Sectors */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <h4 className="font-bold text-sm text-slate-900 mb-3">Secteurs que nous équipons à {cityName}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Bureaux', 'Hôtels', 'Commerces', 'Logistique', 'Collectivités', 'Santé'].map(sector => (
                                        <span key={sector} className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-100">
                                            {sector}
                                        </span>
                                    ))}
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
            {/* CONTENT — SEO B2B Entreprise */}
            {/* ============================== */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <article className="prose prose-lg prose-slate max-w-none">
                        <h2>Pourquoi installer des extincteurs en entreprise à {cityName} ?</h2>
                        <div dangerouslySetInnerHTML={{ __html: b2bContent.intro_html }} />

                        <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-xl my-8 not-prose">
                            <h4 className="text-emerald-950 font-bold mb-2 flex items-center gap-2">
                                <Briefcase className="text-emerald-700" size={20} />
                                Note Conseil Expert à {cityName}
                            </h4>
                            <p className="text-emerald-800 text-sm leading-relaxed">{b2bContent.expert_tip}</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 not-prose my-10">
                            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <FileCheck className="text-emerald-600 mb-3" size={28} />
                                <h4 className="font-bold text-slate-900 mb-2">Obligation du Code du travail</h4>
                                <p className="text-xs text-slate-600">
                                    L&apos;employeur doit maintenir les moyens de lutte contre l&apos;incendie en bon état et les faire vérifier périodiquement
                                    (art. R4227-28 à R4227-39). Le registre de sécurité en est la preuve.
                                </p>
                            </div>
                            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <TrendingUp className="text-emerald-600 mb-3" size={28} />
                                <h4 className="font-bold text-slate-900 mb-2">Coût maîtrisé, visible</h4>
                                <p className="text-xs text-slate-600">
                                    Tarif unitaire dégressif, contrat annuel et facturation détaillée par site :
                                    vous savez ce qui est vérifié, remplacé et facturé.
                                </p>
                            </div>
                            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <Globe className="text-emerald-600 mb-3" size={28} />
                                <h4 className="font-bold text-slate-900 mb-2">Exploitation sans arrêt</h4>
                                <p className="text-xs text-slate-600">
                                    Passages planifiés en dehors des heures d&apos;ouverture, réserve d&apos;appareils de remplacement
                                    pour ne jamais laisser un poste sans extincteur à {cityName}.
                                </p>
                            </div>
                        </div>

                        <h2>Quels extincteurs pour quels locaux à {cityName}</h2>
                        <p>
                            Le choix suit les classes de feu présentes dans chaque zone, et non un modèle standard appliqué partout :
                        </p>
                        <ul>
                            <li><strong>Eau pulvérisée avec additif, 6 à 9 litres :</strong> bureaux, salles de réunion, commerces, halls d&apos;accueil — feux de classe A et B.</li>
                            <li><strong>Dioxyde de carbone (CO2), 2 à 5 kg :</strong> armoires électriques, salles serveurs, locaux informatiques — aucun résidu après usage.</li>
                            <li><strong>Poudre polyvalente ABC, 6 à 9 kg :</strong> ateliers, garages, quais de chargement, zones de stockage — feux de gaz et de solides.</li>
                            <li><strong>Extincteurs sur roues 50 kg :</strong> dépôts et parkings couverts, à proximité immédiate des risques les plus lourds.</li>
                        </ul>

                        <h2>Ce que couvre le contrat annuel</h2>
                        <p>
                            Poser les appareils ne suffit pas : ce qui est contrôlé lors d&apos;une visite, c&apos;est l&apos;entretien et la traçabilité. Nos contrats pour les entreprises de {cityName} couvrent :
                        </p>
                        <ul className="list-none pl-0 space-y-2">
                            <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-green-500 shrink-0" /> <span><strong>Extincteurs :</strong> vérification mécanique du percuteur, contrôle de la charge manométrique, recharge ou remplacement si nécessaire.</span></li>
                            <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-green-500 shrink-0" /> <span><strong>Blocs d&apos;éclairage de sécurité :</strong> essai de fonctionnement et mesure de l&apos;autonomie d&apos;une heure, remplacement des accumulateurs hors service.</span></li>
                            <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-green-500 shrink-0" /> <span><strong>Désenfumage :</strong> essai semestriel des commandes, contrôle annuel des exutoires et des conduits.</span></li>
                            <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-green-500 shrink-0" /> <span><strong>Registre de sécurité :</strong> émargement à chaque passage et attestation annuelle présentable à un contrôle ou à votre assureur.</span></li>
                        </ul>

                        <h2>Ce que la maintenance n&apos;est pas</h2>
                        <p>
                            Aucun dispositif fiscal ne finance la vérification périodique obligatoire des extincteurs ou des blocs d&apos;éclairage de sécurité : elle relève de l&apos;entretien courant de l&apos;exploitation.
                            Si un prestataire vous annonce une aide, une subvention ou un crédit d&apos;impôt pour ces prestations, demandez-lui le texte qui l&apos;institue.
                        </p>

                        {neighborhoods.length > 0 && (
                            <>
                                <h2>Zones d&apos;intervention à {cityName}</h2>
                                <p>
                                    Nos techniciens interviennent à {cityName} et dans les communes limitrophes :
                                    <strong> {neighborhoods.join(', ')}</strong>. Multi-sites ? Nous déployons sur l&apos;ensemble de vos implantations.
                                </p>
                            </>
                        )}
                    </article>

                    {/* CTA bottom */}
                    <div className="mt-12 bg-emerald-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                <BarChart3 /> Projet multi-sites à {cityName} ?
                            </h3>
                            <p className="text-emerald-200">
                                Nous auditons l&apos;ensemble de vos sites en France avec un interlocuteur unique.
                                Audit technique gratuit pour les sites de plus de 10 locaux.
                            </p>
                        </div>
                        <a
                            href="#audit"
                            className="bg-white text-emerald-900 font-bold py-3 px-6 rounded-xl hover:bg-emerald-50 transition shadow-lg whitespace-nowrap flex items-center gap-2"
                        >
                            Demander l&apos;audit gratuit <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>

            <LocalFAQ site={site} />
            <VillesVoisines currentCitySlug={slugify(site.city)} department={site.department || ""} cityName={cityName} />
            <InternalMesh city={cityName} config={site} />
            <LocalSources site={site} path={`/ville/${resolvedParams.slug}/entreprise`} />
            <Footer config={site} />
        </div>
    );
}
