export const revalidate = 86400; // 24h ISR cache
import { Briefcase, BarChart3, TrendingUp, ShieldCheck, Zap, Globe, FileCheck, CheckCircle, Award } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import Image from "next/image";
import RegulatoryServicesLinks from "@/components/RegulatoryServicesLinks";

export const metadata = {
    title: "Sécurité incendie en entreprise : extincteurs, BAES et désenfumage",
    description: "Audit et maintenance des extincteurs, blocs d'éclairage de sécurité et dispositifs de désenfumage de vos locaux. Contrat annuel multi-sites, registre de sécurité et attestation pour l'assureur.",
};

export default function SolutionEntreprise() {
    const hub = getHubConfig();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            {/* HERO (Updated Design) */}
            <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">

                        {/* Left: Content + Lead Form */}
                        <div className="lg:col-span-7 flex flex-col gap-8">
                            <div className="text-center lg:text-left space-y-6">
                                <div className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-800 border border-emerald-200 mx-auto lg:mx-0">
                                    <Briefcase size={16} className="mr-2" />
                                    Entreprises, ERP & sites multi-sites
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                                    Conformité incendie de vos locaux, <span className="text-emerald-600">sans mauvaise surprise</span>
                                </h1>
                                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    De la PME au groupe multi-sites, nous auditons, installons et maintenons les extincteurs,
                                    blocs d&apos;éclairage de sécurité et dispositifs de désenfumage, avec un registre de sécurité tenu à jour.
                                </p>
                            </div>

                            {/* LEAD FORM - Integrated Here */}
                            <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-30 text-left">
                                <div id="simulateur" className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 overflow-hidden border border-slate-200">
                                    <div className="p-1 bg-gradient-to-r from-emerald-600 to-emerald-500"></div>
                                    <div className="p-6 md:p-8">
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-emerald-900">Devis entreprise / multi-sites</h3>
                                            <p className="text-sm text-slate-500">Réponse sous 24h ouvrées</p>
                                        </div>
                                        <LeadForm city="France" domain="expertsecuriteincendie.fr" themeColor="emerald" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Large Hero Image + Trust Badges */}
                        <div className="lg:col-span-5 hidden lg:block relative w-full">
                            <div className="relative h-[640px] w-full mb-8">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-100 bg-white p-2">
                                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-emerald-100">
                                        <Image
                                            src="/images/realizations/hero-extincteur.jpg"
                                            alt="Parking Entreprise matériel incendie"
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority
                                        />
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                                        {/* Image Caption/Badge */}
                                        <div className="absolute bottom-8 left-8 right-8 z-20">
                                            <div className="bg-white/95 backdrop-blur rounded-xl p-5 shadow-xl border border-white/50 flex items-center gap-4 cursor-default">
                                                <div className="bg-emerald-100 p-3 rounded-full shrink-0">
                                                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-lg text-slate-900">Registre de sécurité</div>
                                                    <div className="text-sm font-medium text-slate-500">Contrôle annuel tracé</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Elements relocated - Right Column */}
                            <div className="flex flex-wrap items-center gap-4 justify-center px-4">
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <Award size={24} className="text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-slate-900 text-base">APSAD Incendie</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <CheckCircle size={24} className="text-green-500 fill-green-100" />
                                    <span className="font-bold text-slate-900 text-base">NF EN 3 & APSAD R4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <div className="container mx-auto px-4 py-16 grid lg:grid-cols-[1fr_350px] gap-12">
                <article className="prose prose-lg prose-slate max-w-none">
                    <h2>Pourquoi faire auditer la sécurité incendie de son entreprise ?</h2>
                    <p>
                        Ce n'est pas une démarche d'image : c'est une obligation. L'employeur doit maintenir en bon état de fonctionnement les moyens de lutte contre l'incendie et les faire vérifier périodiquement
                        (articles R4227-28 à R4227-39 du Code du travail). Les locaux recevant du public relèvent en plus du règlement de sécurité contre les risques d'incendie et de panique,
                        dont les dispositions générales sont fixées par l'arrêté du 25 juin 1980.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 not-prose my-8">
                        <div className="p-4 bg-slate-100 rounded-xl">
                            <FileCheck className="text-emerald-600 mb-3" size={28} />
                            <h4 className="font-bold text-slate-900 mb-2">Obligation légale</h4>
                            <p className="text-xs text-slate-600">Vérification annuelle des extincteurs et traçabilité de chaque passage dans le registre de sécurité de l&apos;établissement.</p>
                        </div>
                        <div className="p-4 bg-slate-100 rounded-xl">
                            <TrendingUp className="text-emerald-600 mb-3" size={28} />
                            <h4 className="font-bold text-slate-900 mb-2">Coût maîtrisé</h4>
                            <p className="text-xs text-slate-600">Un contrat annuel évite les interventions d&apos;urgence et remplace les appareils hors d&apos;usage au bon moment plutôt qu&apos;après une mise en demeure.</p>
                        </div>
                        <div className="p-4 bg-slate-100 rounded-xl">
                            <Globe className="text-emerald-600 mb-3" size={28} />
                            <h4 className="font-bold text-slate-900 mb-2">Couverture assureur</h4>
                            <p className="text-xs text-slate-600">L&apos;attestation de vérification et le registre à jour sont les pièces demandées par votre assureur après un sinistre.</p>
                        </div>
                    </div>

                    <h2>Quels extincteurs pour quels locaux ?</h2>
                    <p>
                        Le choix suit les classes de feu réellement présentes dans chaque zone, et non un modèle standard appliqué partout.
                        La règle de base du Code du travail est d&apos;un extincteur à eau pulvérisée de 6 litres pour 200 m² de plancher, avec au moins un appareil par niveau ;
                        les locaux à risques particuliers se traitent ensuite au cas par cas.
                    </p>
                    <ul>
                        <li><strong>Eau pulvérisée avec additif, 6 à 9 litres :</strong> bureaux, salles de réunion, commerces — feux de classe A et B.</li>
                        <li><strong>Dioxyde de carbone (CO2), 2 à 5 kg :</strong> armoires électriques, salles serveurs, laboratoires — aucun résidu après usage.</li>
                        <li><strong>Poudre polyvalente ABC, 6 à 9 kg :</strong> ateliers, garages, zones de stockage — feux de gaz et de solides.</li>
                        <li><strong>Extincteurs sur roues 50 kg :</strong> dépôts, quais de chargement, parkings couverts, à proximité des risques les plus lourds.</li>
                    </ul>

                    <h2>Ce que couvre le contrat annuel</h2>
                    <p>
                        Poser les appareils n&apos;est que la première étape : ce qui est contrôlé lors d&apos;une visite, c&apos;est l&apos;entretien et la traçabilité.
                        Notre contrat annuel comprend :
                    </p>
                    <ul className="list-none pl-0 space-y-2">
                        <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-green-500" /> <strong>Vérification mécanique :</strong> percuteur, goupille, joint, charge manométrique et état du corps de bouteille.</li>
                        <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-green-500" /> <strong>Blocs d&apos;éclairage de sécurité :</strong> essai de fonctionnement et mesure de l&apos;autonomie (une heure minimale), remplacement des accumulateurs hors service.</li>
                        <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-green-500" /> <strong>Désenfumage :</strong> essai des commandes et des ouvrants, contrôle des exutoires et des conduits.</li>
                        <li className="flex gap-2 items-center"><CheckCircle size={18} className="text-green-500" /> <strong>Registre de sécurité :</strong> émargement à chaque passage, plombage des appareils vérifiés et attestation annuelle remise à l&apos;exploitant.</li>
                    </ul>

                    <h2>Ce que la maintenance n&apos;est pas</h2>
                    <p>
                        Aucun dispositif fiscal ne finance la vérification périodique obligatoire des extincteurs ou des blocs d&apos;éclairage de sécurité : la conformité incendie relève de l&apos;entretien courant de l&apos;exploitation.
                        Si un prestataire vous annonce une subvention ou un crédit d&apos;impôt pour ces prestations, demandez-lui le texte qui l&apos;institue.
                    </p>

                    <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl not-prose">
                        <h3 className="text-emerald-900 font-bold text-lg mb-2">Offre multi-sites</h3>
                        <p className="text-emerald-800 text-sm mb-4">
                            Pour les exploitants qui gèrent plusieurs établissements en France :
                        </p>
                        <ul className="space-y-2 text-sm text-emerald-800">
                            <li>1. Un interlocuteur unique et un calendrier de visites groupées par zone géographique.</li>
                            <li>2. Un référentiel d&apos;équipements identique d&apos;un site à l&apos;autre, pour comparer et budgéter.</li>
                            <li>3. Un registre de sécurité par établissement, exportable pour votre service HSE et votre assureur.</li>
                        </ul>
                    </div>

                </article>

                <div className="hidden lg:block space-y-6 sticky top-24 h-fit">
                    <div className="bg-white border-2 border-emerald-500 rounded-xl p-6 shadow-lg">
                        <h4 className="font-bold text-emerald-900 mb-4 text-center text-lg">Un projet multi-sites ?</h4>
                        <p className="text-sm text-slate-600 mb-6 text-center">
                            Nous intervenons sur l&apos;ensemble de vos établissements en France, avec un interlocuteur unique et un référentiel d&apos;équipements commun.
                        </p>
                        <div className="flex flex-col gap-3">
                            <a href="#simulateur" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg text-center hover:bg-emerald-700 transition">
                                Demander un audit
                            </a>
                            <p className="text-xs text-center text-slate-400">Réponse sous 24h ouvrées</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h5 className="font-bold mb-3">Secteurs couverts</h5>
                        <p className="text-xs text-slate-500 mb-4">
                            Des PME aux sites industriels, nous maintenons les moyens de secours de tous les types de locaux professionnels.
                        </p>
                        {/* Logos placeholder using text for simplicity */}
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-white px-2 py-1 border rounded text-xs font-bold text-slate-400">Hôtels</span>
                            <span className="bg-white px-2 py-1 border rounded text-xs font-bold text-slate-400">Bureaux</span>
                            <span className="bg-white px-2 py-1 border rounded text-xs font-bold text-slate-400">Commerces</span>
                            <span className="bg-white px-2 py-1 border rounded text-xs font-bold text-slate-400">Logistique</span>
                        </div>
                    </div>
                </div>
            </div>

            <RegulatoryServicesLinks />
            <Footer config={hub} />
        </div>
    );
}
