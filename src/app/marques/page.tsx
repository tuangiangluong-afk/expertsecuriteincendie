import Link from "next/link";
import type { Metadata } from "next";
import { FIRE_BRANDS } from "@/data/operators";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ShieldCheck, Award, ArrowRight, Layers, CheckCircle2, Flame } from "lucide-react";
import { ogImageUrl } from "@/lib/seo-meta";

export const metadata: Metadata = {
  title: "Marques & Fabricants d'Extincteurs Certifiés NF EN3 | Expert Sécurité Incendie",
  description: "Guide des fabricants d'extincteurs et matériels de sécurité incendie : Desautel, Sicli, Eurofeu, Rot, Chubb, Andrieu. Normes NF EN3 et APSAD R4.",
  alternates: {
    canonical: "/marques",
  },
  openGraph: {
    title: "Fabricants d'Extincteurs & Systèmes SSI Agréés 2026",
    description: "Comparatif technique des marques d'extincteurs portables, sur roues et RIA certifiées NF et conformes aux commissions de sécurité ERP.",
    images: [
      {
        url: ogImageUrl({
          q: "Fabricants d'Extincteurs & Matériel Incendie",
          sub: "Desautel, Sicli, Eurofeu, Rot, Chubb, Andrieu • Normes NF EN3 & APSAD",
          badge: "Matériel Certifié NF",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function MarquesHubPage() {
  const breadcrumbItems = [{ name: "Marques & Extincteurs", href: "/marques" }];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Marques et Fabricants d'Extincteurs Certifiés NF 2026",
    description: "Sélection des marques de référence en sécurité incendie pour les ERP et les locaux professionnels.",
    numberOfItems: FIRE_BRANDS.length,
    itemListElement: FIRE_BRANDS.map((b, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Brand",
        name: b.name,
        description: b.description,
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <section className="mt-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200 mb-4">
            <Flame className="w-4 h-4 text-red-600" />
            Normes NF EN3 &amp; Agréments CNPP 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Marques &amp; Fabricants d&apos;Extincteurs Certifiés
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            Pour être homologué dans un établissement recevant du public (ERP) ou une entreprise soumise au Code du travail, un extincteur doit obligatoirement porter l&apos;estampille <strong>NF EN3</strong> et le marquage CE. Découvrez les marques leaders au banc d&apos;essai.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {FIRE_BRANDS.map((b) => (
            <article
              key={b.slug}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-red-500/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {b.category}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {b.origin}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  {b.name}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {b.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Garantie :</span>
                    <strong className="text-slate-700 font-semibold">{b.warranty.split("/")[0]}</strong>
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Équipements phares :
                  </div>
                  {b.keyProducts.slice(0, 3).map((prod, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>{prod}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex flex-wrap gap-1 mb-3">
                  {b.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-red-50 text-red-800 border border-red-100"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/marques/${b.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-red-600 transition-colors"
                >
                  Voir la fiche technique <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Call to action */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 text-center max-w-3xl mx-auto mb-16 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Faites vérifier vos appareils par un technicien certifié
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            Quelle que soit la marque de vos extincteurs déjà installés (Desautel, Eurofeu, Sicli, Rot), nos partenaires certifiés AVAE assurent la vérification annuelle sans obligation de changer de parc.
          </p>
          <Link
            href="/#simulateur"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-md"
          >
            Obtenir un devis pour mon parc <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
