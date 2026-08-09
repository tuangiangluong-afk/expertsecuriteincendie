const fs = require('fs');
const path = require('path');

const replacements = [
  // apostrophe issues
  { from: /d'mainteneurs/gi, to: 'de techniciens' },
  { from: /d&apos;mainteneurs/gi, to: 'de techniciens' },
  { from: /d'mainteneur/gi, to: 'de technicien' },
  { from: /d&apos;mainteneur/gi, to: 'de technicien' },
  { from: /mainteneurs/gi, to: 'techniciens' },
  { from: /mainteneur/gi, to: 'technicien' },
  
  // weird texts
  { from: /protectionz votre véhicule/gi, to: 'Protégez vos locaux' },
  { from: /protection domicile/gi, to: 'Protection locaux professionnels' },
  { from: /maintenance Incendie/g, to: 'Maintenance Incendie' },
  { from: /passer à l'électrique/gi, to: 'passer aux normes incendie' },
  { from: /passer à l&apos;électrique/gi, to: 'passer aux normes incendie' },
  { from: /Véhicules/g, to: 'Solutions' },
  { from: /véhicules/gi, to: 'locaux' },
  { from: /Eurofeu/gi, to: 'Andrieu' }, // Replace Eurofeu with a real/different brand or generic if user doesn't want Eurofeu
  { from: /Andrieu Wall Connector/gi, to: 'Extincteur CO2' },
  { from: /borne recharge/gi, to: 'extincteur' },
  
  // capitalization
  { from: /techniciens partout en France/g, to: 'Techniciens partout en France' },
  
  // Footer links (securiteincendielyon.fr)
  { from: /securiteincendielyon\.fr/gi, to: 'expertsecuriteincendie.fr/ville/lyon' },
  { from: /securiteincendieannecy\.fr/gi, to: 'expertsecuriteincendie.fr/ville/annecy' },
  { from: /securiteincendiebordeaux\.fr/gi, to: 'expertsecuriteincendie.fr/ville/bordeaux' },
  { from: /securiteincendiebiarritz\.fr/gi, to: 'expertsecuriteincendie.fr/ville/biarritz' },
  { from: /securiteincendietoulouse\.fr/gi, to: 'expertsecuriteincendie.fr/ville/toulouse' },
  { from: /securiteincendiemontpellier\.fr/gi, to: 'expertsecuriteincendie.fr/ville/montpellier' }
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
