const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            // Remove targetType="..."
            if (content.includes('targetType=')) {
                content = content.replace(/\s*targetType=\{[^}]+\}/g, '');
                content = content.replace(/\s*targetType="[^"]+"/g, '');
                modified = true;
            }
            
            // Remove initialProjectType="..."
            if (content.includes('initialProjectType=')) {
                content = content.replace(/\s*initialProjectType=\{[^}]+\}/g, '');
                content = content.replace(/\s*initialProjectType="[^"]+"/g, '');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log('Modified', fullPath);
            }
        }
    }
}

processDir('/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/app');
