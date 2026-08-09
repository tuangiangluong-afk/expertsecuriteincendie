const fs = require('fs');
const path = require('path');

const filesToFix = [
  '/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/app/api/webhook/soloca/route.ts',
  '/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/app/blog/page.tsx',
  '/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/app/blog/[slug]/page.tsx',
  '/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/app/guides/page.tsx',
  '/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/app/guides/[slug]/page.tsx',
  '/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/app/author/[slug]/page.tsx',
  '/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/app/sitemap.ts',
  '/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/lib/supabase-server.ts',
  '/Users/marc/Downloads/project-zero/expertsecuriteincendie/src/app/api/cron/blog-sync/route.ts'
];

for (const filePath of filesToFix) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace non-null assertions and unhandled env vars with safe fallbacks
    content = content.replace(/process\.env\.NEXT_PUBLIC_SUPABASE_URL!/g, 'process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"');
    content = content.replace(/process\.env\.NEXT_PUBLIC_SUPABASE_ANON_KEY!/g, 'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"');
    content = content.replace(/process\.env\.SUPABASE_SERVICE_ROLE_KEY!/g, 'process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key"');
    
    // Fix route.ts specifically
    content = content.replace(/const supabaseUrl = process\.env\.NEXT_PUBLIC_SUPABASE_URL \|\| process\.env\.SUPABASE_URL \|\| '';/g, 'const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://placeholder.supabase.co";');
    content = content.replace(/const supabaseKey = process\.env\.SUPABASE_SERVICE_ROLE_KEY \|\| process\.env\.SUPABASE_ANON_KEY \|\| '';/g, 'const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "placeholder-key";');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Secured ${filePath}`);
  }
}
