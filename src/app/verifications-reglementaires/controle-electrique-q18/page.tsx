import type { Metadata } from "next";
import RegulatoryLanding, { pageData } from "@/components/RegulatoryLanding";

export const revalidate = 86400;
export const metadata: Metadata = {
    title: pageData.q18.title,
    description: pageData.q18.description,
    alternates: { canonical: "https://www.expertsecuriteincendie.fr/verifications-reglementaires/controle-electrique-q18" },
    openGraph: { title: pageData.q18.title, description: pageData.q18.description, url: "https://www.expertsecuriteincendie.fr/verifications-reglementaires/controle-electrique-q18", type: "website", images: [{ url: "/api/og?title=Contrôle électrique ERP", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: pageData.q18.title, description: pageData.q18.description, images: ["/api/og?title=Contrôle électrique ERP"] },
};

export default function ControleElectriqueQ18Page() { return <RegulatoryLanding page="q18" />; }
