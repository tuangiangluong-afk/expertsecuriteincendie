const fs = require('fs');
let content = fs.readFileSync('src/lib/sites-config.ts', 'utf8');

// Replace TEMPLATE_AIDES
content = content.replace(/const TEMPLATE_AIDES = \[[^\]]*\];/g, `const TEMPLATE_AIDES = [
    "Mise en conformité (Copropriété)",
    "Audit Sécurité Offert",
    "Déduction Fiscale B2B"
];`);

// Replace TEMPLATE_FEATURES
content = content.replace(/const TEMPLATE_FEATURES = \[[^\]]*\];/g, `const TEMPLATE_FEATURES = [
    "Devis gratuit en 24h",
    "Installation & Maintenance",
    "Conformité Registre Sécurité",
    "SAV 7j/7"
];`);

content = content.replace(/Advenir/gi, 'Aide');
content = content.replace(/NFC 15-100/g, 'NF EN 3');
content = content.replace(/IRVE/g, 'Incendie');

fs.writeFileSync('src/lib/sites-config.ts', content);
console.log('Fixed sites-config');
