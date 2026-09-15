import Script from "next/script";

export default function StructuredData() {
    const baseUrl = "https://www.expertsecuriteincendie.fr";

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Expert Sécurité Incendie",
        "legalName": "Expert Sécurité Incendie SAS",
        "url": baseUrl,
        "logo": `${baseUrl}/icon.png`,
        "image": `${baseUrl}/icon.png`,
        "description": "Audit, installation et maintenance d'extincteurs, colonnes sèches, BAES et registres de sécurité incendie.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "18 Rue de la Paix",
            "addressLocality": "Paris",
            "postalCode": "75002",
            "addressCountry": "FR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 84 80 00 00",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": ["fr-FR", "en-US"]
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Expert Sécurité Incendie",
        "description": "Audit, installation et maintenance d'extincteurs, colonnes sèches, BAES et registres de sécurité incendie.",
        "inLanguage": "fr-FR",
        "publisher": {
            "@id": `${baseUrl}/#organization`,
            "@type": "Organization",
            "name": "Expert Sécurité Incendie"
        }
    };

    // Clean Service Schema: NO aggregateRating or review (Services are not eligible for Google review snippets)
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${baseUrl}/#service`,
        "name": "Audit & Installation Sécurité Incendie ERP",
        "serviceType": "Audit & Installation Sécurité Incendie ERP",
        "provider": {
            "@id": `${baseUrl}/#organization`,
            "@type": "Organization",
            "name": "Expert Sécurité Incendie"
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        },
        "description": "Audit, installation et maintenance d'extincteurs, colonnes sèches, BAES et registres de sécurité incendie.",
        "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "price": "250",
            "validFrom": "2026-01-01"
        }
    };

    // Eligible Product Schema: 100% compliant with Google Product & Review Snippets
    // « Service » et non « Product » : ce site ne vend pas un produit catalogue,
    // il met en relation avec des professionnels. Un Product ici est un balisage
    // inexact (stock, SKU, livraison) que Google peut ignorer ou signaler.
    const serviceOfferSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${baseUrl}/#service-offer`,
        "name": "Pack Extincteurs et Sécurité Incendie Normes ERP",
        "image": [
            `${baseUrl}/icon.png`
        ],
        "description": "Pack complet d'extincteurs certifiés NF, blocs d'éclairage de sécurité et signalétique réglementaire ERP.",
        "brand": {
            "@type": "Brand",
            "name": "Expert Sécurité Incendie"
        },
        "offers": {
            "@type": "Offer",
            "url": `${baseUrl}/#simulateur`,
            "priceCurrency": "EUR",
            "price": "250",
            "validFrom": "2026-01-01",
            "priceValidUntil": "2026-12-31",
                                },
    };

    return (
        <>
            <Script
                id="org-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <Script
                id="website-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <Script
                id="service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <Script
                id="service-offer-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceOfferSchema) }}
            />
        </>
    );
}
