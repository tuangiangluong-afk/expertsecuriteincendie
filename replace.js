const fs = require('fs');
const path = require('path');

const replacements = [
  // Missing EV terms to clean up
  { from: /Wallbox/gi, to: 'Extincteur' },
  { from: /voiture/gi, to: 'local' },
  { from: /véhicule électrique/gi, to: 'ERP' },
  { from: /véhicules électriques/gi, to: 'locaux professionnels' },
  { from: /kW/g, to: 'kg' },
  { from: /kWh/g, to: 'kg' },
  { from: /kVA/g, to: 'kg' },
  { from: /Tesla/gi, to: 'Eurofeu' },
  { from: /prise renforcée/gi, to: 'alarme incendie' },
  { from: /prises renforcées/gi, to: 'alarmes incendie' },
  { from: /monophasé/gi, to: 'eau' },
  { from: /triphasé/gi, to: 'poudre' },
  { from: /superchargeur/gi, to: 'extincteur industriel' },
  { from: /station de recharge/gi, to: 'système incendie' },
  { from: /délestage/gi, to: 'sécurité' },
  { from: /Green'up/gi, to: 'Sicli' },
  { from: /Schneider/g, to: 'Desautel' },
  { from: /Hager/g, to: 'Andrieu' },
  { from: /Advenir/gi, to: 'Aide' },
  { from: /NFC 15-100/g, to: 'NF EN 3' },
  // Fix weird plural/singulars that might have resulted from previous replacement
  { from: /extincteurs et alarmes/g, to: 'extincteurs' },
  { from: /extincteur électrique/g, to: 'extincteur' },
  { from: /protection électrique/g, to: 'protection incendie' },
  { from: /protection à domicile/g, to: 'sécurité incendie' },
  { from: /tableau électrique/g, to: 'registre de sécurité' },
  { from: /Passez à la vitesse supérieure/g, to: 'Passez à la sécurité maximale' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file)) {
        processDirectory(fullPath);
      }
    } else {
      if (['.ts', '.tsx', '.json', '.css'].includes(path.extname(fullPath))) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let original = content;
        for (const { from, to } of replacements) {
          content = content.replace(from, to);
        }
        if (content !== original) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Updated ${fullPath}`);
        }
      }
    }
  }
}

processDirectory('/Users/marc/Downloads/project-zero/expertsecuriteincendie/src');
console.log('Advanced cleanup complete.');
