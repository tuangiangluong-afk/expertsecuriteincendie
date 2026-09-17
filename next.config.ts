
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.transparenttextures.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  trailingSlash: false,
  async redirects() {
    return [
      // La marque « Andrieu » a été retirée du catalogue : son site constructeur
      // n'est pas accessible et aucune gamme n'a pu être vérifiée. Ses pages
      // ville x marque et sa page maintenance renvoyaient un contenu sans
      // substance vérifiable ; elles sont redirigées en 301 plutôt que servies.
      {
        source: "/ville/:slug/andrieu",
        destination: "/ville/:slug",
        statusCode: 301,
      },
      {
        source: "/maintenance/andrieu",
        destination: "/",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/((?!api|admin|login|_next).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:;"
          }
        ],
      },
    ]
  },
};

// Force restart
export default nextConfig;
