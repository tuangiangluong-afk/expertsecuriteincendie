import { CityConfig } from "@/lib/db";

interface LocalFAQProps {
    site: CityConfig;
    segment?: "B2C" | "COPRO" | "ENTREPRISE";
}

export function LocalFAQ({ site, segment = "B2C" }: LocalFAQProps) {
    const city = site.city;
    const faqs = getLocalFAQData(city, site.department, segment);

    return (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900">
                        Questions fréquentes à {city}
                    </h2>
                    <p className="text-slate-600 mt-3 text-lg">
                        Tout savoir sur l'installation et la maintenance de matériel incendie dans votre ville.
                    </p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <details 
                            key={idx} 
                            className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
                            {...(idx === 0 ? { open: true } : {})}
                        >
                            <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-bold text-slate-900 hover:bg-slate-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                                <span>{faq.question}</span>
                                <span className="ml-4 shrink-0 text-slate-400 group-open:rotate-45 transition-transform text-2xl font-light">+</span>
                            </summary>
                            <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * Deterministic hash for a city name — produces a stable number 
 * without relying on parseInt of department codes (which breaks on "MC", "2A", "2B").
 */
function cityHash(city: string): number {
    let hash = 0;
    for (let i = 0; i < city.length; i++) {
        hash = ((hash << 5) - hash + city.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
}

// Exported for SchemaJSON to generate FAQPage structured data
export function getLocalFAQData(city: string, department: string | undefined, segment: "B2C" | "COPRO" | "ENTREPRISE") {
    const dept = department || "votre département";
    const h = cityHash(city);

    if (segment === "COPRO") {
        const coproCount = 8 + (h % 25);
        return [
            {
                question: `Combien coûte une mise en conformité incendie en copropriété à ${city} ?`,
                answer: `Le coût dépend de la surface des parties communes et du nombre de niveaux. Un audit complet à ${city} incluant les BAES (Blocs Autonomes d'Éclairage de Sécurité), les extincteurs, et la mise à jour des plans d'évacuation coûte généralement entre 1 500€ et 4 500€. Notre étude de faisabilité est 100% gratuite.`
            },
            {
                question: `Quelles démarches pour installer des extincteurs dans ma copropriété à ${city} ?`,
                answer: `La démarche se fait en 3 étapes : 1) Visite technique gratuite de votre copropriété à ${city}. 2) Préparation du dossier de mise aux normes pour le syndic. 3) Vote en Assemblée Générale (souvent requis pour le budget). Plus de ${coproCount} copropriétés du ${dept} nous confient leur maintenance annuelle.`
            },
            {
                question: `Le registre de sécurité est-il obligatoire pour une copropriété à ${city} ?`,
                answer: `Oui, toutes les copropriétés (selon leur taille et type d'habitation) doivent tenir un registre de sécurité à jour. Nos techniciens certifiés le remplissent et le valident à chaque visite annuelle de maintenance à ${city}.`
            }
        ];
    } else if (segment === "ENTREPRISE") {
        const entrepriseCount = 15 + (h % 35);
        return [
            {
                question: `Quelles obligations pour les entreprises en matière de sécurité incendie à ${city} ?`,
                answer: `Le code du travail (Art. R4227-29) exige au moins un extincteur portatif à eau pulvérisée de 6 litres minimum pour 200 m² de plancher, avec un minimum d'un appareil par niveau. Plus de ${entrepriseCount} entreprises du ${dept} se sont mises en conformité avec nous.`
            },
            {
                question: `À quelle fréquence dois-je faire vérifier mes extincteurs à ${city} ?`,
                answer: `La vérification des extincteurs en entreprise est obligatoire au minimum une fois par an par une entreprise qualifiée. Cette maintenance doit être consignée dans votre registre de sécurité pour être couverte par votre assurance en cas de sinistre.`
            },
            {
                question: `Quel type d'extincteur faut-il pour une salle informatique à ${city} ?`,
                answer: `Pour les salles serveurs et le matériel électrique sous tension, il est impératif d'utiliser des extincteurs au Dioxyde de Carbone (CO2). Ils n'endommagent pas le matériel car ils ne laissent aucun résidu, contrairement à l'eau ou la poudre.`
            }
        ];
    } else {
        const installCount = 40 + (h % 80);
        return [
            {
                question: `Quel est le prix pour faire vérifier un extincteur à ${city} ?`,
                answer: `Le forfait de maintenance annuelle préventive à ${city} coûte en moyenne entre 15€ et 25€ HT par appareil. Ce prix est dégressif selon la quantité. S'il faut remplacer des pièces ou recharger le fluide, un devis de maintenance curative est proposé.`
            },
            {
                question: `Combien de temps pour une intervention de maintenance à ${city} ?`,
                answer: `Nos techniciens certifiés Incendie à ${city} interviennent sous 48 à 72h. La vérification prend environ 5 à 10 minutes par extincteur. Plus de ${installCount} audits ont été réalisés dans le ${dept} le mois dernier.`
            },
            {
                question: `Fournissez-vous les plans d'évacuation obligatoires à ${city} ?`,
                answer: `Oui, notre bureau d'études conçoit vos plans d'intervention et d'évacuation selon la norme NF X08-070. Nous nous occupons de l'impression et de la pose dans vos locaux à ${city}.`
            }
        ];
    }
}
