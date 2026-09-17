import Link from "next/link";
import { ArrowRight, CheckCircle, ClipboardCheck, FileCheck2, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import RegulatoryLeadForm from "@/components/RegulatoryLeadForm";
import { getHubConfig } from "@/lib/sites-config";
import SchemaJSON from "@/components/SchemaJSON";
import type { CityConfig } from "@/lib/db";

type RegulatoryPage = "ssi" | "q18" | "commission";

const pageData: Record<RegulatoryPage, {
    title: string;
    description: string;
    eyebrow: string;
    intro: string;
    need: "ssi_triennale" | "q18" | "commission_erp";
    h2: string;
    paragraphs: string[];
    bullets: string[];
    faq: Array<{ q: string; a: string }>;
}> = {
    ssi: {
        title: "Vérification réglementaire SSI en ERP | Qualification et devis",
        description: "Besoin d'une vérification de votre SSI en ERP ? Décrivez votre établissement, votre échéance et vos documents pour être orienté vers un intervenant adapté.",
        eyebrow: "Système de sécurité incendie · ERP",
        intro: "Préparez votre vérification SSI avec un interlocuteur qui commence par qualifier le périmètre réel de votre établissement.",
        need: "ssi_triennale",
        h2: "À quoi sert une vérification SSI ?",
        paragraphs: [
            "Une vérification SSI permet de contrôler, selon le périmètre applicable à l'établissement et le référentiel retenu, le fonctionnement et la cohérence des équipements qui concourent à la sécurité incendie. Elle ne se résume pas à la maintenance d'un extincteur : le type de SSI, les zones protégées, les scénarios de mise en sécurité et les documents disponibles doivent être examinés.",
            "La périodicité, le contenu du rapport et la qualification de l'intervenant dépendent notamment de la catégorie de l'ERP, de ses installations et des exigences de la commission de sécurité ou de l'assureur. Notre formulaire recueille ces éléments avant toute orientation ; il ne promet ni agrément automatique ni validation réglementaire.",
        ],
        bullets: ["Identifier le type d'établissement et le périmètre SSI", "Faire le point sur la dernière vérification et les réserves", "Préparer les documents utiles : registre, rapports, plans et contrats", "Orienter vers un prestataire ou organisme adapté à la demande"],
        faq: [
            { q: "La vérification SSI est-elle toujours triennale ?", a: "La périodicité dépend du cadre applicable à l'établissement et à ses installations. Elle doit être confirmée au cas par cas à partir du registre de sécurité, des prescriptions et des rapports précédents." },
            { q: "Qui réalise une vérification SSI ?", a: "Cela dépend du type de vérification et du périmètre. L'intervenant doit disposer des compétences, qualifications ou accréditations requises pour la mission concernée ; la qualification est vérifiée lors de l'orientation." },
        ],
    },
    q18: {
        title: "Contrôle électrique ERP et rapport Q18 | Demande de qualification",
        description: "Votre assureur ou votre établissement demande un contrôle électrique ? Qualifiez votre site, votre échéance et votre besoin de rapport avant d'être orienté.",
        eyebrow: "Installations électriques · ERP et entreprises",
        intro: "Ne demandez pas un rapport au hasard : le bon contrôle dépend de l'installation, du document demandé et de l'usage qui en sera fait.",
        need: "q18",
        h2: "Contrôle électrique : clarifier le bon document",
        paragraphs: [
            "Les termes Q18, vérification électrique, thermographie ou rapport pour l'assureur sont parfois employés indistinctement alors qu'ils ne recouvrent pas nécessairement la même mission. Le périmètre doit être précisé avec l'exploitant, l'assureur et l'intervenant compétent.",
            "Nous recueillons le type de bâtiment, le code postal, l'échéance et le besoin exprimé afin de transmettre une demande exploitable. Le rapport final et ses conclusions relèvent exclusivement du professionnel ou de l'organisme chargé de la mission.",
        ],
        bullets: ["Distinguer contrôle périodique, thermographie et rapport demandé par l'assureur", "Décrire le site et ses installations principales", "Indiquer la prochaine échéance ou la demande de la commission", "Recevoir une orientation vers un intervenant adapté au périmètre"],
        faq: [
            { q: "Un rapport Q18 est-il obligatoire pour tous les établissements ?", a: "Les obligations et demandes documentaires varient selon le site, son activité, ses installations et son contrat d'assurance. Il faut confirmer le document exigé avant de commander une mission." },
            { q: "Le contrôle électrique remplace-t-il la vérification SSI ?", a: "Non. Les installations électriques et le système de sécurité incendie peuvent relever de contrôles distincts, avec des intervenants et des rapports différents." },
        ],
    },
    commission: {
        title: "Préparer une commission de sécurité ERP | Mise au point conformité",
        description: "Commission de sécurité proche ? Faites qualifier les équipements, rapports et réserves de votre ERP avant de demander une intervention.",
        eyebrow: "Commission de sécurité · Établissements recevant du public",
        intro: "Gagnez du temps avant la commission : listez votre établissement, vos réserves et vos échéances pour obtenir une orientation précise.",
        need: "commission_erp",
        h2: "Préparer une commission de sécurité sans fausse promesse",
        paragraphs: [
            "Une commission de sécurité examine la situation de l'établissement au regard des règles qui lui sont applicables et des prescriptions qui lui ont été notifiées. Une intervention commerciale ne remplace ni la commission, ni l'autorité compétente, ni un avis administratif.",
            "En revanche, une qualification en amont peut aider à réunir les rapports, vérifier les contrats de maintenance, identifier les réserves techniques et solliciter les bons interlocuteurs dans le délai disponible.",
        ],
        bullets: ["Centraliser la date de visite et les prescriptions connues", "Lister les rapports manquants ou arrivés à échéance", "Distinguer maintenance, vérification et travaux correctifs", "Prioriser les demandes selon le calendrier réel du site"],
        faq: [
            { q: "Une demande urgente garantit-elle une intervention avant la commission ?", a: "Non. Le délai dépend de la disponibilité et du périmètre de la mission. Le formulaire sert à prioriser la qualification, sans garantir une date d'intervention." },
            { q: "Pouvez-vous garantir un avis favorable ?", a: "Non. Seule l'autorité compétente rend son avis. Un prestataire peut contrôler ou corriger certains points, mais ne peut pas garantir la décision de la commission." },
        ],
    },
};

export default function RegulatoryLanding({ page, city }: { page: RegulatoryPage; city?: CityConfig }) {
    const data = pageData[page];
    const hub = getHubConfig();
    const basePath = page === "ssi" ? "verifications-reglementaires/ssi-triennale" : page === "q18" ? "verifications-reglementaires/controle-electrique-q18" : "commission-de-securite-erp/mise-aux-normes";
    const canonical = `https://www.expertsecuriteincendie.fr/${city ? `ville/${city.slug}/${basePath}` : basePath}`;
    const locationLabel = city ? ` à ${city.city}` : "";
    const breadcrumb = [{ name: "Accueil", item: "https://www.expertsecuriteincendie.fr" }, { name: data.eyebrow, item: canonical }];

    return <div className="min-h-screen bg-slate-50 text-slate-900">
        <SchemaJSON type="Breadcrumb" breadcrumbItems={breadcrumb} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: data.title, description: data.description, url: canonical, provider: { "@type": "Organization", name: "Expert Sécurité Incendie", url: "https://www.expertsecuriteincendie.fr" }, areaServed: { "@type": "Country", name: "France" } }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: data.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }) }} />
        <Header isHub={true} city={city?.city} phoneNumber={city?.phoneNumber} variant="default" />
        <main>
            <section className="border-b border-slate-200 bg-white py-16 lg:py-24"><div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_460px] lg:items-center"><div><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700"><ShieldCheck size={17} /> {data.eyebrow}{locationLabel}</div><h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-6xl">{data.title.split("|")[0]}{locationLabel}</h1><p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-600">{data.intro}{locationLabel ? ` Votre demande est qualifiée pour le secteur de ${city?.city}.` : ""}</p><div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-slate-700"><span className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2"><ClipboardCheck size={17} className="text-red-600" /> Qualification du besoin</span><span className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2"><FileCheck2 size={17} className="text-red-600" /> Documents et échéances</span></div></div><RegulatoryLeadForm defaultNeed={data.need} city={city?.city} /></div></section>
            <section className="container mx-auto grid gap-12 px-4 py-16 lg:grid-cols-[1fr_350px]"><article className="prose prose-lg prose-slate max-w-none"><h2>{data.h2}</h2>{data.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<h2>Ce que la qualification permet de préparer</h2><ul>{data.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><div className="not-prose my-10 rounded-2xl border border-amber-200 bg-amber-50 p-6"><h3 className="font-bold text-amber-950">Important : orientation, pas décision administrative</h3><p className="mt-2 text-sm leading-relaxed text-amber-900">Expert Sécurité Incendie qualifie une demande et peut orienter vers des intervenants adaptés. La conformité, l'accréditation applicable, le contenu du rapport et l'avis de la commission doivent être confirmés par les professionnels et autorités compétents.</p></div><h2>Questions fréquentes</h2>{data.faq.map((item) => <div key={item.q} className="not-prose mb-5 rounded-xl border border-slate-200 bg-white p-5"><h3 className="font-bold text-slate-900">{item.q}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p></div>)}</article><aside className="space-y-5 lg:sticky lg:top-24 lg:h-fit"><div className="rounded-2xl border-2 border-red-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-slate-900">Autres besoins ERP</h2><nav className="mt-4 space-y-3"><Link className="flex items-center justify-between rounded-lg bg-slate-50 p-3 font-medium hover:bg-red-50" href={city ? `/ville/${city.slug}/verifications-reglementaires/ssi-triennale` : "/verifications-reglementaires/ssi-triennale"}>Vérification SSI <ArrowRight size={16} /></Link><Link className="flex items-center justify-between rounded-lg bg-slate-50 p-3 font-medium hover:bg-red-50" href={city ? `/ville/${city.slug}/verifications-reglementaires/controle-electrique-q18` : "/verifications-reglementaires/controle-electrique-q18"}>Contrôle électrique <ArrowRight size={16} /></Link><Link className="flex items-center justify-between rounded-lg bg-slate-50 p-3 font-medium hover:bg-red-50" href={city ? `/ville/${city.slug}/commission-de-securite-erp/mise-aux-normes` : "/commission-de-securite-erp/mise-aux-normes"}>Commission ERP <ArrowRight size={16} /></Link></nav></div><div className="rounded-2xl bg-slate-900 p-6 text-white"><h2 className="text-xl font-bold">Besoin d'un devis de maintenance ?</h2><p className="mt-2 text-sm text-slate-300">Pour extincteurs, BAES, désenfumage ou contrat annuel, consultez aussi notre offre entreprise.</p><Link href="/solutions/entreprise" className="mt-4 inline-flex items-center gap-2 font-bold text-red-300">Voir l'offre entreprise <ArrowRight size={16} /></Link></div></aside></section>
        </main><Footer config={hub} />
    </div>;
}

export { pageData };
