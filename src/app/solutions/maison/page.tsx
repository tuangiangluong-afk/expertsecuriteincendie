export const revalidate = 86400; // 24h ISR cache
import { Zap, CheckCircle, HelpCircle, TrendingDown, Shield, Clock, Info, Battery, Plug, Euro, Award } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import Image from "next/image";

export const metadata = {
    title: "Sécurité Incendie Maison : Détecteurs & Extincteurs | Guide 2026",
    description: "Tout savoir sur l'maintenance d'une Extincteur en maison individuelle. Prix, Crédit d'Impôt, Puissance (7kg vs 22kg), et comparatif des meilleures extincteurs.",
};

export default function SolutionMaison() {
    const hub = getHubConfig();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header isHub={true} variant="default" />

            {/* HERO SECTION - CONTENT FOCUSED */}
            {/* HERO SECTION - CONTENT FOCUSED (Updated Design) */}
            <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">

                        {/* Left: Content + Lead Form */}
                        <div className="lg:col-span-7 flex flex-col gap-8">
                            <div className="text-center lg:text-left space-y-6">
                                <div className="inline-flex items-center rounded-full bg-red-100 px-4 py-1.5 text-sm font-bold text-red-800 border border-red-200 mx-auto lg:mx-0">
                                    <Zap size={16} className="mr-2" />
                                    Guide Complet 2026
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                                    Installer une matériel incendie en <span className="text-red-600">maison individuelle</span>
                                </h1>
                                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Finies les protections lentes. Passez à la sécurité maximale avec une Extincteur sécurisée.
                                    Ce guide vous explique tout : choix du matériel, aides de l'État et coût d'maintenance.
                                </p>
                                <div className="flex items-center gap-4 text-sm font-medium text-slate-500 justify-center lg:justify-start">
                                    <span className="flex items-center gap-1"><Clock size={16} /> Lecture : 8 min</span>
                                    <span className="flex items-center gap-1"><CheckCircle size={16} className="text-green-500" /> Mis à jour Janvier 2026</span>
                                </div>
                            </div>

                            {/* LEAD FORM - Integrated Here */}
                            <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-30 text-left">
                                <div id="simulateur" className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 overflow-hidden border border-slate-200">
                                    <div className="p-1 bg-gradient-to-r from-red-600 to-red-500"></div>
                                    <div className="p-6 md:p-8">
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-slate-900">Testez votre éligibilité</h3>
                                            <p className="text-sm text-slate-500">Réponse immédiate • Gratuit • Sans engagement</p>
                                        </div>
                                        <LeadForm city="France" domain="expertsecuriteincendie.fr" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Large Hero Image + Trust Badges */}
                        <div className="lg:col-span-5 hidden lg:block relative w-full">
                            <div className="relative h-[640px] w-full mb-8">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-100 bg-white p-2">
                                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                                        <Image
                                            src={hub.heroImage}
                                            alt="matériel incendie maison"
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
                                                <div className="bg-green-100 p-3 rounded-full shrink-0">
                                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-lg text-slate-900">maintenance Conforme</div>
                                                    <div className="text-sm font-medium text-slate-500">Norme NF EN 3 garantie</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Elements relocated - Right Column */}
                            <div className="flex flex-wrap items-center gap-4 justify-center px-4">
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    {/* Using Award/CheckCircle icons from lucide-react which are imported */}
                                    <Award size={24} className="text-yellow-500 fill-yellow-500" />
                                    <span className="font-bold text-slate-900 text-base">APSAD</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <Award size={24} className="text-red-500 fill-blue-500" />
                                    <span className="font-bold text-slate-900 text-base">NF EN3</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 duration-300">
                                    <CheckCircle size={24} className="text-green-500 fill-green-100" />
                                    <span className="font-bold text-slate-900 text-base">Garantie décennale</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT BODY */}
            <div className="container mx-auto px-4 py-16 grid lg:grid-cols-[1fr_350px] gap-12">

                {/* LEFT COLUMN: EDUCATIONAL CONTENT */}
                <article className="prose prose-lg prose-slate max-w-none">
                    <h2>Pourquoi protéger votre maison contre l'incendie ?</h2>
                    <p>
                        En France, un incendie d'habitation se déclare toutes les <strong>2 minutes</strong>. La loi impose depuis 2015 l'installation d'un <strong>détecteur de fumée (DAAF)</strong> dans chaque logement, et l'extincteur domestique est fortement recommandé : un départ de feu éteint dans les premières secondes reste un incident, au-delà il devient un sinistre.
                        Équiper sa maison d'un extincteur adapté et entretenu, c'est protéger sa famille, ses biens et bénéficier d'une réduction sur sa prime d'assurance habitation.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                            <h4 className="flex items-center gap-2 font-bold text-green-800 mb-3">
                                <TrendingDown size={20} /> Économies
                            </h4>
                            <p className="text-sm text-green-900">
                                Un extincteur domestique coûte <strong>25€ à 80€</strong> et un contrôle annuel <strong>40€ à 90€</strong>. En comparaison, le coût moyen d'un incendie d'habitation dépasse <strong>30 000€</strong> de dommages. La prévention reste l'investissement le plus rentable.
                            </p>
                        </div>
                        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                            <h4 className="flex items-center gap-2 font-bold text-red-800 mb-3">
                                <Shield size={20} /> Sécurité
                            </h4>
                            <p className="text-sm text-red-900">
                                Le détecteur de fumée donne l'alerte, l'extincteur éteint le départ de feu : ensemble, ils vous laissent <strong>moins de 2 minutes</strong> pour agir avant que le feu ne devienne incontrôlable. Chaque seconde compte.
                            </p>
                        </div>
                    </div>

                    <h2>1. Détecteur de fumée ou extincteur : que choisir ?</h2>
                    <p>
                        Ce n'est pas un choix : les deux équipements sont complémentaires. Le <strong>détecteur de fumée (DAAF)</strong> est obligatoire dans chaque logement (loi du 9 mars 2010, en vigueur depuis 2015). L'<strong>extincteur domestique</strong> est la seule protection qui permet d'éteindre un départ de feu avant l'arrivée des secours.
                    </p>

                    <div className="not-prose overflow-x-auto">
                        <table className="min-w-full bg-white border border-slate-200 rounded-lg shadow-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-left font-bold text-slate-700">Équipement</th>
                                    <th className="px-6 py-4 text-left font-bold text-slate-700">Rôle</th>
                                    <th className="px-6 py-4 text-left font-bold text-slate-700">Prix moyen</th>
                                    <th className="px-6 py-4 text-left font-bold text-slate-700">Recommandation</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="px-6 py-4 font-medium">Détecteur de fumée (DAAF)</td>
                                    <td className="px-6 py-4 text-slate-600">Détecte la fumée et alerte</td>
                                    <td className="px-6 py-4 text-slate-600">15€ à 30€</td>
                                    <td className="px-6 py-4 text-slate-600"><strong>Obligatoire</strong> (1 par niveau)</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium">Extincteur eau 6L (NF EN3)</td>
                                    <td className="px-6 py-4 text-slate-600">Éteint feux secs (bois, tissus, papier)</td>
                                    <td className="px-6 py-4 text-slate-600">25€ à 60€</td>
                                    <td className="px-6 py-4 text-slate-600">Le standard idéal pour la maison</td>
                                </tr>
                                <tr className="bg-red-50/50">
                                    <td className="px-6 py-4 font-bold text-red-700">Extincteur poudre ABC 6kg</td>
                                    <td className="px-6 py-4 text-slate-600">Polyvalent : feux A, B et C</td>
                                    <td className="px-6 py-4 text-slate-600">30€ à 70€</td>
                                    <td className="px-6 py-4 text-slate-600"><strong>Idéal garage & cuisine</strong></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium">Couverture anti-feu</td>
                                    <td className="px-6 py-4 text-slate-600">Étouffe les feux de friteuse, casserole</td>
                                    <td className="px-6 py-4 text-slate-600">10€ à 25€</td>
                                    <td className="px-6 py-4 text-slate-600">Indispensable en cuisine</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Quel extincteur choisir pour la maison ?</h3>
                    <p>
                        Pour 90% des maisons, l'<strong>extincteur eau 6L avec additif</strong> (classe A : bois, papier, tissus) est le choix roi, complété par un <strong>extincteur CO2</strong> en cuisine pour les feux gras et électriques.
                        Un extincteur poudre ABC polyvalent reste la meilleure option pour le garage. Notre audit gratuit vous recommande l'équipement adapté à chaque pièce.
                    </p>

                    <h2>2. Combien coûte la protection incendie d'une maison ?</h2>
                    <p>
                        Voici une estimation moyenne constatée en 2026, fourniture et pose par un technicien certifié :
                    </p>
                    <ul>
                        <li><strong>Détecteurs de fumée (DAAF) :</strong> 30€ à 90€ pour une maison (2 à 3 détecteurs installés)</li>
                        <li><strong>Extincteur domestique :</strong> 40€ à 120€ selon le type (eau, poudre, CO2)</li>
                        <li><strong>Contrôle annuel + maintenance :</strong> 40€ à 90€ par extincteur</li>
                        <li><strong>Total pour une maison équipée :</strong> Entre 100€ et 300€ TTC, puis moins de 100€ par an d'entretien.</li>
                    </ul>

                    <div className="my-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl not-prose">
                        <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                            <Euro size={20} /> Aides et fiscalité 2026
                        </h4>
                        <p className="text-yellow-900 mb-2">
                            Pour les particuliers : pas d'aide d'État dédiée à l'équipement, mais deux leviers réels :
                        </p>
                        <ul className="list-disc pl-5 text-sm text-yellow-900 space-y-1">
                            <li><strong>TVA réduite à 5,5%</strong> sur les travaux de mise en sécurité réalisés par un professionnel dans un logement de plus de 2 ans.</li>
                            <li><strong>Réduction d'assurance :</strong> la plupart des contrats habitation offrent -5% à -10% pour un logement équipé (détecteurs + extincteur).</li>
                        </ul>
                        <p className="text-xs mt-3 text-yellow-800 italic">
                            *Pour les professionnels et copropriétés : l'équipement de sécurité incendie est une charge déductible.
                        </p>
                    </div>

                    <div className="not-prose my-12">
                        <h3 className="font-bold text-2xl text-slate-900 mb-6 text-center">Les marques que nous installons</h3>
                        <p className="text-center text-slate-600 mb-8 max-w-xl mx-auto">
                            Nous ne travaillons qu'avec les leaders français de la protection incendie, certifiés NF EN3 et NF Service.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: "Desautel", color: "bg-slate-900 text-white" },
                                { name: "Sicli", color: "bg-green-600 text-white" },
                                { name: "Andrieu", color: "bg-red-600 text-white" },
                                { name: "Eurofeu", color: "bg-green-700 text-white" }
                            ].map((brand, i) => (
                                <div key={i} className={`h-16 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm ${brand.color}`}>
                                    {brand.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    <h2>3. Les étapes de la mise en sécurité</h2>
                    <ol>
                        <li>
                            <strong>Audit de votre logement :</strong> notre technicien identifie les risques (cuisine, garage, tableau électrique, cheminée) et vérifie les équipements existants.
                        </li>
                        <li>
                            <strong>Choix des équipements :</strong> détecteurs DAAF, extincteurs adaptés à chaque pièce, couvertures anti-feu en cuisine.
                        </li>
                        <li>
                            <strong>Pose et mise en service :</strong> installation conforme, test de fonctionnement, formation aux gestes qui sauvent (utilisation d'un extincteur).
                        </li>
                        <li>
                            <strong>Suivi annuel :</strong> contrôle périodique des extincteurs, remplacement des piles des détecteurs et mise à jour de votre registre de sécurité.
                        </li>
                    </ol>

                    <h2>FAQ : Questions fréquentes</h2>
                    <div className="not-prose space-y-4">
                        {[
                            {
                                q: "L'extincteur est-il obligatoire à la maison ?",
                                a: "Non, seul le détecteur de fumée (DAAF) est obligatoire dans chaque logement depuis 2015. L'extincteur domestique est fortement recommandé : il permet d'éteindre un départ de feu avant l'arrivée des secours et réduit votre prime d'assurance."
                            },
                            {
                                q: "Où placer les détecteurs de fumée ?",
                                a: "Un détecteur par niveau, dans les circulations menant aux chambres, à l'écart de la cuisine et de la salle de bain (pour éviter les fausses alertes). Le plafond est l'emplacement idéal, à plus de 50 cm des murs."
                            },
                            {
                                q: "Quel extincteur pour une maison ?",
                                a: "Un extincteur eau 6L avec additif (classe A) pour la pièce de vie, un CO2 en cuisine pour les feux gras et électriques, et un poudre ABC polyvalent au garage. Notre audit gratuit recommande l'équipement exact de votre logement."
                            },
                            {
                                q: "Qui peut entretenir mon extincteur ?",
                                a: "La vérification annuelle doit être réalisée par un technicien certifié (obligatoire en ERP et recommandée à domicile). L'entretien vérifie la pression, l'étanchéité et le bon fonctionnement, et met à jour votre registre de sécurité."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <h4 className="font-bold text-slate-800 mb-2">{faq.q}</h4>
                                <p className="text-slate-600 text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </article>

                {/* RIGHT SIDEBAR (Sticky) */}
                <div className="hidden lg:block space-y-8">
                    <div className="sticky top-24">
                        {/* Summary Card */}
                        <div className="bg-red-900 text-white rounded-xl p-6 shadow-xl mb-6">
                            <h4 className="font-bold text-lg mb-4">Résumé en bref</h4>
                            <ul className="space-y-3 text-sm text-red-100">
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="mt-1 shrink-0 text-red-400" />
                                    <span>Détecteurs DAAF : <strong>obligatoires</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="mt-1 shrink-0 text-red-400" />
                                    <span>Extincteur reco : <strong>eau 6L</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="mt-1 shrink-0 text-red-400" />
                                    <span>Prix moyen : <strong>100 à 300€</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="mt-1 shrink-0 text-red-400" />
                                    <span>Entretien : <strong>contrôle annuel</strong></span>
                                </li>
                            </ul>
                            <a href="#simulateur" className="block w-full text-center bg-white text-red-900 font-bold py-3 px-4 rounded-lg mt-6 hover:bg-red-50 transition">
                                Demander mon devis
                            </a>
                        </div>

                        {/* Trust Signals */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                            <h5 className="font-bold text-slate-800 mb-4 text-center">Pourquoi Expert Sécurité Incendie ?</h5>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">1</div>
                                    <span className="text-sm text-slate-600">techniciens 100% Incendie</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">2</div>
                                    <span className="text-sm text-slate-600">Devis comparatifs sous 24h</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">3</div>
                                    <span className="text-sm text-slate-600">Accompagnement dossier aides</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <Footer config={hub} />
        </div>
    );
}
