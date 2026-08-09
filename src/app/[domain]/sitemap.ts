import { MetadataRoute } from 'next';
import { getSiteConfig } from '@/lib/sites-config';

export default function sitemap({ params }: { params: { domain: string } }): MetadataRoute.Sitemap {
    const site = getSiteConfig(params.domain);
    const baseUrl = `https://${params.domain}`;

    const routes = [
        '',
        '/contact',
        '/mentions-legales',
        '/solutions/entreprise',
        '/solutions/copropriete',
        '/guides/normes-extincteurs-entreprise'
    ];

    if (site?.quartiers) {
        site.quartiers.forEach(quartier => {
            routes.push(`/quartier/${quartier.toLowerCase().replace(/\s+/g, '-')}`);
        });
    }

    return routes.map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8
    }));
}
