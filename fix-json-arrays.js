const fs = require('fs');

// 1. Array for puissances.json
const puissances = [
  {
    "slug": "extincteur-6l-eau",
    "title": "Extincteurs Eau Pulvérisée 6 Litres avec Additif",
    "meta_description": "Tout sur l'extincteur 6L avec additif. Matériel obligatoire en entreprise et ERP. Norme NF EN3.",
    "h1": "Extincteurs 6L Eau Additivée : La Référence en Entreprise",
    "introduction": "L'extincteur 6L eau pulvérisée avec additif est la base de la sécurité incendie dans les locaux professionnels et ERP.",
    "sections": [
      {
        "h2": "Spécifications Techniques NF EN3",
        "content": "<p>Protection efficace contre les feux de classe A (solides) et classe B (liquides). Conforme aux directives du Code du Travail R4227-29.</p>"
      }
    ],
    "faqs": [
      {
        "question": "Tous combien de temps faut-il vérifier un extincteur 6L ?",
        "answer": "La vérification annuelle par un technicien certifié est obligatoire d'après la norme NF S 61-919."
      }
    ]
  }
];
fs.writeFileSync('/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/data/puissances.json', JSON.stringify(puissances, null, 2));

// 2. Array for comparatifs.json
const comparatifs = [
  {
    "slug": "eau-vs-co2",
    "title": "Extincteur Eau Pulvérisée vs Extincteur CO2 : Quel Choix ?",
    "meta_description": "Comparatif complet entre extincteur eau avec additif et extincteur CO2 (Dioxyde de carbone). Utilisation, risques et réglementation.",
    "h1": "Extincteur Eau Additivée vs CO2 : Guide de Choix ERP",
    "introduction": "Comprendre les différences entre l'extincteur à eau (feux de papier, bois, tissus) et l'extincteur CO2 (matériel électrique, armoires informatiques).",
    "sections": [
      {
        "h2": "Domaines d'Application",
        "content": "<p>L'extincteur à eau avec additif protège les surfaces générales. L'extincteur CO2 est indispensable dans les salles de serveurs et armoires électriques sans laisser de résidus.</p>"
      }
    ],
    "faqs": [
      {
        "question": "Peut-on utiliser l'eau sur un feu électrique ?",
        "answer": "L'eau avec additif est pulvérisée sans jet bâton jusqu'à 1000V, mais le CO2 reste fortement recommandé pour éviter d'endommager les composants."
      }
    ],
    "price_estimate": "À partir de 45€ HT avec vérification annuelle incluse."
  }
];
fs.writeFileSync('/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/data/comparatifs.json', JSON.stringify(comparatifs, null, 2));

// 3. Array for marques.json
const marques = [
  {
    "slug": "desautel",
    "name": "Desautel",
    "title": "Matériel de Sécurité Incendie Desautel",
    "meta_description": "Fourniture et maintenance de matériel incendie Desautel. Certifié NF EN3 et APSAD.",
    "h1": "Extincteurs & Équipements Incendie Desautel",
    "introduction": "Desautel est le leader français des extincteurs et systèmes d'extinction automatique.",
    "sections": [
      {
        "h2": "Certifications & Normes Desautel",
        "content": "<p>Tous les équipements Desautel répondent aux normes NF EN3 et sont certifiés par le CNPP.</p>"
      }
    ],
    "faqs": []
  }
];
fs.writeFileSync('/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/data/marques.json', JSON.stringify(marques, null, 2));

// 4. Array for prises.json
const prises = [
  {
    "slug": "extincteur-co2-2kg",
    "name": "CO2 2kg",
    "title": "Extincteur CO2 2kg pour Risques Électriques",
    "meta_description": "Découvrez les caractéristiques de l'extincteur CO2 2kg pour armoires électriques et serveurs.",
    "h1": "Extincteur CO2 2kg : Protection Électrique Sans Résidu",
    "introduction": "Indispensable dans les bureaux, salles informatiques et armoires électriques.",
    "sections": [
      {
        "h2": "Pourquoi choisir le CO2 ?",
        "content": "<p>Le CO2 étouffe le feu instantanément sans laisser de poudre ni d'eau pouvant endommager vos ordinateurs et circuits.</p>"
      }
    ],
    "faqs": []
  }
];
fs.writeFileSync('/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/data/prises.json', JSON.stringify(prises, null, 2));

console.log('Fixed JSON arrays for SEO clusters successfully!');
