export const revalidate = 86400; // 24h ISR cache
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Normes Extincteurs Entreprise 2026 : Le Guide Complet',
    description: "Tout ce qu'il faut savoir sur la réglementation incendie en entreprise : obligations du Code du Travail, registre de sécurité, et maintenance des extincteurs.",
};

export default function GuideNormesEntreprise() {
    return (
        <div className="min-h-screen bg-white">
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <header className="mb-12">
                        <div className="text-sm font-bold text-red-600 mb-4 tracking-wider uppercase">Guide Réglementaire</div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                            Normes et Obligations pour les Extincteurs en Entreprise (2026)
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            La sécurité incendie en entreprise n'est pas une option, c'est une obligation légale stricte régie par le Code du Travail. Que vous soyez une TPE, une PME ou un site industriel, découvrez les règles de dotation de base, les normes d'installation et vos obligations de maintenance pour être en conformité et protéger vos équipes.
                        </p>
                    </header>

                    <article className="prose prose-lg prose-red max-w-none text-slate-700">
                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-10">
                            <h3 className="text-red-900 font-bold m-0 mb-2">L'essentiel à retenir</h3>
                            <ul className="text-red-800 m-0">
                                <li><strong>Dotation de base :</strong> 1 extincteur à eau pulvérisée 6L pour 200m² et au moins 1 par niveau.</li>
                                <li><strong>Risques spécifiques :</strong> Un extincteur CO2 (minimum 2kg) est requis près des serveurs et TGBT.</li>
                                <li><strong>Maintenance :</strong> Vérification annuelle obligatoire par un technicien qualifié (Norme NF S 61-919).</li>
                                <li><strong>Accessibilité :</strong> Les extincteurs doivent être fixés au mur (poignée à 1m20 du sol maximum) et signalés.</li>
                            </ul>
                        </div>

                        <h2>1. Que dit le Code du Travail ? (Article R4227-29)</h2>
                        <p>
                            L'article <strong>R4227-29 du Code du Travail</strong> est le texte de référence en matière de sécurité incendie dans les établissements professionnels. Il stipule que <em>"le premier secours contre l'incendie est assuré par des extincteurs en nombre suffisant et maintenus en bon état de fonctionnement."</em>
                        </p>
                        <p>
                            La règle générale impose une <strong>dotation de base</strong> : au moins un extincteur portatif à eau pulvérisée (généralement 6 litres) pour 200 mètres carrés de plancher, avec la contrainte absolue de disposer d'<strong>au moins un appareil par niveau</strong>.
                        </p>

                        <h3>Les Établissements Recevant du Public (ERP)</h3>
                        <p>
                            Si votre entreprise reçoit des clients extérieurs (ERP), les règles se durcissent. L'arrêté du 25 juin 1980 précise que les extincteurs doivent être répartis de manière à ce que la distance maximale à parcourir pour atteindre un appareil ne dépasse pas <strong>15 mètres</strong>.
                        </p>

                        <h2>2. Comment choisir le bon extincteur ?</h2>
                        <p>
                            Un feu n'est pas "juste un feu". La réglementation classe les incendies en différentes catégories (Classes A, B, C, D, F). Chaque type de feu nécessite un agent extincteur spécifique. L'utilisation d'un mauvais extincteur (par exemple, de l'eau sur un feu électrique) peut s'avérer catastrophique.
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-slate-900 mb-2">Eau Pulvérisée avec Additif (6L/9L)</h4>
                                <p className="text-sm text-slate-600 mb-3">L'extincteur de base, obligatoire partout.</p>
                                <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Classe A & B</span>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-slate-900 mb-2">Dioxyde de Carbone / CO2 (2kg/5kg)</h4>
                                <p className="text-sm text-slate-600 mb-3">Pour le matériel électrique sous tension.</p>
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">Risques Électriques</span>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-slate-900 mb-2">Poudre ABC (6kg/9kg)</h4>
                                <p className="text-sm text-slate-600 mb-3">Pour l'industrie, l'extérieur et les chaufferies.</p>
                                <span className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded">Classe A, B & C</span>
                            </div>
                        </div>

                        <h2>3. Règles d'Installation et de Signalisation</h2>
                        <p>
                            Acheter un extincteur ne suffit pas ; il faut l'installer correctement pour qu'il soit homologué lors d'un audit ou d'une visite de la commission de sécurité :
                        </p>
                        <ul>
                            <li><strong>Hauteur :</strong> La poignée de portage ne doit pas dépasser <strong>1,20 mètre</strong> du sol.</li>
                            <li><strong>Accessibilité :</strong> L'extincteur doit être dégagé, visible et immédiatement accessible. Aucun meuble ou carton ne doit entraver son accès.</li>
                            <li><strong>Signalisation :</strong> Une signalétique photoluminescente normalisée (panneau rouge et blanc avec le logo de l'extincteur) doit être apposée au-dessus de l'appareil.</li>
                        </ul>

                        <h2>4. La Maintenance Obligatoire (Norme NF S 61-919)</h2>
                        <p>
                            Un extincteur non vérifié est considéré par votre assurance comme un extincteur inexistant. La norme NF S 61-919 définit les règles de maintenance :
                        </p>
                        <ul>
                            <li><strong>Inspection visuelle trimestrielle :</strong> Peut être réalisée par le personnel de l'entreprise (vérification de la présence, du scellé et de l'accessibilité).</li>
                            <li><strong>Vérification annuelle :</strong> Obligatoire, elle doit être effectuée par un technicien qualifié et certifié (APSAD / NF).</li>
                            <li><strong>Révision à 10 ans :</strong> Les extincteurs à pression permanente doivent subir un passage aux mines ou être remplacés au bout de 10 ans.</li>
                        </ul>
                        <p>
                            Toutes ces interventions doivent être méticuleusement tracées dans le <strong>Registre de Sécurité de l'entreprise</strong>, qui sera le premier document réclamé par l'inspection du travail ou votre assureur en cas de sinistre.
                        </p>

                        <div className="bg-slate-900 text-white p-8 rounded-2xl mt-12 text-center not-prose">
                            <h3 className="text-2xl font-bold mb-4">Votre entreprise est-elle aux normes ?</h3>
                            <p className="text-slate-300 mb-6">Ne prenez aucun risque avec la sécurité de vos équipes et la responsabilité pénale du dirigeant. Demandez un audit gratuit de votre parc existant.</p>
                            <Link href="/solutions/entreprise" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
                                Demander un Devis de Mise en Conformité
                            </Link>
                        </div>
                    </article>
                </div>
            </main>
        </div>
    );
}
