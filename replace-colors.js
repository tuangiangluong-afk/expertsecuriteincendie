const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /text-blue-/g, to: 'text-red-' },
  { from: /bg-blue-/g, to: 'bg-red-' },
  { from: /border-blue-/g, to: 'border-red-' },
  { from: /ring-blue-/g, to: 'ring-red-' },
  { from: /from-blue-/g, to: 'from-red-' },
  { from: /to-blue-/g, to: 'to-red-' },
  { from: /via-blue-/g, to: 'via-red-' },
  { from: /d'mainteneurs/g, to: 'de techniciens' },
  { from: /d'mainteneur/g, to: 'de technicien' },
  { from: /Dernières maintenances/g, to: 'Dernières mises en conformité' },
  { from: /themeColor="blue"/g, to: 'themeColor="red"' },
  { from: /themeColor: 'blue'/g, to: "themeColor: 'red'" }
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
console.log('Color and grammar replacement complete.');
