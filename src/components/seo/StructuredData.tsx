
import Script from "next/script";

export default function StructuredData() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Expert Sécurité Incendie",
        "url": "https://expertsecuriteincendie.fr",
        "logo": "https://expertsecuriteincendie.fr/logo.png",
        "description": "maintenance de extincteurs pour particuliers et professionnels. Réseau de techniciens certifiés Incendie.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 00 00 00 00",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "French"
        }
    };

    
    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://expertsecuriteincendie.fr",
        "name": "Expert Sécurité Incendie",
        "description": "maintenance de extincteurs pour ERP et entreprises",
        "inLanguage": "fr",
        "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": [
                "h1",
                ".hero-description",
                ".faq-answer",
                "article h2",
                "article p:first-of-type",
                ".prose > p:first-child"
            ]
        },
        "isPartOf": {
            "@type": "WebSite",
            "url": "https://expertsecuriteincendie.fr",
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

            id="webpage-speakable-schema"

            type="application/ld+json"

            dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}

        />

        </>
    );
}
