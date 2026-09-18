export const revalidate = 86400; // 24h ISR cache
import { getCityBySlug, getAllCitySlugs, type CityData, FRENCH_CITIES } from "@/lib/french-cities";
import { getHubConfig } from "@/lib/sites-config";
import { Phone, Zap, MapPin, Award, CheckCircle, Building2, Home, Briefcase, ArrowRight, Clock, Shield, Euro } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import Logo from "@/components/Logo";

// ============================================
// STATIC GENERATION - Pre-render all city pages
// ============================================

export async function generateStaticParams() {
    return getAllCitySlugs().map((slug) => ({ city: slug }));
}

// ============================================
// SEO METADATA
// ============================================

export async function generateMetadata({
    params,
}: {
    params: Promise<{ city: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const city = getCityBySlug(resolvedParams.city);

    if (!city) {
        return {
            title: "Maintenance extincteurs | Expert Sécurité Incendie",
        };
    }

    const title = `Maintenance extincteurs ${city.name} (${city.department}) | Devis Gratuit`;
    const description = `Maintenance d'extincteurs et mise en sécurité incendie à ${city.name}, ${city.departmentName}. Devis gratuit en 24h. Certifié APSAD. Contrôle annuel, registre de sécurité et mise en conformité. Techniciens locaux certifiés.`;

    return {
        title,
        description,
        keywords: [
            `extincteur protection ${city.name}`,
            `maintenance extincteur ${city.name}`,
            `Incendie ${city.name}`,
            `Extincteur ${city.name}`,
            `extincteur ${city.department}`,
            `technicien extincteur ${city.departmentName}`,
        ],
        openGraph: {
            title,
            description,
            url: `https://www.expertsecuriteincendie.fr/installation/${city.slug}`,
            siteName: "Expert Sécurité Incendie",
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

export default async function CitymaintenancePage({
    params,
}: {
    params: Promise<{ city: string }>;
}) {
    const resolvedParams = await params;
    const city = getCityBySlug(resolvedParams.city);
    const hub = getHubConfig();

    if (!city) {
        return notFound();
    }

    // Get nearby cities for internal linking
    const nearbyCities = FRENCH_CITIES
        .filter(c => c.region === city.region && c.slug !== city.slug)
        .slice(0, 6);

    // Dynamic content based on city wealth index
    const isPremium = (city.wealthIndex || 5) >= 8;

    return (
        <div className="min-h-screen font-sans text-slate-900 bg-white">
            {/* ============================================ */}
            {/* NAVIGATION */}
            {/* ============================================ */}
            <nav className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 py-3">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/">
                        <Logo isHub={true} size="md" variant="default" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 text-slate-600 text-sm">
                            <MapPin size={16} />
                            <span>{city.name}, {city.departmentName}</span>
                        </div>
                        <a
                            href={`tel:${hub.phoneNumber.replace(/\s/g, '')}`}
                            className="flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-green-700 transition"
                        >
                            <Phone size={16} fill="currentColor" />
                            <span className="hidden sm:inline">{hub.phoneNumber}</span>
                        </a>
                    </div>
                </div>
            </nav>

            {/* ============================================ */}
            {/* HERO - City Specific */}
            {/* ============================================ */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                        <Link href="/" className="hover:text-red-600">Accueil</Link>
                        <span>/</span>
                        <Link href="/solutions/entreprise" className="hover:text-red-600">Maintenance</Link>
                        <span>/</span>
                        <span className="text-slate-900 font-medium">{city.name}</span>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left: Content */}
                        <div>
                            {/* Trust Badge */}
                            <div className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-700 mb-6">
                                <CheckCircle size={16} className="mr-2" />
                                Techniciens certifiés APSAD R4 à {city.name}
                            </div>

                            {/* H1 */}
                            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                                Maintenance extincteurs
                                <span className="block text-red-600">à {city.name}</span>
                            </h1>

                            {/* Subtitle - Educational */}
                            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                                Vous exploitez un commerce, des bureaux ou un local professionnel à <strong className="text-slate-900">{city.name}</strong> ({city.departmentName}) ?
                                Nos techniciens certifiés <strong>APSAD R4</strong> vérifient vos extincteurs et vos blocs d&apos;éclairage de sécurité, mettent le registre de sécurité à jour et vous remettent une attestation pour votre assurance.
                            </p>

                            {/* Key Benefits */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {[
                                    { icon: Clock, label: "Devis en 24h" },
                                    { icon: Shield, label: "Norme NF EN 3 & APSAD" },
                                    { icon: Euro, label: "Dès 15 € par appareil" },
                                    { icon: Award, label: "Registre de sécurité remis" },
                                ].map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-slate-200">
                                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                            <benefit.icon className="text-red-600" size={20} />
                                        </div>
                                        <span className="font-medium text-slate-700">{benefit.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#devis"
                                    className="flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-xl hover:bg-red-700 transition"
                                >
                                    <Zap size={24} />
                                    Demander un devis gratuit
                                </a>
                                <a
                                    href={`tel:${hub.phoneNumber.replace(/\s/g, '')}`}
                                    className="flex items-center justify-center gap-3 rounded-2xl bg-white border border-slate-200 px-8 py-4 text-lg font-bold text-slate-700 hover:bg-slate-50 transition"
                                >
                                    <Phone size={20} />
                                    {hub.phoneNumber}
                                </a>
                            </div>
                        </div>

                        {/* Right: Lead Form */}
                        <div id="devis" className="scroll-mt-24">
                            <LeadForm
                                city={city.name}
                                domain="expertsecuriteincendie.fr"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* EDUCATIONAL SECTION - Why Install */}
            {/* ============================================ */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                        Pourquoi confier la maintenance à un technicien certifié à {city.name} ?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                <Euro className="text-green-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Conformité réglementaire</h3>
                            <p className="text-slate-600">
                                Les extincteurs d&apos;un local professionnel doivent être vérifiés <strong>une fois par an</strong>, et l&apos;opération doit être tracée dans le registre de sécurité.
                                À {city.name}, un appareil dont la vérification est dépassée n&apos;est plus opposable en cas de contrôle ou de sinistre.
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                                <Zap className="text-red-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Un seul passage annuel</h3>
                            <p className="text-slate-600">
                                Le même technicien vérifie les extincteurs, teste l&apos;autonomie des blocs d&apos;éclairage de sécurité, contrôle les dispositifs de désenfumage
                                et met à jour le registre de sécurité de votre établissement à {city.name}.
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                                <Award className="text-amber-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Preuve en cas de contrôle</h3>
                            <p className="text-slate-600">
                                Chaque appareil vérifié est replombé et étiqueté, et le rapport d&apos;intervention est daté.
                                À {city.name} comme ailleurs, c&apos;est cette trace écrite qui est demandée par l&apos;assureur ou la commission de sécurité.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* SERVICES SECTION */}
            {/* ============================================ */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                        Nos services à {city.name}
                    </h2>
                    <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
                        Que vous soyez propriétaire d'une maison, en copropriété ou chef d'entreprise,
                        nos techniciens certifiés à {city.name} s'adaptent à votre projet.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                icon: Home,
                                title: "Maison individuelle",
                                desc: `Vérification et maintenance d'extincteurs portatifs (eau, CO2, poudre) dans votre maison ou votre garage à ${city.name}. Intervention en 48h.`,
                                features: ["Extincteurs eau / CO2 / poudre", "Intervention 48h", "Registre de sécurité à jour"]
                            },
                            {
                                icon: Building2,
                                title: "Copropriété",
                                desc: `Solution collective ou individuelle pour les copropriétés de ${city.name}. Registre de sécurité tenu à jour.`,
                                features: ["Mise en conformité", "Contrôle annuel NF", "Étude gratuite"]
                            },
                            {
                                icon: Briefcase,
                                title: "Entreprise / ERP",
                                desc: `Audit et mise en conformité des extincteurs, du désenfumage et de l'éclairage de sécurité de vos locaux à ${city.name}. Registre de sécurité tenu à jour.`,
                                features: ["Audit de conformité", "Contrat annuel multi-sites", "Attestation pour l'assureur"]
                            },
                        ].map((service, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
                                    <service.icon className="text-red-600" size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-600 mb-6">{service.desc}</p>
                                <ul className="space-y-2">
                                    {service.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                                            <CheckCircle size={16} className="text-green-500" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* NEARBY CITIES - Internal Linking */}
            {/* ============================================ */}
            {nearbyCities.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                            Nous intervenons aussi dans la région {city.region}
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
                            {nearbyCities.map((nearbyCity, i) => (
                                <Link
                                    key={i}
                                    href={`/installation/${nearbyCity.slug}`}
                                    className="bg-slate-50 hover:bg-red-50 rounded-xl p-4 text-center border border-slate-200 hover:border-red-300 transition group"
                                >
                                    <MapPin size={20} className="mx-auto mb-2 text-slate-400 group-hover:text-red-500" />
                                    <span className="font-medium text-slate-700 group-hover:text-red-600">{nearbyCity.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ============================================ */}
            {/* CTA SECTION */}
            {/* ============================================ */}
            <section className="py-16 bg-red-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Prêt à installer votre extincteur à {city.name} ?
                    </h2>
                    <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
                        Recevez jusqu'à 3 devis gratuits de techniciens certifiés en {city.departmentName}.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#devis"
                            className="flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-red-600 shadow-xl hover:bg-red-50 transition"
                        >
                            <Zap size={24} />
                            Demander un devis
                        </a>
                        <a
                            href={`tel:${hub.phoneNumber.replace(/\s/g, '')}`}
                            className="flex items-center justify-center gap-3 rounded-2xl bg-red-700 border border-red-500 px-8 py-4 text-lg font-bold text-white hover:bg-red-800 transition"
                        >
                            <Phone size={24} />
                            {hub.phoneNumber}
                        </a>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* FOOTER */}
            {/* ============================================ */}
            <footer className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <Logo isHub={true} size="sm" variant="light" />
                        <div className="flex gap-6 text-sm text-slate-400">
                            <Link href="/home/mentions-legales" className="hover:text-white transition">Mentions légales</Link>
                            <Link href="/home/cgv" className="hover:text-white transition">CGV</Link>
                            <Link href="/politique-confidentialite" className="hover:text-white transition">Confidentialité</Link>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-sm text-slate-500">
                        © {new Date().getFullYear()} Expert Sécurité Incendie. Maintenance extincteurs {city.name}.
                    </div>
                </div>
            </footer>
        </div>
    );
}
