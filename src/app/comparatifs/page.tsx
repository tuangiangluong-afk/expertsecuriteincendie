import Link from "next/link";
import type { Metadata } from "next";
import { FIRE_DUELS } from "@/data/operators";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ShieldCheck, Scale, ArrowRight, CheckCircle2, Award, Flame } from "lucide-react";
import { ogImageUrl } from "@/lib/seo-meta";

export const metadata: Metadata = {
  title: "Comparatifs & Choix Sécurité Incendie | Expert Sécurité Incendie",
  description: "Comparatifs neutres de matériel incendie : Eau vs CO2, Poudre vs Eau, SSI Type 1 vs Type 4, BAES autonome vs Source centrale, Mainteneur indépendant vs Constructeur.",
  alternates: {
    canonical: "/comparatifs",
  },
  openGraph: {
    title: "Duels & Arbitrages Techniques de Sécurité Incendie 2026",
    description: "Comparatifs critère par critère pour choisir le bon extincteur et le système SSI adapté à votre ERP ou entreprise.",
    images: [
      {
        url: ogImageUrl({
          q: "Comparatifs & Arbitrages Incendie 2026",
          sub: "Eau vs CO2 • Poudre vs Eau • SSI Type 1 vs 4 • BAES vs Source Centrale",
          badge: "Duels Réglementaires",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ComparatifsHubPage() {
  const breadcrumbItems = [{ name: "Comparatifs", href: "/comparatifs" }];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Comparatifs et Duels Techniques Sécurité Incendie 2026",
    description: "Analyses comparatives d'experts pour arbitrer les choix d'équipements incendie et de maintenance.",
    numberOfItems: FIRE_DUELS.length,
    itemListElement: FIRE_DUELS.map((d, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Article",
        headline: d.title,
        description: d.summary,
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FIRE_DUELS.map((d) => ({
      "@type": "Question",
      name: d.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${d.summary} Arbitrage recommandé : ${d.winner}. ${d.verdict}`,
      },
    })),
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

        <section className="mt-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200 mb-4">
            <Scale className="w-4 h-4 text-red-600" />
            Arbitrages Techniques &amp; Réglementaires 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Comparatifs &amp; Duels de Sécurité Incendie
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            Chaque équipement répond à un risque d&apos;incendie précis : découvrez nos analyses comparatives neutres pour équiper vos locaux sans acheter de matériel inutile ou non conforme.
          </p>
        </section>

        <section className="space-y-8 mb-16">
          {FIRE_DUELS.map((duel) => (
            <article
              key={duel.slug}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  {duel.category}
                </span>
                <span className="text-xs font-bold text-red-800 bg-red-50 px-3 py-1 rounded-full border border-red-200 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-red-600" />
                  Arbitrage : {duel.winner}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                {duel.title}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {duel.summary}
              </p>

              {/* Matrix Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="py-2.5 px-3 font-semibold text-slate-700">Critère analysé</th>
                      <th className="py-2.5 px-3 font-semibold text-red-700">{duel.subjectA}</th>
                      <th className="py-2.5 px-3 font-semibold text-slate-800">{duel.subjectB}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {duel.criteria.map((c, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 font-medium text-slate-900">{c.label}</td>
                        <td className="py-2.5 px-3 text-red-800 font-medium">{c.scoreA}</td>
                        <td className="py-2.5 px-3 text-slate-600">{c.scoreB}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 mb-6 leading-relaxed">
                <strong>Verdict d&apos;expert :</strong> {duel.verdict}
              </div>

              <div className="flex justify-end">
                <Link
                  href={`/comparatif/${duel.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-red-600 transition-colors"
                >
                  Lire l&apos;analyse comparative <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Lead CTA */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 text-center max-w-3xl mx-auto mb-16 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Besoin d&apos;un audit pour dimensionner votre parc ?
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            Nos techniciens calculent le nombre exact d&apos;extincteurs (règle 1 extincteur pour 200 m²) et les blocs de secours nécessaires pour valider votre commission de sécurité.
          </p>
          <Link
            href="/#simulateur"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 transition-colors shadow-md"
          >
            Demander un audit gratuit <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
