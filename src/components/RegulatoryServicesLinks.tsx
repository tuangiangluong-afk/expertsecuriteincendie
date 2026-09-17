import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileCheck2, ShieldCheck } from "lucide-react";

const links = [
    { href: "/verifications-reglementaires/ssi-triennale", title: "Vérification réglementaire SSI", text: "Qualifier le périmètre du système de sécurité incendie et les documents disponibles.", icon: ShieldCheck },
    { href: "/verifications-reglementaires/controle-electrique-q18", title: "Contrôle électrique et rapport Q18", text: "Clarifier le rapport demandé par l'établissement ou l'assureur.", icon: FileCheck2 },
    { href: "/commission-de-securite-erp/mise-aux-normes", title: "Préparer une commission ERP", text: "Organiser les échéances, rapports et réserves avant la visite.", icon: ClipboardCheck },
];

export default function RegulatoryServicesLinks() {
    return <section className="border-y border-slate-200 bg-slate-50 py-16"><div className="container mx-auto px-4"><div className="mx-auto mb-10 max-w-2xl text-center"><p className="mb-3 text-sm font-bold uppercase tracking-wide text-red-600">Besoins réglementaires ERP</p><h2 className="text-3xl font-bold text-slate-900">Vérification, rapport ou préparation de commission</h2><p className="mt-3 text-slate-600">Décrivez votre situation pour être orienté vers le bon type d'intervenant. Chaque mission et chaque périodicité sont confirmées au cas par cas.</p></div><div className="grid gap-5 md:grid-cols-3">{links.map(({ href, title, text, icon: Icon }) => <Link key={href} href={href} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-red-300 hover:shadow-lg"><Icon className="mb-5 text-red-600" size={30} /><h3 className="text-lg font-bold text-slate-900 group-hover:text-red-700">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-red-600">Qualifier ma demande <ArrowRight size={16} /></span></Link>)}</div></div></section>;
}
