import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, getCityByCleanSlug } from "@/lib/db";
import RegulatoryLanding, { pageData } from "@/components/RegulatoryLanding";
import { slugify } from "@/lib/slugify";

export const revalidate = 86400;
export function generateStaticParams() { return Object.values(CITIES).map((city) => ({ slug: slugify(city.city) })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const city = getCityByCleanSlug((await params).slug);
    if (!city) return {};
    const title = `Vérification SSI ERP à ${city.city} | Qualification et devis`;
    const description = `Besoin d'une vérification SSI à ${city.city} ? Qualifiez votre ERP, votre échéance et vos documents avant d'être orienté vers un intervenant adapté.`;
    return { title, description, alternates: { canonical: `https://www.expertsecuriteincendie.fr/ville/${slugify(city.city)}/verifications-reglementaires/ssi-triennale` }, openGraph: { title, description, type: "website", images: [{ url: `/api/og?title=${encodeURIComponent(`Vérification SSI à ${city.city}`)}`, width: 1200, height: 630 }] }, twitter: { card: "summary_large_image", title, description } };
}
export default async function CitySsiPage({ params }: { params: Promise<{ slug: string }> }) {
    const city = getCityByCleanSlug((await params).slug);
    if (!city) return notFound();
    return <RegulatoryLanding page="ssi" city={city} />;
}
