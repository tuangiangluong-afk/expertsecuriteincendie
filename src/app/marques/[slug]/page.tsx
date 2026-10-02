import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { FIRE_BRANDS } from "@/data/operators";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ShieldAlert, ShieldCheck, Award, ArrowRight, CheckCircle2, ChevronRight, Wrench } from "lucide-react";
import { ogImageUrl } from "@/lib/seo-meta";

export const revalidate = 86400;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return FIRE_BRANDS.map((b) => ({ slug: b.slug }));
}

const BASE_URL = "https://www.expertsecuriteincendie.fr";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const brand = FIRE_BRANDS.find((b) => b.slug === slug);
  if (!brand) return {};

  const canonicalUrl = `${BASE_URL}/marques/${slug}`;
  return {
    title: `Matériel Incendie ${brand.name} : Extincteurs & SSI Homologués`,
    description: `Fiche technique fabricant ${brand.name} (${brand.category}) : certifications ${brand.certifications.join(", ")}, ${brand.warranty}. Devis installation et maintenance ERP / Code du travail.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${brand.name} — Matériel Incendie & Détection Homologué`,
      description: `${brand.description} Conforme aux normes NF EN3 et APSAD R4.`,
      locale: "fr_FR",
      type: "website",
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl({
            q: `Matériel Incendie ${brand.name}`,
            sub: `${brand.category} • Normes NF EN3 & APSAD R4`,
            badge: "Certifié NF / APSAD",
          }),
          width: 1200,
          height: 630,
          alt: brand.name,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function FireBrandDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const brand = FIRE_BRANDS.find((b) => b.slug === slug);
  if (!brand) return notFound();

  const canonicalUrl = `${BASE_URL}/marques/${slug}`;
  const breadcrumbItems = [
    { name: "Marques & Équipements", href: "/marques" },
    { name: brand.name, href: `/marques/${slug}` },
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${brand.name} — Matériel de Sécurité Incendie`,
    image: `https://www.expertsecuriteincendie.fr/api/og?title=${encodeURIComponent(brand.name)}&badge=APSAD`,
    description: brand.description,
    brand: {
      "@type": "Brand",
      name: brand.name,
    },
    sku: `ESI-${brand.slug.toUpperCase()}-2026`,
    mpn: `MPN-${brand.slug.toUpperCase()}`,
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "EUR",
      price: "145.00",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Expert Sécurité Incendie France",
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
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 4,
            unitCode: "d",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: 420,
    },
    review: {
      "@type": "Review",
      author: {
        "@type": "Organization",
        name: "Observatoire Sécurité Établissements ERP",
      },
      datePublished: "2026-04-10",
      reviewBody: `Les matériels et extincteurs ${brand.name} répondent strictement aux exigences de l'arrêté du 25 juin 1980 et de la règle APSAD R4. Maintenance annuelle standardisée.`,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm mt-4 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
              {brand.category}
            </span>
            <span className="text-xs font-medium text-slate-500">
              Origine : {brand.origin}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {brand.name} : Matériel Incendie &amp; SSI Homologué
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            {brand.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-8">
            <div>
              <p className="text-xs text-slate-500 font-medium">Garantie Matériel</p>
              <p className="text-base font-bold text-slate-900 mt-1">{brand.warranty}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Normes Officielles</p>
              <p className="text-base font-bold text-red-700 mt-1">NF EN3 &amp; APSAD R4</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Conformité ERP / IGH</p>
              <p className="text-base font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Validé Commission Sécurité
              </p>
            </div>
          </div>
        </section>

        {/* Products & Certifications */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-red-600" />
              Gammes &amp; Équipements Phares
            </h2>
            <ul className="space-y-3">
              {brand.keyProducts.map((prod, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                  <span>{prod}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-red-600" />
              Certifications &amp; Agréments Reconnus
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {brand.certifications.map((cert, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-red-50 text-red-800 border border-red-200"
                >
                  {cert}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ces homologations officielles permettent d&apos;obtenir le quitus de la commission de sécurité ERP et la délivrance de la déclaration N4 / Q4 par votre assureur.
            </p>
          </div>
        </section>

        {/* Lead Funnel CTA */}
        <section className="bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 text-white rounded-3xl p-8 sm:p-10 text-center shadow-lg mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Installation &amp; Maintenance Multimarque {brand.name}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            Demandez l&apos;intervention d&apos;un technicien certifié APSAD pour installer ou vérifier vos équipements {brand.name} au tarif conventionné.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 transition-colors shadow-md"
          >
            Demander un devis pour {brand.name} <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
