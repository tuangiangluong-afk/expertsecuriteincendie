const fs = require('fs');

const files = [
    'src/app/[domain]/page.tsx',
    'src/app/home/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/import ChargerComparison from "@\/components\/ChargerComparison";/g, 'import ExtinguisherComparison from "@/components/ExtinguisherComparison";');
        content = content.replace(/<ChargerComparison[^>]*\/>/g, '<ExtinguisherComparison themeColor={themeColor} />');
        fs.writeFileSync(file, content);
        console.log('Fixed comparison in', file);
    }
}
