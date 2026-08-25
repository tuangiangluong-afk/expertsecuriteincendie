import { SiteConfig } from "@/lib/sites-config";
import { CityConfig } from "@/lib/db";
import { Vehicle } from "@/data/vehicles";
import { BrandData } from "@/data/brands";

interface SchemaJSONProps {
    type: "LocalBusiness" | "Product" | "Service" | "B2BService" | "Organization" | "Breadcrumb" | "FAQPage";
    site?: SiteConfig | CityConfig;
    vehicle?: Vehicle;
    brand?: BrandData;
    breadcrumbItems?: { name: string; item: string }[];
    b2bType?: "Copropriété" | "Entreprise";
    faqSegment?: "B2C" | "COPRO" | "ENTREPRISE";
}

import { slugify } from "@/lib/slugify";
import { getLocalFAQData } from "@/components/LocalFAQ";

export default function SchemaJSON({ type, site, vehicle, brand, breadcrumbItems, b2bType, faqSegment }: SchemaJSONProps) {
    let schema = {};

    if (type === "LocalBusiness" && site) {
        // CLEAN URL LOGIC:
        // Use /ville/[slug] for local sites, and https://expertsecuriteincendie.fr for Hub
        const baseUrl = "https://expertsecuriteincendie.fr";
        const canonicalUrl = site.slug === 'home' || site.slug === 'expertsecuriteincendie.fr'
            ? baseUrl
            : `${baseUrl}/ville/${slugify(site.city)}`;

        // Use REAL geo coordinates from the config (via national-targets.ts)
        const geoData = (site as any).geo || null;
        const lat = geoData?.lat || null;
        const lng = geoData?.lng || null;

        schema = {
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
            "name": site.name,
            "image": site.heroImage,
            "@id": canonicalUrl,
            "url": canonicalUrl,
            "telephone": site.phoneNumber,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": site.city,
                "postalCode": site.postalCode,
                "addressRegion": site.department || undefined,
                "addressCountry": "FR"
            },
            ...(lat && lng ? {
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": lat,
                    "longitude": lng
                }
            } : {}),
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ],
                "opens": "08:00",
                "closes": "20:00"
            },
            "priceRange": "€€€",
            "areaServed": {
                "@type": "City",
                "name": site.city
            },
            
        };
    } else if (type === "Service" && site && brand) {
        // Schema Service pour les pages Ville x Marque
        const baseUrl = "https://expertsecuriteincendie.fr";
        const canonicalUrl = `${baseUrl}/ville/${slugify(site.city)}/${brand.slug}`;

        const geoData = (site as any).geo || null;

        schema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": `maintenance matériel incendie ${brand.name}`,
            "name": `Maintenance extincteurs ${brand.name} à ${site.city}`,
            "description": `Vérification et maintenance des extincteurs ${brand.name} (${brand.models.join(', ')}) à ${site.city} par des techniciens certifiés. Conformité NF EN3, rapport d'intervention et registre de sécurité inclus. Devis gratuit.`,
            "url": canonicalUrl,
            "provider": {
                "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
                "name": site.name || "Expert Sécurité Incendie",
                "telephone": site.phoneNumber,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": site.city,
                    "postalCode": site.postalCode,
                    "addressCountry": "FR"
                },
                ...(geoData ? {
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": geoData.lat,
                        "longitude": geoData.lng
                    }
                } : {}),
                
            },
            "areaServed": {
                "@type": "City",
                "name": site.city
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": `extincteurs compatibles ${brand.name}`,
                "itemListElement": brand.models.map(model => ({
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": `maintenance extincteur pour ${brand.name} ${model}`,
                        "brand": { "@type": "Brand", "name": brand.name }
                    }
                }))
            }
        };
    } else if (type === "Product" && vehicle) {
        schema = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": `Maintenance extincteur ${vehicle.brand} ${vehicle.model}`,
            "image": site?.heroImage || "/images/realizations/hero-extincteur.jpg",
            "description": `Vérification et maintenance de l'extincteur ${vehicle.brand} ${vehicle.model} (${(vehicle as any).capacity || ""}) par des techniciens certifiés. Conformité NF EN3, rapport d'intervention et registre de sécurité inclus.`,
            "brand": {
                "@type": "Brand",
                "name": vehicle.brand
            },
            "offers": {
                "@type": "Offer",
                "url": "https://expertsecuriteincendie.fr/simulateur",
                "priceCurrency": "EUR",
                "price": "49", // À partir de 49€ TTC par extincteur
                "priceValidUntil": "2026-12-31",
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition"
            },
            
        };
    } else if (type === "B2BService" && site && b2bType) {
        const baseUrl = "https://expertsecuriteincendie.fr";
        const targetSlug = b2bType === "Copropriété" ? "copropriete" : "entreprise";
        const canonicalUrl = `${baseUrl}/ville/${slugify(site.city)}/${targetSlug}`;

        schema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": `maintenance matériel incendie ${b2bType}`,
            "name": `maintenance matériel incendie pour ${b2bType} à ${site.city}`,
            "description": `Devis gratuit et maintenance d'extincteurs pour ${b2bType} à ${site.city}. Conformité réglementaire (Code du travail, ERP), registre de sécurité et plan de prévention inclus.`,
            "url": canonicalUrl,
            "provider": {
                "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
                "name": site.name || "Expert Sécurité Incendie",
                "telephone": site.phoneNumber,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": site.city,
                    "postalCode": site.postalCode,
                    "addressCountry": "FR"
                }
            },
            "areaServed": {
                "@type": "City",
                "name": site.city
            }
        };
    } else if (type === "Organization" && site) {
        schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Expert Sécurité Incendie",
            "url": "https://expertsecuriteincendie.fr",
            "logo": "https://expertsecuriteincendie.fr/logo.png",
            "sameAs": [
                "https://www.linkedin.com/company/expert-extincteur-protection",
                "https://www.facebook.com/expertsecuriteincendie"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": site.phoneNumber || "01 89 70 21 00",
                "contactType": "customer service",
                "areaServed": "FR",
                "availableLanguage": "French"
            }
        };
    } else if (type === "Breadcrumb" && breadcrumbItems) {
        schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbItems.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.item
            }))
        };
    } else if (type === "FAQPage" && site && faqSegment) {
        const faqs = getLocalFAQData(site.city, site.department, faqSegment);
        schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
