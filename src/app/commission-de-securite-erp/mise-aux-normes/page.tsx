import type { Metadata } from "next";
import RegulatoryLanding, { pageData } from "@/components/RegulatoryLanding";

export const revalidate = 86400;
export const metadata: Metadata = {
    title: pageData.commission.title,
    description: pageData.commission.description,
    alternates: { canonical: "https://www.expertsecuriteincendie.fr/commission-de-securite-erp/mise-aux-normes" },
    openGraph: { title: pageData.commission.title, description: pageData.commission.description, url: "https://www.expertsecuriteincendie.fr/commission-de-securite-erp/mise-aux-normes", type: "website", images: [{ url: "/api/og?title=Commission de sécurité ERP", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: pageData.commission.title, description: pageData.commission.description, images: ["/api/og?title=Commission de sécurité ERP"] },
};

export default function CommissionSecuriteErpPage() { return <RegulatoryLanding page="commission" />; }
