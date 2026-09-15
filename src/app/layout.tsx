import Script from "next/script";
import { headers } from "next/headers";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { getCurrentYearSEO } from "@/lib/date";
import StructuredData from "@/components/seo/StructuredData";
import AttributionTracker from "@/components/AttributionTracker";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  // Canonical host is ALWAYS this site's own host.
  const canonicalDomain = "www.expertsecuriteincendie.fr";
  const path = headersList.get("x-incendie-path") || "";
  const baseUrl = `https://${canonicalDomain}`;

  return {
    title: {
      template: `%s | Expert Sécurité Incendie®`,
      default: `Expert Sécurité Incendie® - Réseau National de Conformité & Maintenance Incendie ${getCurrentYearSEO()}`,
    },
    description: "Expert Sécurité Incendie : N°1 de la maintenance d'extincteurs, désenfumage et mise en conformité B2B pour entreprises, ERP et copropriétés en France. Devis gratuit sous 24h.",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `Expert Sécurité Incendie® - Réseau National de Conformité Incendie`,
      description: "N°1 de la maintenance d'extincteurs, désenfumage et mise en conformité B2B pour entreprises, ERP et copropriétés en France.",
      siteName: "Expert Sécurité Incendie",
      locale: "fr_FR",
      type: "website",
      url: `${baseUrl}${path}`,
      images: [
        {
          url: `${baseUrl}/api/og`,
          width: 1200,
          height: 630,
          alt: "Expert Sécurité Incendie® - Maintenance Extincteurs",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Expert Sécurité Incendie® - Réseau National de Conformité Incendie`,
      description: "N°1 de la maintenance d'extincteurs, désenfumage et mise en conformité B2B pour entreprises et ERP.",
      images: [`${baseUrl}/api/og`],
    },
    icons: {
      icon: "/icon.png",
      shortcut: "/favicon.png",
      apple: "/icon.png",
      other: [
        {
          rel: "icon",
          url: "/favicon.ico",
        }
      ]
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#dc2626",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Summary" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MLCNS53L');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-900 text-neutral-50`}
      >
        {/* AnswerShaper Local Tag */}
        <Script src="https://answershaper.com/api/v1/m2m/local-tag/25.js" strategy="lazyOnload" defer />

        <StructuredData />
        <GoogleAnalytics GA_MEASUREMENT_ID="G-3S88LL4FC5" />
        <AttributionTracker />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MLCNS53L"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
