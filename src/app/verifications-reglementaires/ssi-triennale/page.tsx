import type { Metadata } from "next";
import RegulatoryLanding, { pageData } from "@/components/RegulatoryLanding";

export const revalidate = 86400;
export const metadata: Metadata = {
    title: pageData.ssi.title,
    description: pageData.ssi.description,
    alternates: { canonical: "https://www.expertsecuriteincendie.fr/verifications-reglementaires/ssi-triennale" },
    openGraph: { title: pageData.ssi.title, description: pageData.ssi.description, url: "https://www.expertsecuriteincendie.fr/verifications-reglementaires/ssi-triennale", type: "website", images: [{ url: "/api/og?title=Vérification SSI ERP", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: pageData.ssi.title, description: pageData.ssi.description, images: ["/api/og?title=Vérification SSI ERP"] },
};

export default function SsiTriennalePage() { return <RegulatoryLanding page="ssi" />; }
