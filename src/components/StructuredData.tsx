import { CityConfig } from "@/lib/db";

export function StructuredData({ city }: { city: CityConfig }) {
    const services = [
        {
            "@type": "Service",
            "name": "Maintenance des extincteurs",
            "description": "Vérification et maintenance périodique des extincteurs pour entreprises, ERP et copropriétés.",
            "serviceType": "FireExtinguisherMaintenance"
        },
        {
            "@type": "Service",
            "name": "Mise en conformité incendie",
            "description": "Audit et accompagnement pour la conformité des équipements de sécurité incendie.",
            "serviceType": "FireSafetyCompliance"
        },
        {
            "@type": "Service",
            "name": "Désenfumage et équipements de sécurité",
            "description": "Contrôle et suivi des équipements de sécurité incendie selon les besoins du site.",
            "serviceType": "FireSafetyInspection"
        }
    ];

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "LocalBusiness",
                "additionalType": "https://schema.org/ProfessionalService",
                "@id": `https://${city.domain}/#localbusiness`,
                "name": city.name,
                "image": city.heroImage.startsWith('http') ? city.heroImage : `https://${city.domain}${city.heroImage}`,
                "telephone": city.phoneNumber,
                "email": city.email,
                "url": `https://${city.domain}`,
                "priceRange": "€€",
                "paymentAccepted": ["Cash", "Credit Card", "Invoice"],
                "currenciesAccepted": "EUR",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": city.city,
                    "addressCountry": "FR"
                },
                // Zones desservies : la commune réelle et ses communes limitrophes
                // (données IGN/Etalab). Ne pas préfixer le nom de la ville :
                // « Saint-Cloud - Garches » ne désigne aucune entité administrative.
                "areaServed": [
                    { "@type": "City", "name": city.city },
                    ...(city.neighborhoods || []).map(n => ({ "@type": "City", "name": n })),
                    ...(city.epci ? [{ "@type": "AdministrativeArea", "name": city.epci }] : []),
                    ...(city.deptName ? [{ "@type": "AdministrativeArea", "name": city.deptName }] : []),
                    { "@type": "AdministrativeArea", "name": "France" }
                ],
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        "opens": "00:00",
                        "closes": "23:59"
                    }
                ],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Maintenance et conformité sécurité incendie",
                    "itemListElement": services.map((service, index) => ({
                        "@type": "Offer",
                        "itemOffered": service,
                        "position": index + 1
                    }))
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": `https://${city.domain}/#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": `Sécurité incendie à ${city.city}`,
                        "item": `https://${city.domain}`
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "@id": `https://${city.domain}/#faq`,
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": `Combien coûte une maintenance incendie à ${city.city} ?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Le prix dépend du nombre et du type d'équipements, de la configuration du site et du niveau de contrôle requis. Un audit permet d'établir un devis adapté à ${city.city}.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Acceptez-vous la carte bancaire ?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Oui, tous nos chauffeurs acceptent la carte bancaire (Visa, Mastercard, Amex) ainsi que les espèces."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Comment demander un devis de sécurité incendie à ${city.city} ?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Vous pouvez demander un devis via le formulaire du site ou par téléphone au ${city.phoneNumber}. L'étude précise le type de bâtiment, les équipements présents et les obligations applicables.`
                        }
                    }
                ]
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
