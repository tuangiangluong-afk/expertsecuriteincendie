const fs = require('fs');

const files = [
    'src/app/[domain]/page.tsx',
    'src/app/home/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/import GrantsCalculator from "@\/components\/GrantsCalculator";\n/g, '');
        content = content.replace(/.*<GrantsCalculator.*\/?>.*\n/g, '');
        fs.writeFileSync(file, content);
        console.log('Fixed GrantsCalculator in', file);
    }
}
