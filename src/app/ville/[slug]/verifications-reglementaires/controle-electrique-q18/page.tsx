import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, getCityByCleanSlug } from "@/lib/db";
import RegulatoryLanding from "@/components/RegulatoryLanding";
import { slugify } from "@/lib/slugify";

export const revalidate = 86400;
export function generateStaticParams() { return Object.values(CITIES).map((city) => ({ slug: slugify(city.city) })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const city = getCityByCleanSlug((await params).slug);
    if (!city) return {};
    const title = `Contrôle électrique Q18 à ${city.city} | Demande de qualification`;
    const description = `Besoin d'un contrôle électrique ou d'un rapport Q18 à ${city.city} ? Décrivez votre site et votre échéance avant orientation.`;
    return { title, description, alternates: { canonical: `https://www.expertsecuriteincendie.fr/ville/${slugify(city.city)}/verifications-reglementaires/controle-electrique-q18` }, openGraph: { title, description, type: "website", images: [{ url: `/api/og?title=${encodeURIComponent(`Contrôle électrique à ${city.city}`)}`, width: 1200, height: 630 }] }, twitter: { card: "summary_large_image", title, description } };
}
export default async function CityQ18Page({ params }: { params: Promise<{ slug: string }> }) {
    const city = getCityByCleanSlug((await params).slug);
    if (!city) return notFound();
    return <RegulatoryLanding page="q18" city={city} />;
}
