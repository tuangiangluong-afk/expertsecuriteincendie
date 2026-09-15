export const revalidate = 86400; // 24h ISR cache
import LocalAeoSection from "@/components/LocalAeoSection";
import { getCityByCleanSlug, CITIES } from "@/lib/db";
import { getPseoContent } from "@/lib/pseo";
import { CheckCircle, Zap, TrendingDown, Home, Building2, Briefcase, Award, ArrowRight, Shield, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import Header from "@/components/Header";
import SchemaJSON from "@/components/SchemaJSON";
import Reviews from "@/components/Reviews";
import { Footer } from "@/components/Footer";
import { slugify } from "@/lib/slugify";
import { InternalMesh } from "@/components/InternalMesh";
import { VillesVoisines } from "@/components/VillesVoisines";
import { LocalFAQ } from "@/components/LocalFAQ";
import RealizationsGrid from "@/components/RealizationsGrid";
import PersonaSelector from "@/components/PersonaSelector";

// Dynamically generate for ALL cities (Owned + Partner)
export async function generateStaticParams() {
    return Object.values(CITIES).map(city => ({ slug: slugify(city.city) }));
}

// ============================================
// METADATA
// ============================================

import { headers } from "next/headers";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const site = getCityByCleanSlug(resolvedParams.slug);

    if (!site) {
        return {};
    }

    // Dynamic Meta via pSEO
    const pseo = await getPseoContent(site);

    const headersList = await headers();
    const canonicalDomain = headersList.get("x-incendie-canonical-domain") || "expertsecuriteincendie.fr";
    const canonicalUrl = `https://${canonicalDomain}/ville/${resolvedParams.slug}`;

    return {
        title: pseo.meta_title,
        description: pseo.meta_description,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                "fr-FR": canonicalUrl,
                "x-default": canonicalUrl,
            },
        },
        openGraph: {
            title: pseo.meta_title,
            description: pseo.meta_description,
            siteName: site.name,
            images: [
                {
                    url: `https://www.expertsecuriteincendie.fr/api/og?q=${resolvedParams.slug}`,
                    width: 1200,
                    height: 630,
                    alt: `maintenance matériel incendie à ${site.city}`
                }
            ],
            locale: "fr_FR",
            type: "website",
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

// ============================================
// PAGE COMPONENT
// ============================================

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const site = getCityByCleanSlug(resolvedParams.slug);

    if (!site) {
        return notFound();
    }

    // pSEO Generation
    const pseo = await getPseoContent(site);

    return (
        <div className="min-h-screen font-sans text-slate-900 bg-white">
            <Header
                isHub={true}
                city={site.city}
                phoneNumber={site.phoneNumber}
                variant="default" // Force Light Default
            />

            <SchemaJSON type="LocalBusiness" site={site} />
            <SchemaJSON 
                type="Breadcrumb" 
                site={site} 
                breadcrumbItems={[
                    { name: "Accueil", item: "https://www.expertsecuriteincendie.fr" },
                    { name: "Villes", item: "https://www.expertsecuriteincendie.fr/#villes" },
                    { name: site.city, item: `https://www.expertsecuriteincendie.fr/ville/${resolvedParams.slug}` }
                ]} 
            />
            <SchemaJSON type="FAQPage" site={site} faqSegment="B2C" />

            <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
                                <CheckCircle size={16} />
                                {pseo.hero_badge}
                            </div>
                            <h1
                                className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight"
                                dangerouslySetInnerHTML={{ __html: pseo.hero_title }}
                            />
                            <div
                                className="text-lg text-slate-600 mb-8 leading-relaxed prose prose-lg prose-red"
                                dangerouslySetInnerHTML={{ __html: pseo.intro_html }}
                            />
                            
                            {/* Local Expert Tip */}
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 flex gap-3">
                                <Award className="text-amber-500 shrink-0 mt-1" />
                                <p className="text-sm text-slate-700 italic">
                                    <strong>Conseil Expert :</strong> {pseo.expert_tip}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#simulateur"
                                    className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-red-700 transition"
                                >
                                    {pseo.cta_primary}
                                </a>
                                <a
                                    href={`tel:${site.phoneNumber}`}
                                    className="bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold text-center hover:bg-slate-200 transition"
                                >
                                    Appeler un expert
                                </a>
                            </div>
                        </div>
                        <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={site.heroImage && site.heroImage.startsWith("/") ? site.heroImage : "/images/realizations/hero-extincteur.jpg"}
                                alt={`maintenance matériel incendie ${site.city}`}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            <PersonaSelector />

            <LocalAeoSection site={site} pseo={pseo} />

            <section className="py-16 bg-slate-50 border-y border-slate-200" id="simulateur">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Votre devis gratuit en 2 min à {site.city}</h2>
                            <p className="text-slate-600">Estimation immédiate et conformité NF EN3</p>
                        </div>
                        <LeadForm
                            city={site.city}
                            domain="expertsecuriteincendie.fr"
                            themeColor="red"
                        />
                    </div>
                </div>
            </section>

            <RealizationsGrid />

            <Reviews site={site} themeColor="red" />
            <LocalFAQ site={site} segment="B2C" />
            <VillesVoisines currentCitySlug={slugify(site.city)} department={site.department || ""} cityName={site.city} />
            <InternalMesh city={site.city} config={site} />
            <Footer config={site} />
        </div>
    );
}
