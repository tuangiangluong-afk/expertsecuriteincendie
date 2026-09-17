export const revalidate = 86400; // 24h ISR cache
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { brands, rangeLabel, agentsMid } from '@/data/brands';
import { getCurrentYearSEO } from '@/lib/date';
import Link from 'next/link';
import { CheckCircle, Zap, Shield, Info, ArrowRight, Settings } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getHubConfig } from '@/lib/sites-config';
import LeadForm from '@/components/LeadForm';
import CrossLinker from '@/components/CrossLinker';

interface PageProps {
    params: Promise<{ brand: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { brand: slug } = await params;
    const brand = brands.find(b => b.slug === slug);
    const year = getCurrentYearSEO();

    if (!brand) return {};

    return {
        title: `Maintenance extincteurs ${brand.name} : prix et devis ${year}`,
        description: `Vérification et maintenance des extincteurs ${brand.name} (${brand.ranges.map(r => r.agent).join(', ')}). Contrôle annuel, recharge si nécessaire, plombage et registre de sécurité. Devis gratuit.`,
    };
}

export async function generateStaticParams() {
    return brands.map((brand) => ({
        brand: brand.slug,
    }));
}

import { headers } from 'next/headers';

export default async function BrandPage({ params, searchParams }: PageProps) {
    const { brand: slug } = await params;
    const { city: simulatedCity } = await searchParams; // Allow local testing via ?city=Lyon

    const brand = brands.find(b => b.slug === slug);

    const year = getCurrentYearSEO();

    // War Architecture: GeoIP Detection (with local override)
    const headersList = await headers();
    const vercelCity = headersList.get("x-vercel-ip-city");

    // Priority: 1. Query Param (Testing) 2. Vercel Header (Prod) 3. Null (Fallback)
    const rawCity = simulatedCity ? (simulatedCity as string) : vercelCity;
    const decodedCity = rawCity ? decodeURIComponent(rawCity) : null;

    console.log(`[BrandPage] Detected City: ${decodedCity} (Source: ${simulatedCity ? 'Query Param' : 'Header'})`);

    if (!brand) {
        console.error(`[BrandPage] Brand not found for slug: ${slug}. Available slugs: ${brands.map(b => b.slug).join(', ')}`);
        return notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />


            {/* Hero */}
            <div className="bg-slate-900 text-white pt-32 pb-20 px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-red-600/20 text-red-400 text-sm font-bold mb-4 border border-red-600/30">
                        Expert {brand.name} {year}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Maintenance extincteurs <br />
                        de marque <span className="text-red-500">{brand.name}</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Vous avez dans vos locaux des extincteurs {brand.name} à {agentsMid(brand).split(", ").join(" ou ")} ?
                        Nos techniciens qualifiés appliquent à chaque appareil le geste de vérification correspondant à son agent extincteur.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Technical Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Zap className="text-red-500" />
                                Spécifications Incendie {brand.name}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <div className="text-slate-500 text-sm mb-1">Norme & Certification</div>
                                    <div className="font-bold text-lg">NF EN 3 & APSAD</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <div className="text-slate-500 text-sm mb-1">Type de Matériel</div>
                                    <div className="font-bold text-lg">{brand.type}</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <div className="text-slate-500 text-sm mb-1">Périodicité Contrôle</div>
                                    <div className="font-bold text-lg">Annuelle (NF S 61-919)</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl">
                                    <div className="text-slate-500 text-sm mb-1">Garantie Matériel</div>
                                    <div className="font-bold text-lg">5 ans constructeur</div>
                                </div>
                            </div>
                        </div>



                        {/* Content Body */}
                        <div className="prose prose-lg text-slate-600 max-w-none">
                            <h3>Quelles gammes {brand.name} sont prises en charge ?</h3>
                            <p>
                                Nous intervenons sur {brand.ranges.length === 1 ? "un type d'appareil" : `${brand.ranges.length} types d'appareils`} de cette marque, qui ne se contrôlent pas de la même façon :
                            </p>
                            <ul>
                                {brand.ranges.map((r) => (
                                    <li key={rangeLabel(r)}>
                                        <strong>{rangeLabel(r)}</strong> — feux {r.classes}, capacités usuelles {r.capacites.join(', ')}.
                                    </li>
                                ))}
                            </ul>
                            <p>
                                L'implantation respecte le Code du travail (art. R. 4227-28 et suivants) et les règles d'implantation APSAD R4.
                            </p>

                            <h3>Que vérifie le technicien lors du passage annuel ?</h3>
                            <p>
                                Le contrôle porte d'abord sur les points communs à tout appareil : état du corps et de la tête,
                                goupille et plombage, accessibilité, signalisation, puis mise à jour du registre de sécurité.
                                S'y ajoute le contrôle propre à l'agent extincteur :
                            </p>
                            <ul>
                                {brand.ranges.map((r) => (
                                    <li key={`c-${rangeLabel(r)}`}>
                                        <strong>{r.agent} :</strong> {r.controle}.
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CROSS LINKER (War Architecture) */}
                        <CrossLinker brandName={brand.name} detectedCity={decodedCity} />

                        {/* CTA Block */}
                        <div className="bg-red-600 rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-4">Besoin d'un devis pour votre {brand.name} ?</h3>
                                <p className="text-red-100 mb-6 max-w-lg">
                                    Recevez 3 devis comparatifs de techniciens qualifiés Incendie près de chez vous.
                                </p>
                                <a href="#devis" className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-red-50 transition">
                                    Simuler mon prix
                                    <ArrowRight size={18} />
                                </a>
                            </div>
                            <div className="absolute right-0 top-0 h-full w-1/3 bg-red-500/30 transform skew-x-12 translate-x-12" />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 sticky top-24">
                            <h3 className="font-bold text-lg mb-4 text-slate-900 border-b pb-2">Gammes prises en charge</h3>
                            <ul className="space-y-3">
                                {brand.ranges.map((r) => (
                                    <li key={rangeLabel(r)} className="flex items-start gap-3 text-slate-600">
                                        <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                                        <span>{rangeLabel(r)} <span className="block text-xs text-slate-400">feux {r.classes}</span></span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <h4 className="font-bold text-sm mb-3 text-slate-900">Pourquoi nous choisir ?</h4>
                                <ul className="space-y-3 text-sm text-slate-500">
                                    <li className="flex gap-2">
                                        <Shield size={16} className="text-red-500 shrink-0" />
                                        Intervention garantie 2 ans
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle size={16} className="text-red-500 shrink-0" />
                                        Certification Incendie (Obligatoire)
                                    </li>
                                    <li className="flex gap-2">
                                        <Info size={16} className="text-red-500 shrink-0" />
                                        Support dédié {brand.name}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lead Form Section */}
                <div id="devis" className="mt-20 pt-16 border-t border-slate-200">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-slate-900 mb-4">
                            Votre Devis {brand.name} en 3 clics
                        </h2>
                        <p className="text-slate-500">
                            Sans engagement. Réponse sous 24h.
                        </p>
                    </div>
                    <LeadForm domain="expertsecuriteincendie.fr" city="National" themeColor="red" />
                </div>

            </div>

            <Footer config={getHubConfig()} />
        </div>
    );
}
