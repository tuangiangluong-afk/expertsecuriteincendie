
import Script from "next/script";

export default function StructuredData() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Expert Sécurité Incendie",
        "legalName": "Expert Sécurité Incendie SAS",
        "alternateName": ["ESI", "ExpertSécuritéIncendie"],
        "url": "https://expertsecuriteincendie.fr",
        "logo": "https://expertsecuriteincendie.fr/icon.png",
        "image": "https://expertsecuriteincendie.fr/images/realizations/hero-extincteur.jpg",
        "description": "Réseau national d'experts en maintenance d'extincteurs, désenfumage, registres de sécurité et conformité incendie B2B pour entreprises, ERP et copropriétés.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "8 Rue de la Paix",
            "addressLocality": "Paris",
            "postalCode": "75002",
            "addressCountry": "FR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 48.8686,
            "longitude": 2.3314
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 84 80 00 00",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "French"
        },
        "areaServed": {
            "@type": "Country",
            "name": "France"
        },
        "knowsAbout": [
            "Sécurité Incendie",
            "Maintenance Extincteurs NF EN3",
            "Réglementation Code du Travail R4227-29",
            "Conformité ERP et Copropriétés",
            "Désenfumage et RIA"
        ]
    };

    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://expertsecuriteincendie.fr",
        "name": "Expert Sécurité Incendie",
        "alternateName": "ExpertSécuritéIncendie.fr",
        "description": "Vérification et installation d'extincteurs certifiés NF EN3 & APSAD en France.",
        "inLanguage": "fr-FR",
        "publisher": {
            "@type": "Organization",
            "name": "Expert Sécurité Incendie"
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
            />
        </>
    );
}
