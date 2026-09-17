export const revalidate = 86400; // 24h ISR cache
import { Building2, CheckCircle, HelpCircle, Users, FileText, Euro, Calculator, AlertCircle, Award } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getHubConfig } from "@/lib/sites-config";
import Image from "next/image";

export const metadata = {
    title: "Sécurité incendie en copropriété : guide du syndic",
    description: "Protection incendie en copropriété : extincteurs, blocs d'éclairage de sécurité et désenfumage des parties communes, obligations du syndic, vote en assemblée générale et budget à prévoir.",
};

export default function SolutionCopro() {
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
                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                    <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-1.5 text-sm font-bold text-purple-800 border border-purple-200">
                                        <Building2 size={16} className="mr-2" />
                                        Spécial Syndic & Copropriété
                                    </div>
                                    <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-sm font-bold text-green-800 border border-green-200">
                                        <Euro size={16} className="mr-2" />
                                        État des lieux écrit remis au syndic
                                    </div>
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                                    Mettre en conformité la <span className="text-purple-600">sécurité incendie</span> de votre copropriété.
                                </h1>
                                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    Extincteurs, blocs d&apos;éclairage de sécurité et désenfumage des parties communes : nous auditions, chiffrons et maintenons l&apos;ensemble,
                                    avec un registre de sécurité de l&apos;immeuble tenu à jour.
                                    <br />
                                    <strong>Un dossier complet, présentable en assemblée générale.</strong>
                                </p>
                            </div>

                            {/* LEAD FORM - Integrated Here */}
                            <div className="w-full max-w-xl mx-auto lg:mx-0 relative z-30 text-left">
                                <div id="simulateur" className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 overflow-hidden border border-slate-200">
                                    <div className="p-1 bg-gradient-to-r from-purple-600 to-purple-500"></div>
                                    <div className="p-6 md:p-8">
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-purple-900">Étude & Devis Copropriété</h3>
                                            <p className="text-sm text-slate-500">Réponse sous 24h ouvrées</p>
                                        </div>
                                        <LeadForm city="France" domain="expertsecuriteincendie.fr" themeColor="purple" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Large Hero Image + Trust Badges */}
                        <div className="lg:col-span-5 hidden lg:block relative w-full">
                            <div className="relative h-[640px] w-full mb-8">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-100 bg-white p-2">
                                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-purple-100">
                                        <Image
                                            src="/images/realizations/hero-extincteur.jpg"
                                            alt="Copropriété Sécurité Incendie"
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
                                                <div className="bg-purple-100 p-3 rounded-full shrink-0">
                                                    <CheckCircle className="w-6 h-6 text-purple-600" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-lg text-slate-900">Registre de sécurité remis</div>
                                                    <div className="text-sm font-medium text-slate-500">Attestation annuelle incluse</div>
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
                    <h2>Le défi de la conformité incendie en immeuble collectif</h2>
                    <p>
                        Contrairement à une maison individuelle, les moyens de secours relèvent ici des <strong>parties communes</strong> : ce sont le syndicat des copropriétaires et son syndic
                        qui doivent les maintenir en état et pouvoir en justifier. L&apos;arrêté du 31 janvier 1986 fixe le cadre applicable aux bâtiments d&apos;habitation, et le registre de sécurité de l&apos;immeuble
                        centralise les vérifications. Deux approches existent : la <strong>prise en charge au coup par coup</strong>, déclenchée par un copropriétaire, et le <strong>contrat collectif</strong> voté en assemblée générale.
                    </p>

                    <div className="not-prose grid md:grid-cols-2 gap-6 my-10">
                        <div className="border border-slate-200 rounded-2xl p-6 hover:shadow-md transition">
                            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                                <Users className="text-red-500" /> Vérification au coup par coup
                            </h3>
                            <p className="text-sm text-slate-600 mb-4">
                                Chaque copropriétaire fait vérifier, à sa demande, l&apos;appareil dont il a la charge.
                            </p>
                            <ul className="text-sm space-y-2">
                                <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Souple pour un besoin isolé</li>
                                <li className="text-red-500 flex gap-2"><AlertCircle size={16} /> Historique de vérification dispersé</li>
                                <li className="text-red-500 flex gap-2"><AlertCircle size={16} /> Tarif unitaire plus élevé, registre incomplet</li>
                            </ul>
                        </div>
                        <div className="border-2 border-purple-200 bg-purple-50/30 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-xl mb-3 flex items-center gap-2 text-purple-800">
                                <Building2 className="text-purple-600" /> Contrat collectif de l&apos;immeuble
                            </h3>
                            <p className="text-sm text-slate-600 mb-4">
                                Une seule visite annuelle couvre l&apos;ensemble des extincteurs, blocs d&apos;éclairage de sécurité et dispositifs de désenfumage des parties communes.
                            </p>
                            <ul className="text-sm space-y-2">
                                <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Registre de sécurité tenu par le prestataire</li>
                                <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Tarif dégressif au-delà de 20 appareils</li>
                                <li className="text-green-600 flex gap-2"><CheckCircle size={16} /> Attestation annuelle pour le syndic et l&apos;assureur</li>
                            </ul>
                        </div>
                    </div>

                    <h2>Ce que la copropriété doit vraiment entretenir</h2>
                    <p>
                        Les moyens de secours d&apos;un immeuble collectif imposent chacun leur périodicité : <strong>extincteurs</strong> vérifiés une fois par an (règle APSAD R4, NF EN 3),
                        <strong>blocs autonomes d&apos;éclairage de sécurité</strong> avec essai mensuel de fonctionnement assuré par l&apos;exploitant et essai annuel d&apos;autonomie par un prestataire (NF C 71-820),
                        <strong>désenfumage</strong> des circulations et parkings couverts avec vérification semestrielle des commandes et annuelle de l&apos;installation, sans oublier les <strong>portes coupe-feu</strong> et l&apos;affichage des consignes.
                    </p>
                    <blockquote>
                        &ldquo;Le registre de sécurité de l&apos;immeuble est la première pièce demandée lors d&apos;un contrôle de la commission de sécurité ou d&apos;une vente de lot. L&apos;alimenter à chaque passage coûte moins cher que de le reconstituer après coup.&rdquo;
                    </blockquote>

                    <div className="bg-red-600 text-white p-8 rounded-2xl shadow-xl my-10 not-prose flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                <FileText /> Syndic réticent ?
                            </h3>
                            <p className="text-red-100">
                                La loi est de votre côté. Téléchargez notre <strong>modèle de lettre juridique</strong> à envoyer à votre syndic pour mettre le sujet à l'ordre du jour de la prochaine AG.
                            </p>
                        </div>
                        <a
                            href="#simulateur"
                            className="bg-white text-red-900 font-bold py-3 px-6 rounded-xl hover:bg-red-50 transition shadow-lg whitespace-nowrap"
                        >
                            Recevoir le modèle
                        </a>
                    </div>

                    <h2>Budget de conformité constaté</h2>
                    <p>
                        Les travaux de mise en conformité des moyens de secours relèvent de l&apos;entretien de l&apos;immeuble. Ils ne bénéficient pas des dispositifs d&apos;aide annoncés pour d&apos;autres
                        équipements : les fourchettes ci-dessous sont les montants réellement constatés sur le marché en 2026.
                    </p>
                    <table className="not-prose min-w-full bg-white border border-slate-200 rounded-lg shadow-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left">Prestation</th>
                                <th className="px-4 py-3 text-left">Coût indicatif HT</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr>
                                <td className="px-4 py-3">Vérification annuelle des extincteurs</td>
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

                    <h2>Comment ça se passe en AG (Assemblée Générale) ?</h2>
                    <p>
                        Pour valider une infrastructure collective, le sujet doit être mis à l'ordre du jour de l'AG.
                        Expert Sécurité Incendie vous accompagne :
                    </p>
                    <ol>
                        <li>Visite technique gratuite de la copropriété.</li>
                        <li>Remise d'un dossier technique complet pour le syndic.</li>
                        <li><strong>Présence (ou visio) d'un expert lors de l'AG</strong> pour répondre aux questions des copropriétaires.</li>
                        <li>Vote (souvent à la majorité simple art 24 ou 25).</li>
                    </ol>

                    <h3>Questions Fréquentes</h3>
                    <div className="not-prose space-y-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <h4 className="font-bold mb-1">Qui paie la vérification des extincteurs des parties communes ?</h4>
                            <p className="text-sm text-slate-600">Le syndicat des copropriétaires : c&apos;est une dépense d&apos;entretien des parties communes, répartie selon les clés prévues par le règlement de copropriété. Le contrat collectif est voté en assemblée générale et facturé au syndic, jamais individuellement aux résidents.</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <h4 className="font-bold mb-1">Que se passe-t-il si l&apos;immeuble n&apos;est pas à jour ?</h4>
                            <p className="text-sm text-slate-600">Une vérification dépassée, un registre de sécurité incomplet ou des blocs d&apos;éclairage hors service peuvent entraîner des réserves lors d&apos;une visite de la commission de sécurité, une mise en demeure du maire, et une réduction de la couverture d&apos;assurance en cas de sinistre.</p>
                        </div>
                    </div>
                </article>

                <div className="hidden lg:block space-y-6 sticky top-24 h-fit" id="espace-syndic">
                    <div className="bg-purple-900 text-white p-6 rounded-xl shadow-xl">
                        <h4 className="font-bold mb-4">Syndics & Conseils Syndicaux</h4>
                        <p className="text-sm text-purple-200 mb-6">
                            Vous gérez une copropriété ? Simplifiez-vous la vie.
                            Obtenez une étude de faisabilité gratuite et un dossier clé en main pour votre prochaine AG.
                        </p>
                        <ul className="space-y-3 mb-6 text-sm">
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-purple-400" /> Visite technique offerte</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-purple-400" /> Dossier AG complet</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-purple-400" /> Solutions Tiers-Financées</li>
                        </ul>
                        <a href="#simulateur" className="block w-full text-center bg-white text-purple-900 font-bold py-3 rounded-lg hover:bg-purple-50 transition">
                            Contacter un expert Copro
                        </a>
                    </div>
                </div>
            </div>

            <Footer config={hub} />
        </div>
    );
}
