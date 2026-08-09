import { getAllGuides } from '@/lib/mdx';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Header from '@/components/Header';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export const revalidate = 60; // ISR 60 seconds

export const metadata: Metadata = {
    title: "Guides et Conseils matériel incendie | Expert Incendie",
    description: "Tout comprendre sur l'maintenance de extincteurs. Guides experts pour copropriété, maison individuelle et entreprises.",
};

export default async function GuidesIndex() {
    // 1. Fetch Static MDX Guides
    const staticGuides = getAllGuides();

    // 2. Normalize
    const allGuides = [...staticGuides].sort((a: any, b: any) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const uniqueGuidesMap = new Map();
    allGuides.forEach((g: any) => {
        if (!uniqueGuidesMap.has(g.slug)) {
            uniqueGuidesMap.set(g.slug, g);
        }
    });
    const guides = Array.from(uniqueGuidesMap.values());

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-slate-900">
            {/* Nav */}
            <Header isHub={true} variant="default" />

            <main className="container mx-auto px-4 py-16 pt-32">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        Le Centre de Ressources Incendie
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Guides, comparatifs et conseils d'experts pour réussir votre maintenance.
                        Sans jargon, 100% utile.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {guides.map((guide: any) => (
                        <Link
                            key={guide.slug}
                            href={`/guides/${guide.slug}`}
                            className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="mb-4">
                                <span className="inline-flex items-center text-xs font-bold text-red-700 bg-red-50 px-2 py-1 rounded-md uppercase tracking-wider mb-3">
                                    {guide.category || 'Guide'}
                                </span>
                                <h2 className="text-xl font-bold group-hover:text-red-600 transition-colors line-clamp-2">
                                    {guide.title}
                                </h2>
                            </div>

                            <p className="text-slate-600 mb-6 flex-grow line-clamp-3">
                                {guide.description}
                            </p>

                            <div className="flex items-center justify-between text-sm text-slate-400 mt-auto pt-4 border-t border-slate-100">
                                <div className="flex items-center gap-4">
                                    {guide.readTime && (
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} /> {guide.readTime}
                                        </span>
                                    )}
                                </div>
                                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-red-600 font-medium">
                                    Lire <ArrowRight size={14} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {guides.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                        <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500">Aucun guide publié pour le moment.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
