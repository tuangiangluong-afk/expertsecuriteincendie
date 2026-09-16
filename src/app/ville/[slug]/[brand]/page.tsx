export const revalidate = 86400; // 24h ISR cache
import { getCityByCleanSlug, CITIES } from "@/lib/db";
import { brands } from "@/data/brands";
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
import { CheckCircle, Zap, Shield, BatteryCharging, ArrowRight, Award } from "lucide-react";

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

    const title = `Technicien Extincteur ${brandData.name} à ${site.city}${site.postalCode ? ` (${site.postalCode})` : ''} | Devis Incendie Gratuit`;
    const description = `Maintenance certifiée Incendie pour ${brandData.name} (${brandData.models.slice(0, 3).join(', ')}) à ${site.city}. Devis gratuit, garantie 5 ans, conformité NF EN3.`;

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
                            <Zap size={14} />
                            Expert Certifié Incendie — Spécialiste {brand.name}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                            maintenance extincteur <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-teal-400">{brand.name}</span><br />
                            à {site.city}
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
                            Vos locaux sont équipés d'extincteurs {brand.models[0]}{brand.models[1] ? ` ou ${brand.models[1]}` : ''} ? Nos techniciens certifiés Incendie assurent la vérification annuelle et la remise en état de votre matériel {brand.name} à {site.city}.
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
                            <h2>La protection incendie idéale pour {brand.name} à {site.city}</h2>
                            <p>
                                Pour sécuriser efficacement vos locaux avec le matériel <strong>{brand.name}</strong>, nos techniciens certifiés NF & APSAD interviennent à <strong>{site.city}{site.postalCode ? ` (${site.postalCode})` : ''}</strong>. Nous assurons la fourniture, l&apos;installation et la vérification annuelle de vos équipements.
                            </p>

                            <h3>Gamme {brand.name} couverte</h3>
                            <ul>
                                {brand.models.map(model => (
                                    <li key={model}><strong>{brand.name} {model}</strong> — Extincteurs et dispositifs conformes NF EN3</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 sticky top-24">
                            <h3 className="font-bold text-lg mb-4 text-slate-900 border-b pb-2">Résumé de l&apos;intervention</h3>
                            <ul className="space-y-4 text-sm text-slate-600">
                                <li className="flex items-start gap-3">
                                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="block text-slate-900">Gamme prise en charge</strong>
                                        {brand.models.join(', ')}
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Shield size={18} className="text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="block text-slate-900">Certifications & Garanties</strong>
                                        Conforme NF EN3 & APSAD R4 à {site.city}
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
                            Devis maintenance extincteur {brand.name} à {site.city}
                        </h2>
                        <p className="text-slate-500">
                            Mise en relation rapide avec un technicien Incendie spécialiste {brand.name} à {site.city}.
                        </p>
                    </div>
                    <LeadForm domain={site.domain} city={site.city} themeColor="red" />
                </div>
            </div>

            {/* SEO Power Components */}
            <FAQ themeColor="red" />
            <Reviews site={site} themeColor="red" />
            <InternalMesh city={site.city} config={site} />
            <LocalSources site={site} path={`/ville/${slug}/${brandSlug}`} />
            <Footer config={site} />
        </div>
    );
}
