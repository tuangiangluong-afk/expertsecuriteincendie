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
    const title = `Commission de sécurité ERP à ${city.city} | Mise en conformité`;
    const description = `Commission de sécurité proche à ${city.city} ? Qualifiez vos rapports, réserves et échéances avant de demander une intervention.`;
    return { title, description, alternates: { canonical: `https://www.expertsecuriteincendie.fr/ville/${slugify(city.city)}/commission-de-securite-erp/mise-aux-normes` }, openGraph: { title, description, type: "website", images: [{ url: `/api/og?title=${encodeURIComponent(`Commission ERP à ${city.city}`)}`, width: 1200, height: 630 }] }, twitter: { card: "summary_large_image", title, description } };
}
export default async function CityCommissionPage({ params }: { params: Promise<{ slug: string }> }) {
    const city = getCityByCleanSlug((await params).slug);
    if (!city) return notFound();
    return <RegulatoryLanding page="commission" city={city} />;
}
