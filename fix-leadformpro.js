const fs = require('fs');

const files = [
    'src/app/ville/[slug]/entreprise/page.tsx',
    'src/app/ville/[slug]/copropriete/page.tsx',
    'src/app/solutions/entreprise/page.tsx',
    'src/app/solutions/copropriete/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/import LeadFormPro from "@\/components\/LeadFormPro";/g, 'import LeadForm from "@/components/LeadForm";');
        content = content.replace(/<LeadFormPro/g, '<LeadForm');
        // also remove segment="..." because LeadForm doesn't take segment
        content = content.replace(/\s*segment="[^"]+"/g, '');
        fs.writeFileSync(file, content);
        console.log('Fixed', file);
    }
}
