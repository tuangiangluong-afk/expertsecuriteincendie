import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { FIRE_DUELS } from "@/data/operators";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Scale, Award, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { ogImageUrl } from "@/lib/seo-meta";

export const revalidate = 86400;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return FIRE_DUELS.map((d) => ({ slug: d.slug }));
}

const BASE_URL = "https://www.expertsecuriteincendie.fr";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const duel = FIRE_DUELS.find((d) => d.slug === slug);
  if (!duel) return {};

  const canonicalUrl = `${BASE_URL}/comparatif/${slug}`;
  return {
    title: `${duel.title} : Comparatif Réglementaire & Avis Expert 2026`,
    description: `${duel.summary} Verdict préventionniste : ${duel.winner}. Critères techniques et conformité Code du travail / ERP.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${duel.title} — Duel Réglementaire Incendie`,
      description: `${duel.summary} Arbitrage : ${duel.winner}.`,
      locale: "fr_FR",
      type: "website",
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl({
            q: duel.title,
            sub: `${duel.category} • Arbitrage : ${duel.winner}`,
            badge: "Duel Décisionnel Incendie",
          }),
          width: 1200,
          height: 630,
          alt: duel.title,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function FireDuelDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const duel = FIRE_DUELS.find((d) => d.slug === slug);
  if (!duel) return notFound();

  const canonicalUrl = `${BASE_URL}/comparatif/${slug}`;
  const breadcrumbItems = [
    { name: "Comparatifs & Duels", href: "/comparatifs" },
    { name: duel.title, href: `/comparatif/${slug}` },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quel équipement choisir entre ${duel.subjectA} et ${duel.subjectB} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Recommandation des experts en sécurité incendie : ${duel.winner}. ${duel.summary} ${duel.verdict}`,
        },
      },
      {
        "@type": "Question",
        name: `Que dit la réglementation ERP et Code du travail ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `La règle APSAD R4 et les articles R4227-28 et suivants du Code du travail imposent une dotation minimale d'extincteurs (1 pour 200 m²) et une vérification annuelle avec inscription obligatoire au registre de sécurité.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm mt-4 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
              {duel.category}
            </span>
            <span className="text-xs font-bold text-red-700 bg-red-100/70 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-red-600" />
              Verdict : {duel.winner}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {duel.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            {duel.summary}
          </p>

          <div className="p-5 rounded-2xl bg-red-50 border border-red-200 text-slate-800 leading-relaxed">
            <strong className="text-red-950 font-bold">L&apos;avis du préventionniste :</strong> {duel.verdict}
          </div>
        </section>

        {/* Comparison Matrix Table */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Scale className="w-6 h-6 text-red-600" />
            Matrice Comparative des Critères
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 px-4 font-semibold text-slate-700">Critère analysé</th>
                  <th className="py-3 px-4 font-semibold text-red-700">{duel.subjectA}</th>
                  <th className="py-3 px-4 font-semibold text-slate-800">{duel.subjectB}</th>
                  <th className="py-3 px-4 font-semibold text-slate-500">Précision Technique</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {duel.criteria.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-medium text-slate-900">{c.label}</td>
                    <td className="py-3 px-4 text-red-800 font-medium">{c.scoreA}</td>
                    <td className="py-3 px-4 text-slate-600">{c.scoreB}</td>
                    <td className="py-3 px-4 text-slate-500 text-xs">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Lead Funnel CTA */}
        <section className="bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 text-white rounded-3xl p-8 sm:p-10 text-center shadow-lg mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Besoin d&apos;un audit pour vos locaux ERP ou entreprise ?
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            Nos techniciens certifiés calculent la dotation réglementaire exacte selon vos m² et votre classe de risque.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 transition-colors shadow-md"
          >
            Obtenir un devis de conformité gratuit <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
