const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /Jusqu'à 300€ de crédit d'impôt \+ Prime NF \(jusqu'à 960€\)/gi, to: 'Audit gratuit & conformité NF EN3' },
  { from: /Jusqu'à 960€ d'aides/gi, to: 'Audit & Devis Gratuit 24h' },
  { from: /crédit d'impôt 75%/gi, to: 'Audit gratuit' },
  { from: /Crédit d'impôt 500€/gi, to: 'Conformité Code du Travail' },
  { from: /Crédit d'Impôt/gi, to: 'Réglementation Incendie' },
  { from: /7kg à 22kg/gi, to: 'Eau, CO2 et Poudre' },
  { from: /7.4-22kg/gi, to: 'Eau & CO2' },
  { from: /7\.4kg eaue/gi, to: 'eau pulvérisée 6L' },
  { from: /22kg poudree/gi, to: 'CO2 ou Poudre' },
  { from: /chargeurs rapides DC 50kg/gi, to: 'systèmes d extinction automatique' },
  { from: /Prime NF/gi, to: 'Certification NF' },
  { from: /garage ou parking privé/gi, to: 'locaux professionnels et copropriétés' }
];

function cleanFile(filePath) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (const { from, to } of replacements) {
      content = content.replace(from, to);
    }
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
}

cleanFile('/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/lib/pseo.ts');
cleanFile('/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/lib/pseo-b2b.ts');
cleanFile('/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/lib/seo-data.ts');
cleanFile('/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/lib/sites-config.ts');
