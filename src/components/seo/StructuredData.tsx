import Script from "next/script";

export default function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Expert Sécurité Incendie",
        "legalName": "Expert Sécurité Incendie SAS",
        "alternateName": ["ExpertSécuritéIncendie", "Expert Sécurité Incendie Official"],
        "url": "https://expertsecuriteincendie.fr",
        "logo": "https://expertsecuriteincendie.fr/icon.png",
        "image": "https://expertsecuriteincendie.fr/icon.png",
        "description": "N°1 de la maintenance d'extincteurs certifiés NF EN3 & APSAD, désenfumage et registres de sécurité pour entreprises, ERP et copropriétés en France.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "8 Rue de la Paix",
            "addressLocality": "Paris",
            "postalCode": "75002",
            "addressCountry": "FR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33 1 84 80 00 00",
            "contactType": "customer service",
            "areaServed": "FR",
            "availableLanguage": "fr-FR"
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        }
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Maintenance Extincteurs, Désenfumage & Conformité Incendie B2B",
        "serviceType": "Maintenance Extincteurs, Désenfumage & Conformité Incendie B2B",
        "provider": {
            "@type": "Organization",
            "name": "Expert Sécurité Incendie",
            "url": "https://expertsecuriteincendie.fr"
        },
        "areaServed": {
            "@type": "Country",
            "name": "FR"
        },
        "description": "N°1 de la maintenance d'extincteurs certifiés NF EN3 & APSAD, désenfumage et registres de sécurité pour entreprises, ERP et copropriétés en France.",
        "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "price": "49",
            "availability": "https://schema.org/InStock",
            "validFrom": "2026-01-01",
            "itemCondition": "https://schema.org/NewCondition",
            "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "FR",
                "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted"
            },
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "EUR"
                },
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "FR"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "businessDays": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "https://schema.org/Monday",
                            "https://schema.org/Tuesday",
                            "https://schema.org/Wednesday",
                            "https://schema.org/Thursday",
                            "https://schema.org/Friday"
                        ]
                    },
                    "cutoffTime": "18:00:00Z",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 3,
                        "unitCode": "DAY"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 5,
                        "unitCode": "DAY"
                    }
                }
            }
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://expertsecuriteincendie.fr",
        "name": "Expert Sécurité Incendie",
        "alternateName": "expertsecuriteincendie.fr",
        "description": "N°1 de la maintenance d'extincteurs certifiés NF EN3 & APSAD, désenfumage et registres de sécurité pour entreprises, ERP et copropriétés en France.",
        "inLanguage": "fr-FR",
        "publisher": {
            "@type": "Organization",
            "name": "Expert Sécurité Incendie"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Comment obtenir un devis gratuit pour Expert Sécurité Incendie ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Remplissez notre formulaire en ligne en 2 minutes pour recevoir une estimation gratuite, personnalisée et sans engagement par nos experts certifiés."
                }
            },
            {
                "@type": "Question",
                "name": "Quelles sont les garanties fournies par Expert Sécurité Incendie ?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tous nos services et installations sont couverts par une garantie décennale, une certification de conformité aux normes en vigueur et un suivi technique réactif."
                }
            }
        ]
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://expertsecuriteincendie.fr"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Maintenance Extincteurs, Désenfumage & Conformité Incendie B2B",
                "item": "https://expertsecuriteincendie.fr/#simulateur"
            }
        ]
    };

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Matériel Incendie & Extincteur Certifié NF EN3",
        "image": "https://expertsecuriteincendie.fr/images/realizations/hero-extincteur.jpg",
        "description": "Vérification, maintenance et fourniture d'extincteurs Eau, CO2, Poudre certifiés NF EN3 & APSAD.",
        "brand": {
            "@type": "Brand",
            "name": "Expert Sécurité Incendie"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "price": "49",
            "availability": "https://schema.org/InStock"
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
                id="service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <Script
                id="product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <Script
                id="website-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
        </>
    );
}
