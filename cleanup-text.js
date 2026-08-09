const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /d'mainteneurs/g, to: 'de techniciens' },
  { from: /d'mainteneur/g, to: 'de technicien' },
  { from: /protectionz votre véhicule/gi, to: 'Protégez vos locaux' },
  { from: /protection domicile/gi, to: 'Protection locaux professionnels' },
  { from: /protection 80% en 30-40 min/g, to: 'sécurité garantie' },
  { from: /maintenance Incendie/g, to: 'Maintenance Incendie' },
  { from: /passer à l'électrique/gi, to: 'passer aux normes de sécurité' },
  { from: /Eurofeu Wall Connector/g, to: 'Extincteur Poudre 9kg' },
  { from: /Eurofeu/g, to: 'Extincteurs' },
  { from: /mainteneurs partout en France/gi, to: 'Techniciens partout en France' },
  { from: /Véhicules/g, to: 'Solutions' },
  { from: /véhicules/g, to: 'locaux' }
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
      if (['.ts', '.tsx', '.json', '.md'].includes(path.extname(fullPath))) {
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
console.log('Cleanup script complete.');
