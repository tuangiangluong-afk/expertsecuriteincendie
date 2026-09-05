import Script from "next/script";

export default function StructuredData() {
    const baseUrl = "https://expertsecuriteincendie.fr";
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Expert Sécurité Incendie",
        "legalName": "Expert Sécurité Incendie SAS",
        "alternateName": ["Sécurité Incendie", "Expert Sécurité Incendie Official"],
        "url": baseUrl,
        "logo": `${baseUrl}/icon.png`,
        "description": "Réseau national de conformité et maintenance sécurité incendie ERP/ERT.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "6 Rue des Bateliers",
            "addressLocality": "Paris",
            "postalCode": "92110",
            "addressCountry": "FR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 49 14 02 64",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "fr-FR"
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
        "alternateName": "expertsecuriteincendie.fr",
        "description": "Réseau national de conformité et maintenance sécurité incendie ERP/ERT.",
        "inLanguage": "fr-FR",
        "publisher": {
            "@id": `${baseUrl}/#organization`,
            "@type": "Organization",
            "name": "Expert Sécurité Incendie"
        }
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Expert Sécurité Incendie",
        "provider": {
            "@id": `${baseUrl}/#organization`,
            "@type": "Organization",
            "name": "Expert Sécurité Incendie"
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        },
        "description": "Réseau national de conformité et maintenance sécurité incendie ERP/ERT.",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "148",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    return (
        <>
            <Script
                id="org-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
        </>
    );
}
