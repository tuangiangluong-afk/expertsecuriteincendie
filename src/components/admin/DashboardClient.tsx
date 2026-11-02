"use client";

import { Users, TrendingUp, Star, Globe, ArrowRight, Flame, Shield, Coins, Zap } from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/database.types";
import { useMemo } from "react";

interface DashboardClientProps {
    initialLeads: Database['public']['Tables']['leads']['Row'][];
    siteCount: number;
}

export default function DashboardClient({ initialLeads, siteCount }: DashboardClientProps) {
    // Fire Safety vs Historical Leads
    const { fireLeads, soldCount, newCount } = useMemo(() => {
        const fire = initialLeads.filter(l => {
            const raw = l.message || "";
            return (
                raw.includes("projectType") ||
                raw.includes("needType") ||
                raw.includes("commission_erp") ||
                raw.includes("conformite") ||
                raw.includes("extincteur") ||
                (Boolean(l.company) && !raw.includes("vehicle_status"))
            );
        });

        const sold = fire.filter(l => l.status === "sold" || l.status === "dispatched").length;
        const fresh = fire.filter(l => l.status === "new").length;

        return { fireLeads: fire, soldCount: sold, newCount: fresh };
    }, [initialLeads]);

    const totalLeads = fireLeads.length;
    const conversionRate = totalLeads > 0 ? ((soldCount / totalLeads) * 100).toFixed(1) : "0";
    const recentActivity = fireLeads.slice(0, 5);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
                        <Flame className="text-red-600 h-7 w-7" />
                        Tableau de Bord · Expert Sécurité Incendie
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Pilotage des leads B2B (ERP/ERT), réseau d'installateurs agréés et attributions
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs bg-red-50 text-red-700 px-3 py-1.5 rounded-xl font-bold border border-red-200 flex items-center gap-1.5 shadow-sm">
                        <Shield size={13} className="text-red-600" /> Plateforme Sécurité Incendie Active
                    </span>
                </div>
            </div>

            {/* Quick Action Top Pills */}
            <div className="flex flex-wrap items-center gap-2">
                <Link
                    href="/admin/leads"
                    className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-black text-white hover:bg-red-700 transition shadow-sm shadow-red-600/20"
                >
                    <Flame size={14} />
                    Bourse des Leads ({fireLeads.length})
                </Link>
                <Link
                    href="/admin/partners"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-black text-white hover:bg-slate-800 transition shadow-sm"
                >
                    <Users size={14} />
                    Réseau Installateurs & Wallets
                </Link>
                <Link
                    href="/admin/sites"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
                >
                    <Globe size={14} className="text-slate-500" />
                    Réseau Villes ({siteCount} sites)
                </Link>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                        <Flame size={14} className="text-red-500" /> Dossiers Incendie Reçus
                    </h3>
                    <p className="text-3xl font-black text-slate-900 mt-2">{fireLeads.length}</p>
                    <span className="text-xs text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                        {newCount} à traiter
                    </span>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                        <Users size={14} className="text-emerald-500" /> Dossiers Attribués / Vendus
                    </h3>
                    <p className="text-3xl font-black text-slate-900 mt-2">{soldCount}</p>
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                        Taux arbitrage : {conversionRate}%
                    </span>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                        <Globe size={14} className="text-blue-500" /> Couverture Territoriale
                    </h3>
                    <p className="text-3xl font-black text-slate-900 mt-2">{siteCount}</p>
                    <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                        Villes & Dpts indexés
                    </span>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                        <Star size={14} className="text-amber-500" /> Note Réseau Vérifié
                    </h3>
                    <p className="text-3xl font-black text-slate-900 mt-2">4.9 / 5</p>
                    <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full mt-2 inline-block">
                        Conformité APSAD / NF
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Shortcuts */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                    <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                        Pilotage Rapide
                    </h2>
                    <div className="space-y-2.5">
                        <Link href="/admin/leads" className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl hover:bg-red-50 hover:text-red-700 transition group border border-slate-100">
                            <div>
                                <span className="font-bold text-sm block">Bourse des Leads & Devis</span>
                                <span className="text-xs text-slate-500">Attribuer manuellement ou consulter les demandes</span>
                            </div>
                            <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition text-slate-400 group-hover:text-red-600" />
                        </Link>
                        <Link href="/admin/partners" className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl hover:bg-red-50 hover:text-red-700 transition group border border-slate-100">
                            <div>
                                <span className="font-bold text-sm block">Réseau d'Installateurs & Wallets</span>
                                <span className="text-xs text-slate-500">Recharger les comptes, ajuster les prix et l'auto-dispatch</span>
                            </div>
                            <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition text-slate-400 group-hover:text-red-600" />
                        </Link>
                        <Link href="/admin/sites" className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl hover:bg-red-50 hover:text-red-700 transition group border border-slate-100">
                            <div>
                                <span className="font-bold text-sm block">Gestion du Réseau (50+ sites)</span>
                                <span className="text-xs text-slate-500">Pages locales, SEO et contenus réglementaires</span>
                            </div>
                            <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition text-slate-400 group-hover:text-red-600" />
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-base font-black text-slate-900">Derniers Dossiers Incendie</h2>
                        <Link href="/admin/leads" className="text-xs text-red-600 font-bold hover:underline">Voir tout ({fireLeads.length})</Link>
                    </div>
                    {recentActivity.length === 0 ? (
                        <div className="py-8 text-center text-slate-400 font-medium italic text-xs">
                            Aucun dossier incendie pour l'instant.
                        </div>
                    ) : (
                        <ul className="divide-y divide-slate-100">
                            {recentActivity.map((lead) => (
                                <li key={lead.id} className="py-3 flex items-center justify-between">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-9 h-9 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-black text-xs">
                                            {lead.company?.charAt(0) || lead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-900">{lead.company || lead.name}</p>
                                            <p className="text-[11px] text-slate-500">{lead.city || "France"} · {lead.postal_code || ""}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                            lead.status === 'sold' ? 'bg-emerald-100 text-emerald-800' :
                                            lead.status === 'dispatched' ? 'bg-blue-100 text-blue-800' :
                                            lead.status === 'new' ? 'bg-red-100 text-red-700' :
                                            'bg-slate-100 text-slate-600'
                                        }`}>
                                            {lead.status === 'sold' ? 'Vendu' : lead.status === 'dispatched' ? 'Attribué' : lead.status === 'new' ? 'Nouveau' : lead.status}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
