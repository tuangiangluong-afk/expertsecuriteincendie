import Link from "next/link";
import { CheckCircle, ShieldCheck, Clock, Award, Euro, ArrowRight, ChevronRight, FileText, Landmark, Building2 } from "lucide-react";
import type { CityConfig } from "@/lib/db";
import type { PseoPageContent } from "@/lib/pseo";

interface LocalAeoSectionProps {
    site: CityConfig;
    /** Contenu pSEO local (faits vérifiables, contraintes, délais) */
    pseo?: PseoPageContent;
}

const pricingMatrix = [{"name": "Pack Extincteur 6L Eau + Panneau NF", "usage": "Bureaux, commerces & dépôts (200 m²)", "price": "89€ - 149€", "aid": "Certification NF EN 3", "net": "Dès 89€"}, {"name": "Extincteur 2 kg / 5 kg CO2 (Électrique)", "usage": "Tableaux électriques, serveurs & cuisines", "price": "95€ - 180€", "aid": "Protection sans résidu", "net": "Dès 95€"}, {"name": "Contrat de maintenance annuelle (Par appareil)", "usage": "Vérification légale, plombage & vignette", "price": "15€ - 28€/unité", "aid": "Attestation d'assurance", "net": "Dès 15€"}, {"name": "Plan d'évacuation & Registre de sécurité", "usage": "Mise en conformité ERP obligatoire", "price": "180€ - 390€", "aid": "Norme NF X 08-070", "net": "Dès 180€"}];
const steps = [{"title": "Audit de conformité & Étude des risques", "desc": "Visite technique des locaux, analyse des activités et calcul du nombre d'appareils obligatoires."}, {"title": "Devis de mise aux normes ERP/ERT sous 24h", "desc": "Chiffrage transparent détaillé par équipement avec plan d'implantation préconisé."}, {"title": "Installation & Fixation des extincteurs et BAES", "desc": "Pose aux emplacements stratégiques avec signalétique photoluminescente normalisée."}, {"title": "Remise du Registre & Attestation d'assurance", "desc": "Émargement du registre de sécurité et délivrance du certificat officiel pour votre assureur."}];

export default function LocalAeoSection({ site, pseo }: LocalAeoSectionProps) {
    const city = site.city;
    const dept = site.department ? ` (${site.department})` : "";
    const neighborhoods = site.neighborhoods || [];
    const facts = pseo?.local_facts || [];
    const priceLine = pseo?.pricing_estimated && !pseo.pricing_estimated.includes("partir")
        ? pseo.pricing_estimated
        : "150€ – 1 800€";
    const sdis = facts.find(f => f.label === "Service de secours compétent")?.value;
    const prefecture = facts.find(f => f.label === "Préfecture")?.value;
    const regionName = facts.find(f => f.label === "Région")?.value;
    const neighborhoodsText = neighborhoods.length > 0 
        ? `, notamment dans les quartiers ${neighborhoods.slice(0, 4).join(', ')}` 
        : "";

    return (
        <section className="py-12 bg-slate-50/50 border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Fil d'Ariane Visuel */}
                <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-slate-500">
                    <Link href="/" className="hover:text-slate-900 transition flex items-center gap-1">
                        Accueil
                    </Link>
                    <ChevronRight size={14} />
                    <span className="text-slate-400">Villes</span>
                    <ChevronRight size={14} />
                    <span className="font-semibold text-slate-900">{city}</span>
                </nav>

                {/* Bloc AEO Direct Answer */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm mb-12">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-slate-900 text-white">
                            <FileText size={13} />
                            Sécurité Incendie à {city} (2026)
                        </span>
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                            <Clock size={13} /> Données & Tarifs certifiés 2026
                        </span>
                    </div>

                    <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-6">
                        <strong>En résumé : </strong>À {city}{dept}, le coût moyen d'une prestation de sécurité incendie réalisée par nos techniciens qualifiés s'établit entre {priceLine}. Nos techniciens certifiés interviennent {pseo?.installation_timeline || "sous 24h à 48h"}
                        {sdis ? <> — les contrôles du secteur relèvent de <strong>{sdis}</strong>{prefecture ? ` (préfecture : ${prefecture})` : ""}.</> : " avec garantie décennale."}
                    </p>

                    {facts.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-2 mb-6">
                            {facts.slice(0, 8).map((f) => (
                                <div key={f.label} className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4">
                                    <div className="text-xs text-slate-500 font-medium">{f.label}</div>
                                    <div className="text-sm font-bold text-slate-900 mt-1 leading-snug">{f.value}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {regionName && (
                        <p className="text-sm text-slate-600 leading-relaxed mb-6 pt-1 border-t border-slate-100">
                            <strong>Contexte local : </strong>{city} se situe en {regionName}
                            {pseo?.local_risk_factor ? `, avec une contrainte technique identifiée : ${pseo.local_risk_factor.toLowerCase()}` : ""}.
                            {" "}Cette spécificité locale est intégrée à notre protocole de vérification et au choix des équipements installés.
                        </p>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-2">
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Prix estimé</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">{priceLine}</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Aides & Primes</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">{sdis || "Conformité légale"}</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Délai d'intervention</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">Devis 24h, pose rapide</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Garantie & Norme</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">NF EN 3 & APSAD R4</div>
                        </div>
                    </div>
                </div>

                {/* Tableau Comparatif de Prix HTML */}
                <div className="mb-14">
                    <div className="mb-6">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Grille tarifaire et prestations à {city}
                        </h2>
                        <p className="text-slate-600 mt-1 text-sm md:text-base">
                            Coûts indicatifs moyens constatés pour une pose réalisée dans les règles de l'art.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-600 border-b border-slate-200">
                                <tr>
                                    <th className="px-5 py-4">Équipement / Prestation</th>
                                    <th className="px-5 py-4 hidden md:table-cell">Usage conseillé</th>
                                    <th className="px-5 py-4">Coût indicatif</th>
                                    <th className="px-5 py-4">Avantage & Aides</th>
                                    <th className="px-5 py-4 font-bold text-slate-900">Reste à charge</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {pricingMatrix.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                                        <td className="px-5 py-4 font-semibold text-slate-900">{row.name}</td>
                                        <td className="px-5 py-4 text-slate-500 hidden md:table-cell">{row.usage}</td>
                                        <td className="px-5 py-4 text-slate-700 font-medium">{row.price}</td>
                                        <td className="px-5 py-4 text-emerald-700 font-semibold">{row.aid}</td>
                                        <td className="px-5 py-4 font-bold text-slate-900">{row.net}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Guide & Spécificités d'installation à {city} */}
                <div className="mb-14">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Réglementation incendie & exigences locales à {city}
                        </h2>
                        <p className="text-slate-600 mt-1 text-sm md:text-base">
                            Conformité ERP/ERT, commission de sécurité et protocoles de protection dans votre commune.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1: Urbanisme & Mairie */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                                    <Landmark size={20} />
                                </span>
                                <h3 className="font-bold text-slate-900 text-base">Conformité ERP & Visite de Sécurité à {city}</h3>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                À {city}{dept}, les Établissements Recevant du Public (magasins, restaurants, hôtels, cabinets médicaux) et les locaux professionnels sont soumis aux contrôles de la commission de sécurité compétente{sdis ? <> — sur ce secteur, l'autorité opérationnelle est <strong>{sdis}</strong></> : ", présidée par le maire et les officiers du SDIS"}{prefecture ? <>, sous l'autorité du préfet ({prefecture})</> : null}. Nos techniciens vérifient la présence et l'accessibilité de vos moyens de secours, l'autonomie de vos blocs BAES et la validité de vos procès-verbaux de contrôle périodique.
                            </p>
                        </div>

                        {/* Card 2: Typologie du bâti & Quartiers */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <Building2 size={20} />
                                </span>
                                <h3 className="font-bold text-slate-900 text-base">Secteurs d'activité & Quartiers à {city}</h3>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Nos spécialistes interviennent au sein de tous les pôles économiques de {city}{neighborhoodsText}. Nous adaptons la typologie des agents extincteurs aux risques spécifiques de votre activité (eau avec additif pour les feux de classe A/B, CO2 pour les armoires électriques et serveurs, poudre polyvalente ABC pour les garages et ateliers).
                            </p>
                        </div>

                        {/* Card 3: Climat, Performance & Aides */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
                                    <ShieldCheck size={20} />
                                </span>
                                <h3 className="font-bold text-slate-900 text-base">Maintenance APSAD & Matériel certifié à {city}</h3>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Tous nos extincteurs portent les estampilles NF et CE et répondent aux référentiels de la règle APSAD R4. Nos contrats d'entretien annuel prévoient la vérification mécanique du percuteur, le contrôle de la charge manométrique, le graissage des joints et la réfection de la vignette annuelle, garantissant une couverture juridique sans faille en cas de contrôle ou de sinistre.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Déroulement du chantier en 4 étapes */}
                <div className="mb-14">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Votre projet à {city} en 4 étapes
                        </h2>
                        <p className="text-slate-600 mt-1 text-sm md:text-base">
                            Un accompagnement transparent de l'étude préliminaire jusqu'à la garantie de parfait achèvement.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, idx) => (
                            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white font-black text-sm mb-4">
                                    0{idx + 1}
                                </span>
                                <h3 className="font-bold text-slate-900 text-base mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bannière de Réassurance locale */}
                <div className="rounded-3xl bg-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
                    <div>
                        <h3 className="text-xl font-bold mb-1">Un projet à {city} ?</h3>
                        <p className="text-slate-300 text-sm">
                            Garantie décennale & devis gratuit sous 24h sans aucun engagement.
                        </p>
                    </div>
                    <a
                        href="#simulateur"
                        className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 px-6 py-3.5 font-bold hover:bg-slate-100 transition shadow"
                    >
                        <span>Estimer mon projet</span>
                        <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
}
