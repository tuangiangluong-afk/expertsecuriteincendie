const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /x-irve-/g, to: 'x-incendie-' },
  { from: /extincteur électrique devis/gi, to: 'extincteur devis' },
  { from: /extincteur électrique/gi, to: 'extincteur' },
  { from: /extincteurs électriques/gi, to: 'extincteurs' },
  { from: /IRVE Brand Colors/g, to: 'Incendie Brand Colors' },
  { from: /irve lyon/g, to: 'incendie lyon' },
  { from: /local électrique/gi, to: 'matériel' },
  { from: /mobilité électrique/gi, to: 'sécurité incendie' },
  { from: /Loi LOM/g, to: 'Loi' },
  { from: /abonnement électrique/g, to: 'contrat de maintenance' },
  { from: /véhicule thermique/g, to: 'risque de feu classique' },
  { from: /puissance électrique/g, to: 'surface' },
  { from: /raccordement au réseau électrique/g, to: 'mise aux normes' },
  { from: /parking électrique/g, to: 'parking' }
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
        }
      }
    }
  }
}

processDirectory('/Users/marc/Downloads/project-zero/expertsecuriteincendie/src');
console.log('Final cleanup complete.');
