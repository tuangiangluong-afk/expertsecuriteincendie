import Link from "next/link";
import { CheckCircle, ShieldCheck, Clock, Award, Euro, ArrowRight, ChevronRight, FileText } from "lucide-react";
import type { CityConfig } from "@/lib/db";

interface LocalAeoSectionProps {
    site: CityConfig;
}

const pricingMatrix = [{"name": "Extincteur 6L Eau Pulvérisée / Poudre 6kg", "usage": "Obligatoire tous les 200 m²", "price": "65€ - 110€", "aid": "Fixation murale comprise", "net": "Dès 65€"}, {"name": "Bloc Éclairage de Sécurité (BAES LED)", "usage": "Évacuation de secours obligatoire", "price": "45€ - 85€", "aid": "Norme NF Environnement", "net": "Dès 45€"}, {"name": "Alarme Incendie Type 4 (Sonore & Flash)", "usage": "Signal d'évacuation ERP/ERT", "price": "120€ - 280€", "aid": "Autonomie pile 5 ans", "net": "Dès 120€"}, {"name": "Maintenance Annuelle & Registre", "usage": "Vérification annuelle réglementaire", "price": "15€ - 25€ / app.", "aid": "Attestation Q4 assurance", "net": "Forfait annuel"}];
const steps = [{"title": "Audit de conformité réglementaire gratuit", "desc": "Visite de vos locaux, comptage des postes d'extinction requis et contrôle des issues de secours."}, {"title": "Proposition chiffrée conforme Code du travail", "desc": "Devis clair sous 24h détaillant l'implantation exacte du matériel NF et des panneaux signalétiques."}, {"title": "Pose et numérotation des équipements", "desc": "Installation soignée à hauteur réglementaire, numérotation des appareils et pose des plans d'évacuation."}, {"title": "Émargement du registre de sécurité & certificat", "desc": "Remise du certificat de conformité APSAD Q4 pour votre assureur et visa du registre officiel."}];

export default function LocalAeoSection({ site }: LocalAeoSectionProps) {
    const city = site.city;
    const dept = site.department ? ` (${site.department})` : "";

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
                            Sécurité Incendie & Extincteurs à {city} (2026)
                        </span>
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                            <Clock size={13} /> Chiffres & Aides certifiés 2026
                        </span>
                    </div>

                    <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-6">
                        <strong>En résumé : </strong>À {city}{dept}, nos techniciens agréés garantissent la conformité incendie de votre entreprise, commerce ou copropriété (extincteurs NF, blocs BAES, alarmes type 4, désenfumage). Nous réalisons l'audit obligatoire, la pose conforme et l'émargement immédiat de votre registre de sécurité.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-2">
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Prix estimé</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">65€ – 280€ par équipement</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Aides & Primes</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">Conformité Code du travail & Registre de sécurité</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Délai d'intervention</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">Audit sous 24h, intervention immédiate</div>
                        </div>
                        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 text-center">
                            <div className="text-xs text-slate-500 font-medium">Garantie & Norme</div>
                            <div className="text-sm md:text-base font-bold text-slate-900 mt-1">Normes NF S 61-919, NF C 71-800 & Règle APSAD R4</div>
                        </div>
                    </div>
                </div>

                {/* Tableau Comparatif de Prix HTML */}
                <div className="mb-14">
                    <div className="mb-6">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Grille tarifaire et aides à {city}
                        </h2>
                        <p className="text-slate-600 mt-1 text-sm md:text-base">
                            Coûts moyens constatés pour une pose réalisée par nos artisans partenaires certifiés.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-600 border-b border-slate-200">
                                <tr>
                                    <th className="px-5 py-4">Équipement / Prestation</th>
                                    <th className="px-5 py-4 hidden md:table-cell">Usage conseillé</th>
                                    <th className="px-5 py-4">Coût indicatif</th>
                                    <th className="px-5 py-4">Aides déduites</th>
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

                {/* Déroulement du chantier en 4 étapes */}
                <div className="mb-14">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Votre installation à {city} en 4 étapes
                        </h2>
                        <p className="text-slate-600 mt-1 text-sm md:text-base">
                            Un accompagnement complet et transparent, de l'audit jusqu'à l'obtention des aides.
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
                        <h3 className="text-xl font-bold mb-1">Un projet d'installation à {city} ?</h3>
                        <p className="text-slate-300 text-sm">
                            Techniciens certifiés NF & Attestation APSAD. Devis gratuit sous 24h sans aucun engagement.
                        </p>
                    </div>
                    <a
                        href="#simulateur"
                        className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 px-6 py-3.5 font-bold hover:bg-slate-100 transition shadow"
                    >
                        <span>Estimer mon devis</span>
                        <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
}
