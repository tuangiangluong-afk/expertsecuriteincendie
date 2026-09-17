import Image from "next/image";

/**
 * Types d'établissements couverts.
 *
 * Historique : ce bloc s'intitulait « Dernières mises en conformité en
 * Île-de-France » et attribuait à chaque visuel un chantier précis (une ville,
 * une marque, un type de site). Ces chantiers n'étaient pas documentés : c'est
 * un cas client inventé. Les visuels restent, mais ils illustrent désormais le
 * type de site concerné, sans revendiquer une intervention qui n'a pas eu lieu.
 */
const SECTEURS = [
    {
        label: "Parkings souterrains",
        detail: "Extincteurs portables, signalétique et plans d'intervention",
        img: "/images/realizations/extincteur-parking.jpg",
    },
    {
        label: "Bureaux & tertiaire",
        detail: "Extincteurs adaptés aux risques électriques et aux salles serveurs",
        img: "/images/realizations/extincteur-bureau.jpg",
    },
    {
        label: "Entrepôts & industrie",
        detail: "Poudre ABC, extincteurs sur roues et registre de sécurité",
        img: "/images/realizations/extincteur-industrie.jpg",
    },
    {
        label: "Établissements de santé",
        detail: "Extincteurs sans résidu, BAES et vérification annuelle tracée",
        img: "/images/realizations/extincteur-hopital.jpg",
    },
];

export default function RealizationsGrid() {
    return (
        <section className="py-20 bg-neutral-900 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                        Types d&apos;établissements <span className="text-red-500">couverts</span>
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Extincteurs, RIA, BAES et tenue du registre de sécurité, pour les établissements
                        recevant du public comme pour les locaux professionnels.
                    </p>
                </div>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[600px]">
                    {SECTEURS.map((secteur, i) => (
                        <div
                            key={secteur.label}
                            className={`relative group rounded-3xl overflow-hidden border border-white/10 ${i === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"
                                }`}
                        >
                            <Image
                                src={secteur.img}
                                alt={`Illustration : ${secteur.label.toLowerCase()} — maintenance du matériel incendie`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="text-red-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    Secteur d&apos;activité
                                </div>
                                <div className="text-2xl font-bold mb-1">{secteur.label}</div>
                                <div className="text-sm text-neutral-300 font-medium">{secteur.detail}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
