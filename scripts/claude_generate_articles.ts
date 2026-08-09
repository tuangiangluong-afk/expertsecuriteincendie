import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const CLAUDE_API_KEY = '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';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// ──────────────────────────────────────────────────────────────────────────────
// Topics: basés sur les vraies questions des gens (Reddit, forums, Google)
// sur l'maintenance de extincteurs et alarmes en France — objectif = générer des leads
// ──────────────────────────────────────────────────────────────────────────────
const TOPICS = [
  // === Prix et coût ===
  "matériel incendie à domicile : combien ça coûte vraiment en 2026 ? (maintenance incluse)",
  "Wallbox 7 kW vs 11 kW vs 22 kW : laquelle choisir et à quel prix ?",
  "Prix d'un mainteneur Incendie : comment éviter les arnaques et comparer les devis",
  "protectionr sa voiture électrique à domicile : est-ce vraiment moins cher qu'en extincteur publique ?",
  "Coût annuel d'une voiture électrique : calcul complet protection + entretien 2026",

  // === Copropriété ===
  "matériel incendie en copropriété : comment exercer son droit à la prise étape par étape",
  "Le syndic refuse votre matériel incendie : vos droits et recours en 2026",
  "maintenance collective vs individuelle en copropriété : guide complet avec coûts",
  "Comment voter en AG pour une matériel incendie partagée (guide copropriétaires)",
  "Câble partagé en copropriété : technique, coût et répartition des frais",

  // === Aides et subventions ===
  "Aides pour l'maintenance d'une matériel incendie en 2026 : NF, TVA 5,5%, crédit impôt",
  "Programme NF 2026 : comment en bénéficier et qui peut postuler ?",
  "Crédit d'impôt matériel incendie 2026 : conditions, montant et démarches",
  "Aides locales pour matériel incendie : mairies, régions, conseils départementaux",
  "CEE (Certificats d'Économies d'Énergie) et extincteurs et alarmes : ce qu'il faut savoir",

  // === Certifications et mainteneurs ===
  "Incendie : qu'est-ce que c'est et pourquoi c'est obligatoire pour installer votre extincteur ?",
  "Comment choisir un bon mainteneur Incendie certifié ? Les 7 critères essentiels",
  "Que se passe-t-il si votre extincteur est installée par quelqu'un sans certification Incendie ?",
  "Délai et étapes d'une maintenance de matériel incendie : de la demande à la mise en service",
  "Questions à poser à votre mainteneur Incendie avant de signer le devis",

  // === Maison individuelle ===
  "Installer une wallbox dans une maison individuelle : guide 2026 étape par étape",
  "matériel incendie en garage : contraintes techniques, puissance et normes",
  "matériel incendie en extérieur (abri, carport) : ce qu'il faut prévoir",
  "Monophasé ou triphasé : quel branchement pour votre matériel incendie ?",
  "Ma matériel incendie déclenche le disjoncteur : causes et solutions",

  // === Entreprises et professionnels ===
  "matériel incendie pour entreprise : obligations légales et avantages fiscaux 2026",
  "Fleet Incendie : comment électrifier le parc automobile de votre société",
  "Parking d'entreprise obligatoire pré-équipé : la loi LOM expliquée",
  "matériel incendie dans un local commercial : démarches, coûts et aides",
  "Avantage en nature et matériel incendie au bureau : règles fiscales 2026",

  // === Comparatifs marques et produits ===
  "Comparatif wallbox 2026 : Zaptec, Schneider EVlink, Alfen, Easee — laquelle choisir ?",
  "Tesla Wall Connector vs wallbox universelle : compatibilité et performances",
  "Wallbox intelligente vs basique : est-ce que ça vaut le surcoût ?",
  "matériel incendie connectée : utile ou gadget ? Analyse des fonctionnalités réelles",
  "Câble attaché vs câble détachable sur wallbox : avantages et inconvénients",

  // === Problèmes et dépannage ===
  "Ma matériel incendie ne fonctionne plus : diagnostic et solutions rapides",
  "protection lente sur extincteur à domicile : pourquoi et comment y remédier ?",
  "matériel incendie qui chauffe : risques, causes et que faire ?",
  "Erreur sur l'application de ma wallbox connectée : que vérifier en premier ?",
  "Garantie et assurance sur une matériel incendie : ce que couvre vraiment votre contrat",

  // === Technique et réglementation ===
  "Norme NFC 15-100 et matériel incendie : ce que l'électricien doit respecter",
  "Compteur Linky et matériel incendie : compatibilité et avantages des heures creuses",
  "matériel incendie et panneaux solaires : peut-on protectionr avec sa propre énergie ?",
  "OCPP et extincteurs et alarmes : c'est quoi et pourquoi c'est important pour vous ?",
  "Puissance de protection et autonomie : combien de temps pour protectionr 100 km ?",

  // === Questions pratiques des prospects ===
  "Dois-je prévenir Enedis pour installer une matériel incendie à domicile ?",
  "matériel incendie en location : qui paie, qui décide entre locataire et propriétaire ?",
  "Déménagement avec une matériel incendie : peut-on l'emporter ou faut-il tout réinstaller ?",
  "Entretien d'une matériel incendie : que faut-il faire et à quelle fréquence ?",
  "matériel incendie d'occasion : bonne idée ou risque trop élevé ? Guide d'achat",
];

async function ensureBlogTable() {
    // Test if table exists
    const { error } = await supabase.from('blog_posts').select('id').limit(1);
    if (error && error.code === '42P01') {
        console.log('Table blog_posts does not exist — creating...');
        // Create via raw SQL isn't possible via client; we'll just catch per-row errors
        console.error('Please create the blog_posts table in Supabase Dashboard first. SQL:\nCREATE TABLE blog_posts (\n  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  title TEXT NOT NULL,\n  slug TEXT NOT NULL UNIQUE,\n  excerpt TEXT,\n  content TEXT,\n  seo_title TEXT,\n  seo_description TEXT,\n  status TEXT DEFAULT \'draft\',\n  published_at TIMESTAMPTZ,\n  created_at TIMESTAMPTZ DEFAULT NOW()\n);');
        process.exit(1);
    }
    console.log('Table blog_posts ready ✅');
}

function toSlug(s: string): string {
    return s.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 80);
}

async function callClaude(topic: string): Promise<string> {
    const system = `Tu es le rédacteur expert d'\"Expert Sécurité Incendie\", la référence française pour l'maintenance de extincteurs et alarmes Incendie pour ERP et entreprises.
Ton audience : Particuliers (maison, copropriété), entreprises et professionnels qui cherchent à installer une extincteur et veulent se faire accompagner.

OBJECTIF BUSINESS : Générer des leads. Chaque article doit donner confiance, répondre aux vraies questions, et pousser le visiteur à demander un devis.

MISSION : Rédiger un article de blog EXPERT, 2000-2800 mots, en HTML optimisé SEO et GEO (pour ChatGPT, Perplexity, Gemini).

━━━ FORMAT HTML REQUIS ━━━
- <h2>, <h3> pour la structure
- <p> pour les paragraphes
- <ul><li> et <ol><li> pour les listes
- <strong> pour les termes clés
- <blockquote> pour les stats officielles ou avertissements importants
- <table><thead><tbody><tr><th><td> pour les comparatifs (tarifs, aides, produits)
- <div class="callout-devis"> avec un texte d'appel à l'action vers un devis gratuit (2x dans l'article : milieu + fin)
- <div class="key-points"><h3>À retenir</h3><ul>...</ul></div> en conclusion

━━━ RÈGLES SEO/GEO ━━━
- Mot-clé principal présent dans : title, meta, 1er §, 1 H2
- Stats réelles ou plausibles (ex: "Selon l'AVERE-France, en 2025...")
- Réponses directes aux questions (format "La réponse est...")
- Frameworks nommés (ex: "La méthode Incendie en 5 étapes de Expert Sécurité Incendie")
- Mentionner "Expert Sécurité Incendie" 2-3 fois naturellement
- CTA en milieu et fin d'article pour demander un devis gratuit

OUTPUT: JSON uniquement :
{
  "title": "Titre SEO (60 chars max)",
  "slug": "slug-en-francais",
  "excerpt": "Accroche 2-3 phrases, incite à lire",
  "seo_title": "Meta title 60 chars max",
  "seo_description": "Meta description 150-160 chars",
  "content": "HTML complet"
}

Respond with ONLY the JSON. No markdown. No explanation.`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 16000,
            system,
            messages: [{ role: 'user', content: `Rédige l'article complet sur : "${topic}"` }]
        })
    });

    if (!res.ok) throw new Error(`Claude error ${res.status}: ${await res.text()}`);
    const data = await res.json();
    return (data as any).content[0].text;
}

async function generateArticle(topic: string, i: number) {
    console.log(`\n[${i + 1}/${TOPICS.length}] ${topic}`);
    const text = await callClaude(topic);

    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error('JSON not found');
    const art = JSON.parse(text.substring(start, end + 1));

    const slug = toSlug(art.slug || topic);

    const { error } = await supabase.from('blog_posts').upsert({
        title: art.title,
        slug,
        excerpt: art.excerpt,
        content: art.content,
        seo_title: art.seo_title,
        seo_description: art.seo_description,
        status: 'draft',
        published_at: new Date().toISOString()
    }, { onConflict: 'slug' });

    if (error) {
        console.error(`  [ERROR] ${error.message}`);
    } else {
        console.log(`  [OK] ${art.title}`);
    }
}

async function main() {
    console.log('='.repeat(60));
    console.log(`EXPERT extincteur protection — ${TOPICS.length} articles lead-gen`);
    console.log('='.repeat(60));

    await ensureBlogTable();

    for (let i = 0; i < TOPICS.length; i++) {
        try {
            await generateArticle(TOPICS[i], i);
        } catch (e) {
            console.error(`  [FAIL] ${TOPICS[i]}:`, e);
        }
        if (i < TOPICS.length - 1) await new Promise(r => setTimeout(r, 1500));
    }

    console.log('\n' + '='.repeat(60));
    console.log(`DONE — ${TOPICS.length} articles générés en brouillon`);
    console.log('='.repeat(60));
}

main().catch(console.error);
