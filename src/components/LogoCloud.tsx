/**
 * Bandeau des constructeurs réellement pris en charge.
 *
 * Historique : cette bande affichait « Renault », « Peugeot », « Legrand » et
 * un « hager » en dur à côté du nom Andrieu — des marques automobiles et de
 * tableau électrique, héritées du gabarit borne de recharge. Aucune n'a de
 * rapport avec la sécurité incendie.
 */

const BRANDS = [
    { name: "Desautel", style: "font-bold text-lg text-green-700/80 group-hover:text-green-600" },
    { name: "Sicli", style: "font-bold text-xl tracking-wide text-slate-800/80 group-hover:text-slate-900" },
    { name: "Eurofeu", style: "font-bold text-lg tracking-tight text-red-700/80 group-hover:text-red-600" },
    { name: "Extincteurs & RIA", style: "font-bold text-base uppercase tracking-widest text-slate-600" },
    { name: "BAES & éclairage de sécurité", style: "font-bold text-base tracking-tight text-slate-600" },
];

export default function LogoCloud() {
    return (
        <section className="py-10 border-b border-slate-100 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                        Matériel pris en charge :
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 hover:opacity-100 transition-all duration-500">
                        {/* Pas de fichiers SVG de marque : on utilise une typographie
                            sobre plutôt que de reproduire des logotypes. */}
                        {BRANDS.map((brand) => (
                            <div key={brand.name} className="group flex items-center gap-2 cursor-default">
                                <span className={brand.style}>{brand.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
