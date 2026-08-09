import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getCurrentYearSEO } from './date';

const GUIDES_PATH = path.join(process.cwd(), 'src/content/guides');

export async function getGuideBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx$/, '');
    const filePath = path.join(GUIDES_PATH, `${realSlug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
        slug: realSlug,
        meta: data,
        content: content,
    };
}

export function getAllGuides() {
    if (!fs.existsSync(GUIDES_PATH)) return [];

    const files = fs.readdirSync(GUIDES_PATH);
    const guides = files.map((file) => {
        const filePath = path.join(GUIDES_PATH, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);

        return {
            slug: file.replace(/\.mdx$/, ''),
            title: data.title,
            description: data.description,
            date: data.date,
            ...data
        };
    });

    // Manually inject custom React pages (that are not MDX)
    const year = getCurrentYearSEO();
    const customGuides = [
        {
            slug: 'normes-extincteurs-entreprise',
            title: 'Normes Extincteurs Entreprise 2026 : Le Guide Complet',
            description: "Tout ce qu'il faut savoir sur la réglementation incendie en entreprise : obligations du Code du Travail, registre de sécurité, et maintenance des extincteurs.",
            date: `${year}-01-26`,
            category: 'Réglementation B2B',
            readTime: '10 min'
        }
    ];

    const allGuides = [...guides, ...customGuides];

    return allGuides.sort((a: any, b: any) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}
