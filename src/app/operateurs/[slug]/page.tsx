import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { OPERATORS } from "@/data/operators";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Layers,
  ArrowRight,
  TrendingDown,
  Calendar,
  Building2,
  Scale,
  Flame
} from "lucide-react";
import { ogImageUrl } from "@/lib/seo-meta";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return OPERATORS.map((op) => ({ slug: op.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const op = OPERATORS.find((o) => o.slug === slug);
  if (!op) return {};

  const title = `${op.name} : Avis, Tarifs Maintenance & APSAD 2026`;
  const description = `Audit indépendant de ${op.name} : grille tarifaire des vérifications annuelles d'extincteurs, agréments APSAD R4, avis clients et points de vigilance.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/operateurs/${op.slug}`,
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImageUrl({
            q: op.name,
            sub: "Audit Décryptage, Tarifs & Agréments APSAD • Sécurité Incendie 2026",
            badge: "Fiche Opérateur 2026",
          }),
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function OperateurDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const op = OPERATORS.find((o) => o.slug === slug);
  if (!op) notFound();

  const breadcrumbs = [
    { name: "Opérateurs & Maintenance", href: "/operateurs" },
    { name: op.name, href: `/operateurs/${op.slug}` },
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Maintenance Sécurité Incendie - ${op.name}`,
    image: ogImageUrl({
      q: op.name,
      sub: "Audit Mainteneur APSAD 2026",
      badge: "Expert Sécurité Incendie",
    }),
    description: op.shortDescription,
    sku: `ESI-OP-${op.slug.toUpperCase()}`,
    mpn: `APSAD-${op.slug}`,
    brand: {
      "@type": "Brand",
      name: op.name,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: op.ratingValue,
      reviewCount: op.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: op.ratingValue,
        bestRating: 5,
      },
      author: {
        "@type": "Organization",
        name: "Observatoire Expert Sécurité Incendie",
      },
      reviewBody: op.verdict,
      datePublished: op.publishedAt,
    },
    offers: {
      "@type": "Offer",
      url: `https://www.expertsecuriteincendie.fr/operateurs/${op.slug}`,
      priceCurrency: "EUR",
      price: op.priceRange === "€€" ? "180" : op.priceRange === "€€€" ? "290" : "450",
      priceValidUntil: "2026-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: op.name,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0.00",
          currency: "EUR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "FR",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 7,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "FR",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quels sont les points forts de ${op.name} pour un parc d'extincteurs ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: op.pros.join(". ") + ".",
        },
      },
      {
        "@type": "Question",
        name: `Quelles sont les limites ou tarifs constatés chez ${op.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: op.cons.join(". ") + `. Modèle de frais estimé : ${op.commissionEstimated}.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment réduire la facture de maintenance incendie par rapport à ${op.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour éviter les surcoûts des grands groupes, mettez en concurrence le devis de ${op.name} avec des techniciens vérificateurs certifiés AVAE indépendants qui n'appliquent aucune marge de siège social.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header isHub={true} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Header */}
        <section className="mt-4 mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
              {op.category}
            </span>
            {op.certifiedAPSAD && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Certification APSAD
              </span>
            )}
            {op.certifiedNFService && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-800">
                NF Service I4
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Avis &amp; Décryptage :{" "}
            <span className="text-red-600">{op.name}</span>
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            {op.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-sm">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <strong className="text-slate-900">{op.ratingValue}/5</strong>
              <span className="text-slate-500">({op.reviewCount} avis certifiés)</span>
            </div>
            <div className="border-l border-slate-200 pl-4 text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Audit mis à jour : 24 septembre 2026</span>
            </div>
          </div>
        </section>

        {/* Financial & Cost Audit */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            Audit Tarifaire &amp; Modèle Contractuel
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Gamme de Prix
              </div>
              <div className="text-2xl font-black text-slate-900 mb-1">
                {op.priceRange}
              </div>
              <p className="text-xs text-slate-500">
                Positionnement tarifaire global sur les visites annuelles
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-red-50 border border-red-200 shadow-sm">
              <div className="text-xs font-bold text-red-800 uppercase tracking-wider mb-1">
                Frais d&apos;Intermédiation
              </div>
              <div className="text-sm font-bold text-red-900 mb-1">
                {op.commissionEstimated.split("(")[0]}
              </div>
              <p className="text-xs text-slate-600">
                Frais de structure réseau et logistique
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm">
              <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Garantie Juridique
              </div>
              <div className="text-sm font-bold text-slate-900 mb-1">
                {op.certifiedAPSAD ? "Certificat Q4 Assurance" : "Rapport de conformité NF"}
              </div>
              <p className="text-xs text-slate-600">
                Valeur probante devant assureur et commission ERP
              </p>
            </div>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mb-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Points forts de {op.name}
              </h3>
              <ul className="space-y-3">
                {op.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-slate-400" />
                Limites &amp; Points de vigilance
              </h3>
              <ul className="space-y-3">
                {op.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Editorial Review */}
        <section className="mb-10">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-red-600" />
              L&apos;Avis d&apos;Expert Sécurité Incendie
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
              {op.editorialReview}
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <strong>Marques et matériels associés :</strong> {op.hardwareBrands.join(", ")}.
            </div>
          </div>
        </section>

        {/* Verdict Banner */}
        <section className="mb-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-red-950 text-white shadow-lg">
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4" />
              Le Verdict en 1 Ligne
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">{op.verdict}</h3>
            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-700/80 text-xs text-slate-300">
              <span>Conforme Code du Travail art. R. 4227-39</span>
              <span>•</span>
              <span>Norme NF S 61-919</span>
              <span>•</span>
              <span>Émargement Registre de Sécurité</span>
            </div>
          </div>
        </section>

        {/* Arbitrage CTA Banner with LeadForm */}
        <section className="mb-14">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md">
            <div className="max-w-2xl mb-6">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Arbitrage Recommandé
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-3">
                {op.arbitrageCTA}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ne restez pas captif d&apos;un contrat de maintenance aux tarifs imposés : demandez une contre-expertise gratuite et comparez 3 devis de techniciens vérificateurs certifiés de votre région.
              </p>
            </div>
            <LeadForm domain="expertsecuriteincendie.fr" city="France" themeColor="red" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-red-600" />
            Questions fréquentes sur {op.name}
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
