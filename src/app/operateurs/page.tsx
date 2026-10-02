import Link from "next/link";
import type { Metadata } from "next";
import { OPERATORS } from "@/data/operators";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import {
  ShieldCheck,
  Star,
  ArrowRight,
  TrendingDown,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Flame,
  Award,
  Users
} from "lucide-react";
import { ogImageUrl } from "@/lib/seo-meta";

export const metadata: Metadata = {
  title: "12 Opérateurs & Mainteneurs Incendie 2026 | Expert Sécurité Incendie",
  description: "Comparatif indépendant des 12 réseaux de maintenance d'extincteurs, SSI et désenfumage : Desautel, Eurofeu, Chubb, Siemens. Tarifs, agréments APSAD et avis.",
  alternates: {
    canonical: "/operateurs",
  },
  openGraph: {
    title: "12 Opérateurs de Sécurité Incendie & Maintenance au Banc d'Essai",
    description: "Audit des constructeurs, mainteneurs multimarques et installateurs SSI. Évitez les surcoûts et sécurisez votre commission de sécurité ERP.",
    images: [
      {
        url: ogImageUrl({
          q: "12 Opérateurs Sécurité Incendie & SSI",
          sub: "Audit des Tarifs de Maintenance & Agréments APSAD • ERP & Entreprises",
          badge: "Observatoire Incendie 2026",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function OperateursHubPage() {
  const breadcrumbItems = [{ name: "Opérateurs & Maintenance", href: "/operateurs" }];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Opérateurs de Sécurité Incendie & Réseaux de Maintenance 2026",
    description: "Sélection des acteurs nationaux de la maintenance d'extincteurs, colonnes sèches, RIA et systèmes SSI.",
    numberOfItems: OPERATORS.length,
    itemListElement: OPERATORS.map((op, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Organization",
        name: op.name,
        url: `https://www.expertsecuriteincendie.fr/operateurs/${op.slug}`,
        description: op.shortDescription,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: op.ratingValue,
          reviewCount: op.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quelle est la différence entre un constructeur direct et un mainteneur multimarque ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Un constructeur (comme Desautel ou Rot) fabrique les appareils et garantit les pièces d'origine mais facture des tarifs élevés. Un mainteneur multimarque certifié AVAE (ou ancien pompier) entretient n'importe quelle marque existante à un tarif 30 % à 50 % moins cher, avec la même valeur juridique sur le registre de sécurité.",
        },
      },
      {
        "@type": "Question",
        name: "La certification APSAD est-elle obligatoire pour la maintenance des extincteurs ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La règle APSAD R4 est une certification privée émise par le CNPP, exigée par certains assureurs dans les contrats d'assurance incendie des entreprises. Pour les ERP de 5ème catégorie et petits commerces, la qualification d'un technicien titulaire du diplôme d'État CAP AVAE est légalement suffisante devant la commission de sécurité.",
        },
      },
      {
        "@type": "Question",
        name: "À quelle fréquence les extincteurs doivent-ils être vérifiés ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La vérification périodique des extincteurs est strictement annuelle (Code du travail art. R. 4227-39 et règle NF S 61-919). Une révision approfondie quinquennale (5 ans) et une épreuve hydraulique décennale (10 ans) sont obligatoires.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header isHub={true} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="mt-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200 mb-4">
            <Flame className="w-4 h-4 text-red-600" />
            Observatoire des Prestataires &amp; Agréments APSAD 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Opérateurs &amp; Mainteneurs de Sécurité Incendie
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            Pour assurer la conformité de votre établissement (ERP, locaux professionnels, copropriétés) et valider votre passage en commission de sécurité, découvrez notre audit comparatif des 12 réseaux nationaux de maintenance d&apos;extincteurs, RIA et SSI.
          </p>

          <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900 text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Règle d&apos;or anti-surfacturation :</strong> Les grands réseaux facturent fréquemment entre <strong>28 € et 45 € HT</strong> par extincteur en imposant des remplacements anticipés. Les techniciens indépendants certifiés AVAE appliquent un tarif réel de <strong>12 € à 22 € HT</strong> pour une vérification rigoureuse et conforme.
            </div>
          </div>
        </section>

        {/* Operators Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {OPERATORS.map((op) => (
            <article
              key={op.slug}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-red-500/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {op.category}
                  </span>
                  <div className="flex items-center text-amber-600 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                    {op.ratingValue}/5
                    <span className="text-slate-400 font-normal ml-1">({op.reviewCount})</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  <Link
                    href={`/operateurs/${op.slug}`}
                    className="hover:text-red-600 transition-colors"
                  >
                    {op.name}
                  </Link>
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {op.shortDescription}
                </p>

                <div className="space-y-1.5 mb-4">
                  {op.pros.slice(0, 2).map((pro, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-[11px] text-slate-500 mb-3 flex items-center justify-between">
                  <span>Modèle de frais :</span>
                  <span className="font-semibold text-slate-700">{op.priceRange}</span>
                </div>
                <Link
                  href={`/operateurs/${op.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-red-600 transition-colors"
                >
                  Lire l&apos;audit complet <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Arbitrage Strategy Section */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 mb-16 shadow-sm">
          <div className="max-w-3xl">
            <span className="text-red-600 text-xs font-bold uppercase tracking-wider">
              Guide d&apos;Arbitrage Réglementaire
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-4">
              Quel type d&apos;opérateur choisir pour vos locaux ?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              Entre le Code du travail (obligation employeur), les règles APSAD imposées par les assureurs et le règlement des ERP, le bon choix dépend de votre typologie de bâtiment.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">1. Technicien Indépendant AVAE</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Idéal pour PME, commerces et copropriétés : contrôle consciencieux au juste prix, zéro marge de call-center.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">2. Réseau Constructeur (Desautel, Eurofeu)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Recommandé pour les grands comptes multisites et usines nécessitant une gestion centralisée et des pièces certifiées d&apos;usine.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-3">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">3. Bureau de Contrôle (SOCOTEC)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  À mandater en tant que tiers neutre pour auditer votre conformité Q18 et préparer le passage de la commission de sécurité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form CTA */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <span className="text-red-400 text-xs font-bold uppercase tracking-wider">
                Devis Gratuit Sous 24h
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold mt-1 mb-4 leading-tight">
                Vérification annuelle &amp; Mise aux normes incendie
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Bénéficiez de tarifs directs sans surcommission de grand groupe : comparez 3 devis de techniciens vérificateurs certifiés APSAD &amp; NF Service de votre département.
              </p>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Registre de sécurité paraphé et conforme</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Certificat Q4 pour votre compagnie d&apos;assurance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Intervention sous 48h en cas d&apos;urgence ou contrôle</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-xl">
                <LeadForm domain="expertsecuriteincendie.fr" city="France" themeColor="red" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Questions fréquentes sur les contrats de maintenance incendie
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
