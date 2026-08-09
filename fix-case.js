const fs = require('fs');

let pageContent = fs.readFileSync('src/app/home/page.tsx', 'utf8');
pageContent = pageContent.replace(/import maintenanceSteps from "@\/components\/maintenanceSteps";/g, 'import MaintenanceSteps from "@/components/MaintenanceSteps";');
pageContent = pageContent.replace(/<maintenanceSteps \/>/g, '<MaintenanceSteps />');
fs.writeFileSync('src/app/home/page.tsx', pageContent);

let stepContent = fs.readFileSync('src/components/MaintenanceSteps.tsx', 'utf8');
stepContent = stepContent.replace(/export default function maintenanceSteps/g, 'export default function MaintenanceSteps');
fs.writeFileSync('src/components/MaintenanceSteps.tsx', stepContent);
