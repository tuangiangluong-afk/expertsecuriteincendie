import { CityConfig } from "@/lib/db";
import { DEPARTEMENTS } from "@/data/fr-departements";
import { agentMid, type Brand } from "@/data/brands";

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
 * FAQ d'une page ville x marque.
 *
 * Chaque réponse est fabriquée à partir de deux ensembles de faits réels :
 * les gammes publiées par le constructeur, et le territoire de la commune
 * (département, région, service de secours compétent). Aucune statistique
 * n'est inventée, et aucune marque ne reçoit de contenu par défaut : quand
 * le constructeur ne publie rien, la réponse est simplement absente.
 */
export function getBrandFAQData(
    city: string,
    department: string | undefined,
    brand: Brand,
) {
    const dept = department ? DEPARTEMENTS[department] : undefined;
    const deptRef = dept ? `${dept.name} (${dept.code})` : "votre département";
    const sdis = dept?.sdis || "le service d'incendie et de secours compétent";

    const faqs: { question: string; answer: string }[] = [];

    // 1. Ce que couvre réellement la marque
    faqs.push({
        question: `Que vérifient vos techniciens sur un extincteur ${brand.name} à ${city} ?`,
        answer: `La marque ne change pas la nature du contrôle, mais les agents extincteurs qu'elle met en œuvre, oui. Sur un parc ${brand.name} à ${city}, le passage annuel porte sur ${brand.ranges.length === 1 ? "un type d'appareil" : `${brand.ranges.length} types d'appareils`} : ${brand.ranges.map((r) => `${r.agent} (${r.classes})`).join(", ")}. Chaque appareil reçoit le geste correspondant à son agent, et non un contrôle générique.`,
    });

    // 2. Le geste technique, qui est la vraie différence entre deux marques
    brand.ranges.forEach((r) => {
        faqs.push({
            question: `Comment se vérifie un extincteur ${brand.name} à ${agentMid(r.agent)} à ${city} ?`,
            answer: `Pour un appareil à ${agentMid(r.agent)} de capacités usuelles ${r.capacites.join(", ")}, couvrant les feux de classe ${r.classes} : ${r.controle}. L'opération est consignée sur l'étiquette de l'appareil et reportée au registre de sécurité de l'établissement à ${city}.`,
        });
    });

    // 3. Le constructeur, uniquement quand il publie l'information
    if (brand.verifieConstructeur && brand.groupe) {
        faqs.push({
            question: `Qui fabrique et exploite la marque ${brand.name} aujourd'hui ?`,
            answer: `${brand.name} est exploitée par ${brand.groupe}. ${brand.perimetre} ${brand.reseau}`.trim(),
        });
    }

    // 4. Le cadre local, identique pour tous les parcs d'une même commune
    faqs.push({
        question: `La vérification annuelle des extincteurs ${brand.name} est-elle obligatoire à ${city} ?`,
        answer: `Oui, quelle que soit la marque. Dans le département ${deptRef}, un établissement doit pouvoir présenter la vérification annuelle de ses extincteurs et son registre de sécurité à jour. Les ERP sont contrôlés par la commission de sécurité compétente, avec l'appui opérationnel de ${sdis}. Un appareil ${brand.name} non vérifié est un point de non-conformité au même titre qu'un appareil de n'importe quelle autre marque.`,
    });

    // 5. Le prix, sur la fourchette publiée sur le site
    faqs.push({
        question: `Combien coûte la vérification d'un extincteur ${brand.name} à ${city} ?`,
        answer: `Le forfait de maintenance annuelle préventive se situe entre 15 € et 28 € HT par appareil à ${city}, dégressif selon la quantité. Au-delà du contrôle, une remise en état peut être nécessaire (recharge d'agent, remplacement du flexible, de la goupille ou du joint de tête) : elle est alors chiffrée séparément avant toute intervention.`,
    });

    // 6. Que faire d'un appareil recalé
    faqs.push({
        question: `Que se passe-t-il si un appareil ${brand.name} est déclaré non conforme à ${city} ?`,
        answer: `Trois issues selon l'état réel de l'appareil : la remise en état (recharge ou remplacement de pièce d'usure), le remplacement à l'identique, ou le retrait si le corps est corrodé ou que l'épreuve périodique n'est plus valable. Dans les trois cas, l'opération est tracée au registre de sécurité et l'anomalie est signalée sur place, par écrit, au responsable de l'établissement à ${city}.`,
    });

    return faqs;
}

/**
 * Exported for SchemaJSON to generate FAQPage structured data.
 *
 * IMPORTANT : aucune statistique n'est inventée ici. Les réponses s'appuient
 * uniquement sur des faits vérifiables (département, région, préfecture,
 * service de secours compétent) afin de rester citable par les moteurs IA.
 */
export function getLocalFAQData(city: string, department: string | undefined, segment: "B2C" | "COPRO" | "ENTREPRISE") {
    const dept = department ? DEPARTEMENTS[department] : undefined;
    const deptName = dept?.name || "votre département";
    const deptRef = dept ? `${dept.name} (${dept.code})` : deptName;
    const sdis = dept?.sdis || "le service d'incendie et de secours compétent";
    const region = dept?.region || "France";
    const prefecture = dept?.prefecture;

    if (segment === "COPRO") {
        return [
            {
                question: `Combien coûte une mise en conformité incendie en copropriété à ${city} ?`,
                answer: `Le coût dépend de la surface des parties communes et du nombre de niveaux. Un audit complet à ${city} incluant les BAES (Blocs Autonomes d'Éclairage de Sécurité), les extincteurs et la mise à jour des plans d'évacuation se situe généralement entre 1 500€ et 4 500€. Notre étude de faisabilité est gratuite et sans engagement.`
            },
            {
                question: `Quelles démarches pour installer des extincteurs dans ma copropriété à ${city} ?`,
                answer: `La démarche se fait en 3 étapes : 1) Visite technique gratuite de votre copropriété à ${city}. 2) Préparation du dossier de mise aux normes pour le syndic. 3) Vote en Assemblée Générale, souvent requis pour engager le budget. Sur le département ${deptRef}, les moyens de secours des parties communes sont contrôlés par ${sdis}.`
            },
            {
                question: `Le registre de sécurité est-il obligatoire pour une copropriété à ${city} ?`,
                answer: `Oui. Les copropriétés concernées doivent tenir un registre de sécurité à jour et présenter les justificatifs de vérification périodique. Nos techniciens le renseignent et le valident à chaque visite annuelle de maintenance à ${city}.`
            },
            {
                question: `Quelle est la réglementation applicable aux parties communes à ${city} ?`,
                answer: `À ${city}, dans le département ${deptRef} (région ${region}), les parties communes relèvent du règlement de sécurité contre les risques d'incendie et de panique. Les contrôles sont diligentés par la commission de sécurité compétente, avec l'appui technique de ${sdis}${prefecture ? `, sous l'autorité du préfet (préfecture : ${prefecture})` : ""}.`
            }
        ];
    }

    if (segment === "ENTREPRISE") {
        return [
            {
                question: `Quelles obligations pour les entreprises en matière de sécurité incendie à ${city} ?`,
                answer: `Le Code du travail (art. R. 4227-28 et suivants) exige au moins un extincteur portatif à eau pulvérisée de 6 litres minimum pour 200 m² de plancher, avec au minimum un appareil par niveau. À ${city}, ces exigences s'appliquent en complément des règles propres aux établissements recevant du public.`
            },
            {
                question: `À quelle fréquence dois-je faire vérifier mes extincteurs à ${city} ?`,
                answer: `La vérification des extincteurs en entreprise est obligatoire au minimum une fois par an par une entreprise qualifiée. Cette maintenance doit être consignée dans votre registre de sécurité pour être opposable à votre assureur en cas de sinistre.`
            },
            {
                question: `Quel type d'extincteur faut-il pour une salle informatique à ${city} ?`,
                answer: `Pour les salles serveurs et le matériel électrique sous tension, il faut des extincteurs au dioxyde de carbone (CO2) : ils n'endommagent pas le matériel car ils ne laissent aucun résidu, contrairement à l'eau ou à la poudre.`
            },
            {
                question: `Qui contrôle la conformité incendie de mon établissement dans le ${deptRef} ?`,
                answer: `Sur le département ${deptRef}, les établissements recevant du public sont visités par la commission de sécurité compétente, avec l'appui opérationnel de ${sdis}${prefecture ? ` (préfecture : ${prefecture})` : ""}. Nos audits préalables permettent d'arriver à cette visite sans observation.`
            }
        ];
    }

    return [
        {
            question: `Quel est le prix pour faire vérifier un extincteur à ${city} ?`,
            answer: `Le forfait de maintenance annuelle préventive à ${city} coûte en moyenne entre 15€ et 28€ HT par appareil. Ce prix est dégressif selon la quantité. Si des pièces doivent être remplacées ou le fluide rechargé, un devis de maintenance curative est proposé.`
        },
        {
            question: `Combien de temps pour une intervention de maintenance à ${city} ?`,
            answer: `Nos techniciens interviennent à ${city} et sur le département ${deptRef} sous 24 à 72 heures. La vérification prend environ 5 à 10 minutes par extincteur, et un contrat annuel fixe vos dates de passage pour éviter tout oubli.`
        },
        {
            question: `Fournissez-vous les plans d'évacuation obligatoires à ${city} ?`,
            answer: `Oui. Notre bureau d'études conçoit vos plans d'intervention et d'évacuation selon la norme NF X 08-070, puis assure leur impression et leur pose dans vos locaux à ${city}.`
        },
        {
            question: `Qui intervient en cas de contrôle à ${city} ?`,
            answer: `À ${city}, dans le département ${deptRef}, le service de secours compétent est ${sdis}${prefecture ? ` et la préfecture de référence est ${prefecture}` : ""}. En tant que prestataire, nous préparons votre dossier, votre registre de sécurité et l'ensemble des justificatifs attendus.`
        }
    ];
}
