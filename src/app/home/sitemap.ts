import { MetadataRoute } from 'next';
import { NATIONAL_TARGETS } from '@/config/national-targets';
import { SEO_ROUTES } from '@/lib/seo-routes';
import { SEO_SERVICES } from '@/lib/seo-data';
import { NATIONAL_CONFIG } from '@/config/national';
import { slugify } from '@/lib/slugify';
import { brands } from '@/data/brands';
import { getAllGuides } from '@/lib/mdx';
import { OPERATORS, FIRE_BRANDS, FIRE_DUELS } from '@/data/operators';
import { createClient } from '@supabase/supabase-js';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.expertsecuriteincendie.fr';

    // Date de dernière révision réelle du contenu de ces gabarits.
    const CONTENT_REVISION = new Date('2026-09-24');

    // ========================================
    // 1. CORE STATIC PAGES & HUBS
    // ========================================
    const coreRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: CONTENT_REVISION,
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/operateurs`,
            lastModified: CONTENT_REVISION,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/marques`,
            lastModified: CONTENT_REVISION,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/comparatifs`,
            lastModified: CONTENT_REVISION,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/solutions/entreprise`,
            lastModified: CONTENT_REVISION,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/guides`,
            lastModified: CONTENT_REVISION,
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: CONTENT_REVISION,
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/mentions-legales`,
            lastModified: new Date('2026-03-01'),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/cgv`,
            lastModified: new Date('2026-03-01'),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date('2026-03-01'),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    // ========================================
    // 2. PARTNER CITIES (30 Ghost Broker Pages)
    // ========================================
    const cityRoutes: MetadataRoute.Sitemap = NATIONAL_TARGETS.map((target) => ({
        url: `${baseUrl}/ville/${slugify(target.name)}`,
        lastModified: CONTENT_REVISION,
        changeFrequency: 'weekly' as const,
        priority: 0.9, // High priority - main money pages
    }));


    // ========================================
    // 5. SERVICE PAGES
    // ========================================
    const serviceRoutes: MetadataRoute.Sitemap = SEO_SERVICES.map((service) => ({
        url: `${baseUrl}/service/${service.slug}`,
        lastModified: CONTENT_REVISION,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // ========================================
    // 6. GUIDE PAGES (POIs)
    // ========================================
    const allPois = [
        ...NATIONAL_CONFIG.points_of_interest.hotels,
        ...NATIONAL_CONFIG.points_of_interest.nightlife,
        ...NATIONAL_CONFIG.points_of_interest.monuments
    ];

    const poiRoutes: MetadataRoute.Sitemap = allPois.map((poi) => ({
        url: `${baseUrl}/poi/${slugify(poi)}`,
        lastModified: CONTENT_REVISION,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // ========================================
    // 7. maintenance BRAND PAGES (NEW)
    // ========================================
    // Marques : servies par src/app/maintenance/[brand]/page.tsx (le middleware
    // laisse /maintenance/* au routeur). Ces URL renvoyaient 404 auparavant.
    const maintenanceRoutes: MetadataRoute.Sitemap = brands.map((brand) => ({
        url: `${baseUrl}/maintenance/${brand.slug}`,
        lastModified: CONTENT_REVISION,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // ========================================
    // 9. BLOG GUIDES (Dynamic)
    // ========================================
    const guides = getAllGuides();
    const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: (guide.date && !isNaN(new Date(guide.date).getTime())) ? new Date(guide.date) : CONTENT_REVISION,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // ========================================
    // 9b. BLOG POSTS (Supabase — strictly 'incendie')
    // ========================================
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tblatnaxfbjvjbihiryi.supabase.co";
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibGF0bmF4ZmJqdmpiaWhpcnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1MTAxMjYsImV4cCI6MjA4NTA4NjEyNn0.T0hltZN3QOA4k3ReFJfRf20ar61rHt_2Ncm_drmCFjU";
        if (supabaseUrl && supabaseKey) {
            const supabase = createClient(supabaseUrl, supabaseKey);
            const { data: blogPosts } = await supabase
                .from('blog_posts')
                .select('slug, published_at, updated_at')
                .eq('status', 'published')
                .contains('tags', ['incendie'])
                .order('published_at', { ascending: false });

            if (blogPosts) {
                blogRoutes = blogPosts.map((post) => ({
                    url: `${baseUrl}/blog/${post.slug}`,
                    lastModified: new Date(post.updated_at || post.published_at),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                }));
            }
        }
    } catch (e) {
        console.warn('[Sitemap] Failed to fetch blog posts:', e);
    }

    // ========================================
    // 10. HUB WHITESPACE
    // ========================================
    const extraRoutes: MetadataRoute.Sitemap = [
        { url: `${baseUrl}/solutions/entreprise`, lastModified: CONTENT_REVISION, priority: 0.8 },
        { url: `${baseUrl}/verifications-reglementaires/ssi-triennale`, lastModified: CONTENT_REVISION, changeFrequency: 'monthly' as const, priority: 0.9 },
        { url: `${baseUrl}/verifications-reglementaires/controle-electrique-q18`, lastModified: CONTENT_REVISION, changeFrequency: 'monthly' as const, priority: 0.9 },
        { url: `${baseUrl}/commission-de-securite-erp/mise-aux-normes`, lastModified: CONTENT_REVISION, changeFrequency: 'monthly' as const, priority: 0.9 },
        { url: `${baseUrl}/guides`, lastModified: CONTENT_REVISION, priority: 0.8 },
        { url: `${baseUrl}/solutions/maison`, lastModified: CONTENT_REVISION, priority: 0.7 },
        { url: `${baseUrl}/solutions/copropriete`, lastModified: CONTENT_REVISION, priority: 0.7 },
    ];


    // ========================================
    // 11. B2B PSEO Routes (Copro + Entreprise per city)
    // ========================================
    const b2bRoutes: MetadataRoute.Sitemap = NATIONAL_TARGETS.flatMap((target) => {
        return [
            {
                url: `${baseUrl}/ville/${slugify(target.name)}/copropriete`,
                lastModified: CONTENT_REVISION,
                changeFrequency: 'weekly' as const,
                priority: 0.95,
            },
            {
                url: `${baseUrl}/ville/${slugify(target.name)}/entreprise`,
                lastModified: CONTENT_REVISION,
                changeFrequency: 'weekly' as const,
                priority: 0.95,
            },
        ];
    });

    // ========================================
    // 12. Réglementaire ERP par ville
    // ========================================
    const regulatoryCityRoutes = NATIONAL_TARGETS.flatMap((target) => [
        { url: `${baseUrl}/ville/${slugify(target.name)}/verifications-reglementaires/ssi-triennale`, lastModified: CONTENT_REVISION, changeFrequency: 'monthly' as const, priority: 0.85 },
        { url: `${baseUrl}/ville/${slugify(target.name)}/verifications-reglementaires/controle-electrique-q18`, lastModified: CONTENT_REVISION, changeFrequency: 'monthly' as const, priority: 0.85 },
        { url: `${baseUrl}/ville/${slugify(target.name)}/commission-de-securite-erp/mise-aux-normes`, lastModified: CONTENT_REVISION, changeFrequency: 'monthly' as const, priority: 0.85 },
    ]);

    // ========================================
    // 13. Domination Longue Traîne: City x Brand (pSEO Matrix)
    // ========================================
    const cityBrandRoutes: MetadataRoute.Sitemap = NATIONAL_TARGETS.flatMap((target) => {
        return brands.map(brand => ({
            url: `${baseUrl}/ville/${slugify(target.name)}/${brand.slug}`,
            lastModified: CONTENT_REVISION,
            changeFrequency: 'weekly' as const,
            priority: 0.85,
        }));
    });

    // ========================================
    // 14. OPERATOR ROUTES
    // ========================================
    const operatorRoutes: MetadataRoute.Sitemap = OPERATORS.map((op) => ({
        url: `${baseUrl}/operateurs/${op.slug}`,
        lastModified: CONTENT_REVISION,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    const brandRoutes: MetadataRoute.Sitemap = FIRE_BRANDS.map((b) => ({
        url: `${baseUrl}/marques/${b.slug}`,
        lastModified: CONTENT_REVISION,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const duelRoutes: MetadataRoute.Sitemap = FIRE_DUELS.map((d) => ({
        url: `${baseUrl}/comparatif/${d.slug}`,
        lastModified: CONTENT_REVISION,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }));

    return [
        ...coreRoutes,
        ...operatorRoutes,
        ...brandRoutes,
        ...duelRoutes,
        ...cityRoutes,
        ...serviceRoutes,
        ...poiRoutes,
        ...maintenanceRoutes,
        ...guideRoutes,
        ...blogRoutes,
        ...extraRoutes,
        ...b2bRoutes,
        ...regulatoryCityRoutes,
        ...cityBrandRoutes,
    ].map(item => ({
        ...item,
        url: item.url.toLowerCase()
    }));
}
