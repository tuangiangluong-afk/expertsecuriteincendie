export interface FireOperator {
  slug: string;
  name: string;
  category: "Constructeur & Mainteneur Direct" | "Mainteneur National Multimarque" | "Intégrateur SSI & Détection" | "Bureau de Contrôle & Prévention" | "Réseau Techniciens Indépendants";
  shortDescription: string;
  ratingValue: number;
  reviewCount: number;
  publishedAt: string;
  updatedAt: string;
  priceRange: "€€" | "€€€" | "€€€€";
  pros: string[];
  cons: string[];
  hardwareBrands: string[];
  verdict: string;
  editorialReview: string;
  commissionEstimated: string;
  certifiedAPSAD: boolean;
  certifiedNFService: boolean;
  arbitrageCTA: string;
}

export const OPERATORS: FireOperator[] = [
  {
    slug: "desautel-services",
    name: "Groupe Desautel Services",
    category: "Constructeur & Mainteneur Direct",
    shortDescription: "Numéro 1 français de la fabrication et maintenance d'extincteurs, réseau de 25 agences certifiées APSAD I4 / NF Service.",
    ratingValue: 4.6,
    reviewCount: 1840,
    publishedAt: "2025-10-12",
    updatedAt: "2026-09-24",
    priceRange: "€€€",
    pros: [
      "Fabricant français direct : pièces d'origine toujours en stock (têtes, percuteur, additifs)",
      "Double certification APSAD R4 / NF Service I4-NF074",
      "Formation du personnel sur site et simulateurs de feu écologiques"
    ],
    cons: [
      "Tarifs de contrat annuel plus élevés que les artisans indépendants (15 % à 25 %)",
      "Conditions de renouvellement tacite strictes sur les contrats pluriannuels",
      "Facturation systématique des pièces d'usure en sus de la visite de base"
    ],
    hardwareBrands: ["Desautel", "Gallin", "Espace Incendie"],
    verdict: "La sécurité maximale pour les ERP de 1ère à 3ème catégorie et les sites industriels complexes exigeant une traçabilité fabricant irréprochable.",
    editorialReview: "Desautel cumule le rôle de constructeur historique et de mainteneur national. L'avantage pour l'exploitant d'un ERP ou d'un site tertiaire est la disponibilité immédiate des pièces certifiées NF. Cependant, les contrats de maintenance Desautel intègrent des frais de structure importants : nous conseillons de bien vérifier les forfaits de recharge décennale et d'épreuve hydraulique.",
    commissionEstimated: "Frais de structure réseau et marque intégrés (15 % à 22 % au-dessus des indépendants)",
    certifiedAPSAD: true,
    certifiedNFService: true,
    arbitrageCTA: "Comparez le devis Desautel avec 3 techniciens certifiés APSAD locaux"
  },
  {
    slug: "eurofeu-solutions",
    name: "Eurofeu Solutions & Maintenance",
    category: "Mainteneur National Multimarque",
    shortDescription: "Leader indépendant de la protection incendie en France avec 70 agences, 2 500 collaborateurs et un service global extincteurs, désenfumage et RIA.",
    ratingValue: 4.4,
    reviewCount: 2150,
    publishedAt: "2025-10-29",
    updatedAt: "2026-09-24",
    priceRange: "€€€",
    pros: [
      "Offre multi-lots complète : extincteurs, RIA, désenfumage mécanique/naturel, BAES, portes coupe-feu",
      "Plateforme digitale client avec registre de sécurité dématérialisé temps réel",
      "Couverture géographique totale, y compris en zone rurale"
    ],
    cons: [
      "Pression commerciale sur le remplacement préventif d'appareils de marques concurrentes",
      "Écarts de réactivité constatés selon les agences régionales",
      "Devis de remise en conformité parfois chargés après le premier audit"
    ],
    hardwareBrands: ["Eurofeu", "AMI2S", "PIGHI", "MDP Group"],
    verdict: "Le partenaire idéal pour les entreprises multisites et chaînes de magasins souhaitant centraliser l'ensemble de leurs contrôles sur un interlocuteur unique.",
    editorialReview: "Basé à Senonches en Eure-et-Loir, Eurofeu est un géant français de la sécurité incendie. L'entreprise forme ses propres techniciens vérificateurs et assure la prise en charge de parcs hétérogènes. Sa force réside dans sa capacité à auditer en une seule visite l'extincteur, le désenfumage de cage d'escalier et les blocs autonomes de secours.",
    commissionEstimated: "18 % à 25 % de frais de gestion centralisée et logistique multisite",
    certifiedAPSAD: true,
    certifiedNFService: true,
    arbitrageCTA: "Mettez en concurrence Eurofeu avec des entreprises locales agréées"
  },
  {
    slug: "chubb-france",
    name: "Chubb Fire & Security France",
    category: "Intégrateur SSI & Détection",
    shortDescription: "Filiale française du leader mondial Chubb, exploitant de la marque Sicli et expert des systèmes de détection et d'extinction automatique.",
    ratingValue: 4.3,
    reviewCount: 1320,
    publishedAt: "2025-11-15",
    updatedAt: "2026-09-24",
    priceRange: "€€€€",
    pros: [
      "Expertise inégalée sur les installations SSI complexes (ERP type U, J, R et IGH)",
      "Catalogue Sicli complet incluant la gamme INtégral sans PFAS fluorés",
      "Télésurveillance incendie 24/7 reliée aux centres opérationnels d'incendie"
    ],
    cons: [
      "Positionnement tarifaire très élevé sur les parcs d'extincteurs standards",
      "Processus administratif lourd pour la planification d'interventions simples",
      "Moins adapté aux TPE et commerces de proximité"
    ],
    hardwareBrands: ["Sicli", "Chubb", "Kidde", "Edwards"],
    verdict: "Incontournable pour les sièges sociaux, hôpitaux, musées et data centers nécessitant une intégration SSI de haute technicité.",
    editorialReview: "Chubb Fire & Security France est l'un des acteurs les plus prestigieux du secteur. Porteur de la marque d'extincteurs Sicli, Chubb se distingue par sa maîtrise des risques spéciaux (extinction par gaz inerte, brouillard d'eau, détection précoce par aspiration). Pour un commerce ou un immeuble d'habitation, le coût d'un contrat Chubb reste toutefois disproportionné.",
    commissionEstimated: "25 % à 35 % de marge de groupe international et bureau d'études",
    certifiedAPSAD: true,
    certifiedNFService: true,
    arbitrageCTA: "Évitez les tarifs grands groupes : comparez avec un installateur régional"
  },
  {
    slug: "siemens-fire-safety",
    name: "Siemens Fire Safety France",
    category: "Intégrateur SSI & Détection",
    shortDescription: "Division sécurité incendie du groupe Siemens, référence mondiale de la détection incendie adressable et des Centrales SSI Catégorie A.",
    ratingValue: 4.7,
    reviewCount: 780,
    publishedAt: "2025-12-05",
    updatedAt: "2026-09-24",
    priceRange: "€€€€",
    pros: [
      "Technologie de détection optique et thermique ultra-fiable (gamme Cerberus PRO)",
      "Zéro fausse alerte grâce aux algorithmes d'analyse ASAtechnology",
      "Accompagnement rigoureux lors des commissions de sécurité préfectorales"
    ],
    cons: [
      "Systèmes propriétaires verrouillés nécessitant impérativement la maintenance Siemens",
      "Coût élevé des cartes électroniques et détecteurs de remplacement",
      "Délais d'approvisionnement sur composants spécifiques"
    ],
    hardwareBrands: ["Siemens Cerberus PRO", "Sinteso", "Sinorix"],
    verdict: "La Rolls de la détection incendie pour les ERP de catégories 1 à 3, avec un coût de détention à long terme à anticiper dès l'installation.",
    editorialReview: "Siemens domine le marché de la détection incendie de pointe. Leurs centrales de mise en sécurité incendie (CMSI) et équipements d'alarme sont déployés dans les plus grands aéroports, hôpitaux et centres commerciaux. Le point d'attention majeur est le verrouillage technologique : changer de mainteneur est très difficile une fois le matériel Siemens installé.",
    commissionEstimated: "30 % à 40 % de frais technologiques et maintenance sous licence",
    certifiedAPSAD: true,
    certifiedNFService: true,
    arbitrageCTA: "Faites auditer votre centrale SSI par un bureau d'études indépendant"
  },
  {
    slug: "securitas-incendie",
    name: "Securitas Fire & Safety",
    category: "Bureau de Contrôle & Prévention",
    shortDescription: "Spécialiste de la prévention des risques, agents de sécurité incendie SSIAP 1/2/3 et gestion déléguée de parcs matériels.",
    ratingValue: 4.2,
    reviewCount: 950,
    publishedAt: "2025-12-22",
    updatedAt: "2026-09-24",
    priceRange: "€€€",
    pros: [
      "Combinaison humaine et technique : agents SSIAP en poste + vérification du matériel",
      "Gestion rigoureuse du registre de sécurité et des exercices d'évacuation",
      "Astreinte nationale et réactivité en cas de panne de centrale d'alarme"
    ],
    cons: [
      "Sous-traite souvent la maintenance lourde des extincteurs à des partenaires",
      "Forte rotation du personnel d'intervention sur les sites clients",
      "Offre moins pertinente si vous n'avez pas besoin de gardiennage physique"
    ],
    hardwareBrands: ["Desautel", "Eurofeu", "Sicli", "Chubb"],
    verdict: "Recommandé pour les centres commerciaux, tours IGH et entrepôts logistiques cumulant gardiennage SSIAP et suivi réglementaire.",
    editorialReview: "Securitas Fire & Safety apporte une réponse globale intégrant la présence d'agents qualifiés SSIAP et le contrôle des dispositifs d'évacuation. Si votre besoin se résume à la vérification annuelle de 10 extincteurs, vous paierez des frais de structure surdimensionnés.",
    commissionEstimated: "20 % à 28 % de marge de coordination et sécurité humaine",
    certifiedAPSAD: false,
    certifiedNFService: true,
    arbitrageCTA: "Séparez gardiennage et maintenance technique pour réduire vos coûts de 30 %"
  },
  {
    slug: "def-reseau",
    name: "Réseau DEF",
    category: "Intégrateur SSI & Détection",
    shortDescription: "Premier réseau français indépendant de sécurité incendie, fabricant de SSI depuis 1958 et mainteneur certifié APSAD I7 / F7.",
    ratingValue: 4.5,
    reviewCount: 1120,
    publishedAt: "2026-01-10",
    updatedAt: "2026-09-24",
    priceRange: "€€€",
    pros: [
      "Fabrication française des centrales SSI, détecteurs et tableaux répétiteurs",
      "Pérennité des gammes : pièces de rechange garanties pendant plus de 15 ans",
      "Excellente relation client et techniciens hautement qualifiés"
    ],
    cons: [
      "Principalement orienté détection et SSI, lot extincteurs souvent en complément",
      "Tarifs de programmation logicielle élevés lors des extensions de bâtiment",
      "Présence inégale dans certaines agglomérations moyennes"
    ],
    hardwareBrands: ["DEF", "Bouyer", "Faare", "Souchier-Boullet"],
    verdict: "Le champion national du SSI indépendant, garantissant une alternative souveraine aux multinationales américaines ou allemandes.",
    editorialReview: "Réseau DEF est une entreprise familiale française devenue un acteur majeur de la détection incendie en Europe. Leurs matériels sont réputés pour leur robustesse et leur simplicité de maintenance. Pour les écoles, collèges, cliniques et bâtiments tertiaires, DEF offre un équilibre remarquable entre conformité et durabilité.",
    commissionEstimated: "15 % à 22 % de marge constructeur",
    certifiedAPSAD: true,
    certifiedNFService: true,
    arbitrageCTA: "Comparez les coûts de contrat DEF avec des mainteneurs SSI agréés"
  },
  {
    slug: "stanley-security-fire",
    name: "Stanley Security Fire Solutions",
    category: "Mainteneur National Multimarque",
    shortDescription: "Spécialiste de la maintenance multimarque et de la sécurité électronique intégrée (incendie, intrusion, contrôle d'accès).",
    ratingValue: 4.1,
    reviewCount: 680,
    publishedAt: "2026-01-28",
    updatedAt: "2026-09-24",
    priceRange: "€€€",
    pros: [
      "Guichet unique pour l'alarme intrusion, le contrôle d'accès et la sécurité incendie",
      "Contrats de télésurveillance et levée de doute vidéo couplés à l'incendie",
      "Rapports de visite détaillés conformes aux exigences des assureurs"
    ],
    cons: [
      "Cœur de métier historique dans la sûreté électronique, l'incendie est une diversification",
      "Sous-traitance de l'épreuve des extincteurs sur certaines régions",
      "Support téléphonique parfois délocalisé"
    ],
    hardwareBrands: ["Desautel", "Chubb", "Honeywell", "Siemens"],
    verdict: "Adapté aux entreprises du secteur bancaire, retail et tertiaire qui souhaitent un contrat global sûreté + incendie.",
    editorialReview: "Stanley Security Fire Solutions propose une approche convergente où les alarmes incendie sont supervisées par les mêmes postes de sécurité que la vidéosurveillance. Cette formule présente des avantages opérationnels pour les grandes enseignes, mais les coûts annexes de maintenance extincteurs sont souvent supérieurs aux prix du marché.",
    commissionEstimated: "20 % à 26 % de marge d'intégration multisystèmes",
    certifiedAPSAD: true,
    certifiedNFService: false,
    arbitrageCTA: "Mettez en concurrence votre contrat sécurité incendie avec un pro local"
  },
  {
    slug: "rot-securite",
    name: "Rot Sécurité Incendie Services",
    category: "Constructeur & Mainteneur Direct",
    shortDescription: "Fabricant historique français d'extincteurs NF et de colonnes sèches basé en Seine-Maritime, réseau de maintenance direct.",
    ratingValue: 4.4,
    reviewCount: 520,
    publishedAt: "2026-02-14",
    updatedAt: "2026-09-24",
    priceRange: "€€",
    pros: [
      "Excellent rapport qualité/prix : matériel NF EN3 robuste et tarifs pièces abordables",
      "Spécialiste reconnu des extincteurs pour le transport, l'industrie et les garages",
      "Disponibilité rapide des recharges poudre et eau additivée"
    ],
    cons: [
      "Notoriété moindre auprès des syndics de copropriété par rapport à Desautel",
      "Moins de services digitaux (registre papier souvent conservé)",
      "Réseau d'agences directes moins dense dans le Sud-Est"
    ],
    hardwareBrands: ["Rot", "Rot Sécurité", "Extincteurs NF"],
    verdict: "L'un des meilleurs choix économiques pour s'équiper en matériel français certifié NF sans payer la prime de marque des géants.",
    editorialReview: "Rot Sécurité est une valeur sûre du paysage industriel français. Leurs appareils sont conçus pour durer, avec des corps en acier haute qualité et une excellente résistance à la corrosion. Les tarifs de vérification annuelle sont parmi les plus compétitifs des constructeurs nationaux.",
    commissionEstimated: "10 % à 15 % de marge constructeur directe",
    certifiedAPSAD: true,
    certifiedNFService: true,
    arbitrageCTA: "Chiffrez la pose et maintenance de matériel Rot avec nos techniciens locaux"
  },
  {
    slug: "batorlux-securite",
    name: "Batorlux Sécurité Incendie",
    category: "Mainteneur National Multimarque",
    shortDescription: "Entreprise nationale spécialisée dans la maintenance des RIA, des portes coupe-feu et du désenfumage naturel en copropriété et tertiaire.",
    ratingValue: 4.3,
    reviewCount: 410,
    publishedAt: "2026-03-02",
    updatedAt: "2026-09-24",
    priceRange: "€€€",
    pros: [
      "Expertise reconnue sur les Robinet d'Incendie Armés (RIA) et les essais de pression/débit",
      "Entretien rigoureux des treuils et exutoires de fumée en cage d'escalier",
      "Contrats clairs et adaptés aux contraintes des conseils syndicaux"
    ],
    cons: [
      "Délais d'intervention un peu longs en cas de demande de dépannage urgent",
      "Catalogue d'extincteurs principalement axé sur la revente de marques tierces",
      "Devis initiaux parfois peu détaillés sur les pièces d'usure des portes coupe-feu"
    ],
    hardwareBrands: ["Eurofeu", "Desautel", "Souchier", "Madicob"],
    verdict: "Très compétent pour la maintenance des équipements fixes de copropriété (désenfumage + colonnes sèches + RIA).",
    editorialReview: "Batorlux s'est positionné sur les équipements de sécurité souvent négligés : les RIA et les volets de désenfumage. En copropriété, un volet bloqué lors d'un contrôle de la commission de sécurité peut entraîner une mise en demeure du syndic. Batorlux assure des essais réels avec déclenchement pneumatique et remplacement des cartouches CO2.",
    commissionEstimated: "15 % à 20 % de frais d'intervention technique spécialisée",
    certifiedAPSAD: true,
    certifiedNFService: true,
    arbitrageCTA: "Comparez les forfaits RIA et désenfumage avec des prestataires régionaux"
  },
  {
    slug: "proxiserve-incendie",
    name: "Proxiserve Sécurité Bâtiment",
    category: "Mainteneur National Multimarque",
    shortDescription: "Branche sécurité bâtiment de Proxiserve, assurant le contrôle des extincteurs et blocs BAES dans plus de 200 000 logements collectifs.",
    ratingValue: 4.0,
    reviewCount: 1650,
    publishedAt: "2026-03-20",
    updatedAt: "2026-09-24",
    priceRange: "€€",
    pros: [
      "Maillage territorial très dense avec des techniciens de proximité habitués aux copropriétés",
      "Offres groupées chauffage + VMC + sécurité incendie pour les syndics",
      "Tarifs très compétitifs sur les parcs d'extincteurs standard en parking souterrain"
    ],
    cons: [
      "Techniciens parfois généralistes avec une expertise SSI de niveau inférieur aux spécialistes",
      "Signalements réguliers de passages trop rapides lors des visites de vérification",
      "Moins pointu sur les risques industriels ou les ERP de catégorie 1"
    ],
    hardwareBrands: ["Desautel", "Eurofeu", "Sicli", "Ura", "Legrand"],
    verdict: "Une solution économique pour les syndics de copropriété souhaitant mutualiser l'entretien de leurs parkings et parties communes.",
    editorialReview: "Proxiserve capitalise sur ses contrats d'entretien de chauffage collectif pour proposer des extensions de service vers les extincteurs et les blocs de secours BAES. C'est pratique et économique, mais pour les ERP recevant du public, nous recommandons de vérifier que le technicien intervenant détient bien son diplôme CAP AVAE ou sa certification APSAD nominative.",
    commissionEstimated: "10 % à 18 % de marge de gestion immobilière",
    certifiedAPSAD: false,
    certifiedNFService: true,
    arbitrageCTA: "Vérifiez la qualification réelle de vos techniciens et comparez les devis"
  },
  {
    slug: "socotec-incendie",
    name: "SOCOTEC Contrôle & Sécurité Incendie",
    category: "Bureau de Contrôle & Prévention",
    shortDescription: "Organisme de contrôle technique agréé par le Ministère de l'Intérieur, spécialiste des vérifications réglementaires Q18, Q4 et SSI.",
    ratingValue: 4.8,
    reviewCount: 890,
    publishedAt: "2026-04-10",
    updatedAt: "2026-09-24",
    priceRange: "€€€€",
    pros: [
      "Avis d'expert tiers de confiance 100 % impartial : SOCOTEC ne vend aucun matériel",
      "Émission des rapports officiels Q18 (électricité) et Q4 demandés par les assureurs et commissions",
      "Accompagnement décisif avant l'ouverture au public d'un ERP"
    ],
    cons: [
      "Ne réalise pas les travaux de mise en conformité : obligation d'engager un installateur après le rapport",
      "Tarifs de mission d'audit élevés (forfait de vacation d'ingénieur)",
      "Rigueur intransigeante : la moindre non-conformité est consignée au registre"
    ],
    hardwareBrands: ["Tous fabricants certifiés NF / CE / APSAD"],
    verdict: "Indispensable avant le passage de la commission de sécurité pour sécuriser l'avis favorable d'exploitation de votre établissement.",
    editorialReview: "SOCOTEC n'est pas un mainteneur d'extincteurs : c'est le gendarme technique de votre installation. Mandater SOCOTEC pour un audit à blanc avant le passage de la commission préfectorale évite les fermetures administratives. Leur rapport a une valeur probante devant les compagnies d'assurance en cas de sinistre.",
    commissionEstimated: "Honoraires de contrôle technique réglementaire agréé (sans vente de travaux)",
    certifiedAPSAD: true,
    certifiedNFService: true,
    arbitrageCTA: "Préparez votre visite de commission de sécurité avec un audit certifié"
  },
  {
    slug: "artisans-pompiers-independants",
    name: "Réseau Techniciens Vérificateurs Indépendants (AVAE)",
    category: "Réseau Techniciens Indépendants",
    shortDescription: "Groupement de techniciens qualifiés CAP AVAE et anciens sapeurs-pompiers indépendants, assurant la maintenance en direct sans intermédiaire.",
    ratingValue: 4.9,
    reviewCount: 2840,
    publishedAt: "2026-05-02",
    updatedAt: "2026-09-24",
    priceRange: "€€",
    pros: [
      "Tarifs les plus compétitifs du marché (12 € à 22 € HT par extincteur contre 35 € en grand groupe)",
      "Pédagogie de terrain exceptionnelle : démonstration réelle d'extinction offerte au gérant",
      "Zéro surcoût d'intermédiation : devis direct, pièces au prix coûtant et registre signé sur place"
    ],
    cons: [
      "Moins adapté aux très grands comptes nationaux avec 500 magasins à centraliser",
      "Délais de prise de rendez-vous parfois dépendants du planning de l'artisan local",
      "Tous ne disposent pas d'une application mobile pour les syndics de copropriété"
    ],
    hardwareBrands: ["Desautel", "Rot", "Sicli", "Eurofeu", "Legrand", "Kaufman"],
    verdict: "La recommandation numéro 1 pour les commerces, restaurants, cabinets médicaux et PME : le meilleur service au prix le plus juste.",
    editorialReview: "Faire appel à un technicien vérificateur indépendant titulaire du CAP AVAE (Agent Vérificateur d'Appareils Extincteurs) est la stratégie la plus vertueuse. Ce professionnel local met son savoir-faire et son éthique de sécurité au service de votre établissement, sans objectifs de vente forcée de recharges imposés par un siège parisien.",
    commissionEstimated: "0 % de surcommission de grand groupe (devis direct artisan vérificateur)",
    certifiedAPSAD: true,
    certifiedNFService: true,
    arbitrageCTA: "Obtenez 3 devis directs de techniciens certifiés AVAE près de chez vous"
  }
];

export interface FireBrand {
  slug: string;
  name: string;
  category: "Extincteurs Portables" | "Extincteurs & SSI" | "Détection & Systèmes Fixes";
  origin: string;
  warranty: string;
  keyProducts: string[];
  certifications: string[];
  description: string;
}

export const FIRE_BRANDS: FireBrand[] = [
  {
    slug: "desautel",
    name: "Desautel",
    category: "Extincteurs Portables",
    origin: "France",
    warranty: "Garantie constructeur 5 ans / Épreuve décennale",
    keyProducts: ["Extincteur Eau Pulvérisée 6L / 9L", "Extincteur CO2 2kg / 5kg", "Extincteurs Poudre ABC", "Systèmes automatiques cuisine"],
    certifications: ["NF EN3", "NF074", "APSAD R4", "Marquage CE"],
    description: "Leader historique français de la fabrication d'extincteurs et de systèmes d'extinction automatique pour les ERP et les locaux professionnels."
  },
  {
    slug: "sicli",
    name: "Sicli (Groupe Chubb)",
    category: "Extincteurs Portables",
    origin: "France / Chubb International",
    warranty: "Garantie 5 ans / Réseau Chubb France",
    keyProducts: ["Gamme INgénio Eau & Poudre", "Gamme INtégral sans fluor (PFAS Free)", "Extincteur sur roues INstant E50"],
    certifications: ["NF EN3", "APSAD R4", "CE", "Sans composés fluorés"],
    description: "Marque emblématique de la sécurité incendie française, pionnière des agents extincteurs écologiques sans substances PFAS fluorées."
  },
  {
    slug: "eurofeu",
    name: "Eurofeu",
    category: "Extincteurs & SSI",
    origin: "France (Senonches)",
    warranty: "Garantie 5 ans constructeur",
    keyProducts: ["Extincteurs eau additivée 6L/9L", "Extincteurs CO2 aluminium", "Exutoires de fumée et treuils", "Blocs BAES"],
    certifications: ["NF EN3", "NF Service I4", "APSAD R4/R12/R17", "CE"],
    description: "Fabricant et mainteneur global couvrant à la fois les extincteurs portables, le désenfumage naturel et l'éclairage de sécurité."
  },
  {
    slug: "rot",
    name: "Rot Sécurité Incendie",
    category: "Extincteurs Portables",
    origin: "France (Seine-Maritime)",
    warranty: "Garantie 5 ans / Cuve acier embouti",
    keyProducts: ["Extincteurs portables eau et poudre", "Extincteurs marine et véhicules", "Colonnes sèches et robinetterie"],
    certifications: ["NF EN3", "Bureau Veritas", "CE", "APSAD"],
    description: "Constructeur français reconnu pour la robustesse extrême de ses extincteurs en milieu sévère (parkings, industrie, transports)."
  },
  {
    slug: "chubb",
    name: "Chubb Fire Solutions",
    category: "Détection & Systèmes Fixes",
    origin: "International / France",
    warranty: "Garantie contractuelle SSI",
    keyProducts: ["Systèmes de détection précoce", "Extinction gaz inerte FM200 / Novec", "Centrales d'alarme Type 1"],
    certifications: ["APSAD I7/F7", "NF SSI", "ISO 9001"],
    description: "Spécialiste mondial des risques spéciaux, de l'extinction automatique par gaz et de la protection des infrastructures critiques."
  },
  {
    slug: "andrieu",
    name: "Andrieu Sécurité",
    category: "Extincteurs Portables",
    origin: "France",
    warranty: "Garantie 5 ans constructeur",
    keyProducts: ["Extincteurs à pression permanente", "Extincteurs à pression auxiliaire", "Matériel RIA"],
    certifications: ["NF EN3", "APSAD R4", "CE"],
    description: "Fabricant français d'extincteurs portables et d'équipements de première intervention pour le tertiaire et les copropriétés."
  }
];

export interface FireDuel {
  slug: string;
  title: string;
  subjectA: string;
  subjectB: string;
  category: "Choix Extincteurs" | "Systèmes SSI & Éclairage" | "Contrats & Maintenance";
  winner: string;
  summary: string;
  criteria: { label: string; scoreA: string; scoreB: string; note: string }[];
  verdict: string;
}

export const FIRE_DUELS: FireDuel[] = [
  {
    slug: "eau-pulverisee-vs-co2",
    title: "Extincteur Eau Pulvérisée avec Additif vs Extincteur CO2",
    subjectA: "Eau Pulvérisée avec Additif",
    subjectB: "Dioxyde de Carbone (CO2)",
    category: "Choix Extincteurs",
    winner: "Complémentaires (Eau pour les locaux, CO2 pour l'électricité)",
    summary: "L'extincteur à eau traite les feux de solides et liquides (Classes A et B) sur les surfaces générales, tandis que le CO2 est indispensable sur les armoires électriques et serveurs sans laisser de trace.",
    criteria: [
      { label: "Classes de feux couvertes", scoreA: "Feux de solides (bois, papier, tissus) et liquides", scoreB: "Feux de liquides et feux d'origine électrique", note: "L'eau additivée est l'appareil de base imposé par le Code du travail." },
      { label: "Dégâts résiduels après utilisation", scoreA: "Mouillage important et corrosion potentielle", scoreB: "Zéro résidu (le gaz s'évapore immédiatement)", note: "Le CO2 ne détruit pas les composants électroniques." },
      { label: "Obligation réglementaire ERP", scoreA: "1 appareil 6L par tranche de 200 m²", scoreB: "1 appareil à proximité immédiate du TGBT", note: "Le CO2 protège les risques localisés d'origine électrique." },
      { label: "Portée du jet extincteur", scoreA: "3 à 5 mètres", scoreB: "1 à 1,5 mètre (sensible au vent)", note: "L'utilisateur doit être plus proche avec un CO2." }
    ],
    verdict: "La réglementation n'oppose pas ces deux appareils : tout établissement doit disposer d'eau additivée pour la protection générale et de CO2 à côté des tableaux électriques."
  },
  {
    slug: "extincteur-poudre-abc-vs-eau-additif",
    title: "Extincteur Poudre ABC vs Eau avec Additif",
    subjectA: "Extincteur Poudre ABC",
    subjectB: "Extincteur Eau Pulvérisée + Additif",
    category: "Choix Extincteurs",
    winner: "Eau avec Additif en intérieur tertiaire / Poudre en garage & extérieur",
    summary: "La poudre étouffe tous les feux (A, B, C y compris gaz) mais crée un nuage corrosif qui détruit le matériel de bureau, alors que l'eau additivée est propre et ciblée.",
    criteria: [
      { label: "Polyvalence d'extinction", scoreA: "Maximale (solides, liquides et gaz sous pression)", scoreB: "Solides et liquides uniquement", note: "La poudre est obligatoire pour les feux de gaz (chaufferies, citernes)." },
      { label: "Dégâts collatéraux en intérieur", scoreA: "Catastrophiques (poussière corrosive abrasive)", scoreB: "Localisés à la zone mouillée", note: "La poudre s'infiltre dans tous les circuits électroniques et climatisations." },
      { label: "Visibilité pendant l'évacuation", scoreA: "Visibilité nulle (nuage opaque étouffant)", scoreB: "Visibilité préservée", note: "Déconseillé dans les espaces confinés et couloirs d'évacuation." },
      { label: "Usage recommandé", scoreA: "Parkings souterrains, garages, chaufferies, camions", scoreB: "Bureaux, commerces, hôtels, habitations", note: "La poudre est idéale pour les risques d'hydrocarbures extérieurs." }
    ],
    verdict: "Bannissez la poudre dans les bureaux et commerces : préférez impérativement l'eau avec additif en intérieur et réservez la poudre aux parkings et chaufferies gaz."
  },
  {
    slug: "ssi-type-1-vs-ssi-type-4",
    title: "Système de Sécurité Incendie SSI Type 1 vs Type 4",
    subjectA: "SSI Type 1 (Détection automatique adressable)",
    subjectB: "SSI Type 4 (Alarme manuelle autonome)",
    category: "Systèmes SSI & Éclairage",
    winner: "Selon la catégorie et l'effectif ERP (Règlement de sécurité)",
    summary: "Le SSI Type 1 intègre des détecteurs de fumée automatiques reliés à un CMSI pour les grands ERP, tandis que le Type 4 est un bloc autonome déclenché manuellement pour les petits ERP de 5ème catégorie.",
    criteria: [
      { label: "Déclenchement de l'alarme", scoreA: "Automatique (détecteurs) + Déclencheurs manuels", scoreB: "Manuel uniquement (boîtier bris de glace)", note: "Le Type 1 protège même en l'absence de témoins humains." },
      { label: "Mise en sécurité automatique", scoreA: "Oui (fermeture portes coupe-feu, désenfumage)", scoreB: "Non (alarme sonore d'évacuation pure)", note: "Le CMSI du Type 1 compartimente le bâtiment." },
      { label: "Coût d'installation", scoreA: "8 000 € à 50 000 € selon surfaces", scoreB: "300 € à 1 500 €", note: "Le Type 4 est économique et s'installe sans câblage lourd." },
      { label: "Obligation réglementaire", scoreA: "ERP avec locaux à sommeil (hôtels, hôpitaux, internats)", scoreB: "Petits commerces, restaurants < 200 personnes", note: "Le type de SSI est strictement imposé par le classement ERP." }
    ],
    verdict: "Respectez scrupuleusement la notice de sécurité de votre ERP : un Type 4 suffit pour un petit commerce, mais les établissements avec couchage exigent un Type 1 avec SSIAP."
  },
  {
    slug: "baes-autonome-vs-source-centrale",
    title: "Blocs Autonomes BAES vs Éclairage sur Source Centrale (LSC)",
    subjectA: "BAES Autonomes (Batterie intégrée)",
    subjectB: "Système à Source Centrale (Batterie d'accumulateurs)",
    category: "Systèmes SSI & Éclairage",
    winner: "BAES pour petits et moyens sites / Source centrale pour grands ERP",
    summary: "Les blocs BAES sont autonomes et simples à installer un par un, alors que la source centrale alimente tous les luminaires de sécurité depuis un local technique dédié.",
    criteria: [
      { label: "Complexité d'installation", scoreA: "Faible (raccordement sur circuit d'éclairage local)", scoreB: "Élevée (câbles résistants au feu CR1 dédiés)", note: "Les BAES s'adaptent facilement en rénovation." },
      { label: "Coût de maintenance annuelle", scoreA: "Remplacement régulier des batteries ou blocs complets", scoreB: "Entretien centralisé d'une seule armoire de batteries", note: "La source centrale réduit le temps d'intervention sur site vaste." },
      { label: "Robustesse en cas de sinistre", scoreA: "Chaque bloc fonctionne même si les câbles voisins brûlent", scoreB: "Si la ligne centrale est coupée, plusieurs blocs s'éteignent", note: "Les BAES garantissent une résilience point par point." },
      { label: "Seuil de rentabilité", scoreA: "Rentable jusqu'à 80-100 blocs", scoreB: "Recommandé au-delà de 150 points d'éclairage", note: "Centres commerciaux, hôpitaux et gares privilégient la source centrale." }
    ],
    verdict: "Pour 95 % des commerces, copropriétés et bureaux, les BAES adressables SATI (Système Automatique de Test Intégré) sont la solution la plus souple et économique."
  },
  {
    slug: "maintenance-fabricant-vs-mainteneur-multimarque",
    title: "Maintenance Constructeur vs Prestataire Multimarque Indépendant",
    subjectA: "Constructeur Direct (Desautel, Eurofeu, Sicli)",
    subjectB: "Mainteneur Multimarque Certifié AVAE",
    category: "Contrats & Maintenance",
    winner: "Mainteneur Indépendant (pour le prix et l'objectivité)",
    summary: "Le constructeur garantit les pièces d'origine mais pratique des tarifs élevés avec vente incitative d'appareils neufs, tandis que l'indépendant entretient votre parc existant au juste prix.",
    criteria: [
      { label: "Tarif de la visite annuelle", scoreA: "25 € à 45 € HT par appareil", scoreB: "12 € à 22 € HT par appareil", note: "Économie de 35 % à 50 % sur la facture globale." },
      { label: "Objectivité sur le renouvellement", scoreA: "Tendance à déclasser pour vendre du neuf", scoreB: "Réparation et recharge priorisées tant que possible", note: "Un extincteur NF peut être rechargé et éprouvé jusqu'à 20 ans." },
      { label: "Validité juridique du contrôle", scoreA: "100 % conforme (assurance & commission)", scoreB: "100 % conforme si certificat APSAD ou CAP AVAE", note: "La signature sur le registre de sécurité a exactement la même valeur légale." },
      { label: "Disponibilité des pièces multimarques", scoreA: "Exclusivité sur sa propre marque", scoreB: "Catalogue de pièces détachées universelles certifiées", note: "L'indépendant entretient Desautel, Eurofeu et Sicli sans discrimination." }
    ],
    verdict: "À compétences et certifications équivalentes, le technicien indépendant certifié AVAE vous fait économiser des centaines d'euros chaque année sans compromis sur la sécurité."
  },
  {
    slug: "desenfumage-naturel-vs-desenfumage-mecanique",
    title: "Désenfumage Naturel (Exutoires Skydome) vs Désenfumage Mécanique",
    subjectA: "Désenfumage Naturel (Treuil / Pneumatique)",
    subjectB: "Désenfumage Mécanique (Extracteurs motorisés)",
    category: "Systèmes SSI & Éclairage",
    winner: "Naturel en toiture / Mécanique en sous-sol et circulations aveugles",
    summary: "Le désenfumage naturel utilise le tirage thermique et l'ouverture d'exutoires en toiture, tandis que le désenfumage mécanique force l'extraction des fumées via des ventilateurs 400°C 2h.",
    criteria: [
      { label: "Consommation électrique de secours", scoreA: "Zéro (fonctionne par gravité et bouteille CO2)", scoreB: "Nécessite une alimentation électrique de sécurité (AES)", note: "Le désenfumage mécanique exige des ventilateurs secourus." },
      { label: "Efficacité en sous-sol ou parking", scoreA: "Inopérant sans accès direct à l'air libre", scoreB: "Obligatoire et parfaitement calibré", note: "Les parkings souterrains exigent des extracteurs motorisés puissants." },
      { label: "Fréquence et coût d'entretien", scoreA: "Vérification annuelle du treuil et joint d'exutoire", scoreB: "Contrôle des moteurs, courroies, pressostats et volets", note: "Le désenfumage mécanique est plus coûteux en maintenance." },
      { label: "Impact architectural", scoreA: "Skydome visible en toiture", scoreB: "Gaines coupe-feu et caissons en toiture ou terrasse", note: "Le choix dépend de la configuration structurelle du bâtiment." }
    ],
    verdict: "Privilégiez le désenfumage naturel dès que la toiture est accessible (cages d'escalier d'immeubles). Le désenfumage mécanique est incontournable pour les parkings et sous-sols."
  }
];
