const fs = require('fs');
let content = fs.readFileSync('src/app/[domain]/sitemap.ts', 'utf8');

if (!content.includes('/guides/normes-extincteurs-entreprise')) {
    content = content.replace(
        /'\/solutions\/copropriete'/,
        `'/solutions/copropriete',
        '/guides/normes-extincteurs-entreprise'`
    );
    fs.writeFileSync('src/app/[domain]/sitemap.ts', content);
}
console.log('Sitemap updated');
