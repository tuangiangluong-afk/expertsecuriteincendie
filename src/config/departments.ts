export const DEPARTMENTS: Record<string, { code: string; name: string; slug: string; center: { lat: number; lng: number }; description: string; heroColor: string; accentColor: string; image: string }> = {
    "92-hauts-de-seine": {
        code: "92",
        name: "Hauts-de-Seine",
        slug: "92-hauts-de-seine",
        center: { lat: 48.828, lng: 2.220 },
        description: "Le département le plus dense d'Île-de-France. De la Défense à Boulogne-Billancourt, tours de bureaux, cliniques et résidences exigent extincteurs adaptés aux risques, BAES et registre de sécurité à jour : nos techniciens certifiés APSAD interviennent sous 48h.",
        heroColor: "from-red-900 to-slate-900",
        accentColor: "red",
        image: "/images/realizations/hero-extincteur.jpg"
    },
    "78-yvelines": {
        code: "78",
        name: "Yvelines",
        slug: "78-yvelines",
        center: { lat: 48.804, lng: 2.120 },
        description: "Versailles, Saint-Germain-en-Laye, Poissy : beaucoup d'ERP de petite capacité installés dans du bâti ancien, où la mise en conformité porte surtout sur les extincteurs, l'éclairage de sécurité et le désenfumage des circulations.",
        heroColor: "from-amber-900 to-slate-900",
        accentColor: "amber",
        image: "/images/realizations/extincteur-bureau.jpg"
    },
    "93-seine-saint-denis": {
        code: "93",
        name: "Seine-Saint-Denis",
        slug: "93-seine-saint-denis",
        center: { lat: 48.936, lng: 2.357 },
        description: "Saint-Denis, Montreuil, Aubervilliers : entrepôts logistiques, hôtels et commerces de pied d'immeuble. Les contrôles des commissions de sécurité portent en priorité sur le nombre d'extincteurs, leur implantation et la tenue du registre.",
        heroColor: "from-teal-900 to-slate-900",
        accentColor: "teal",
        image: "/images/realizations/extincteur-industrie.jpg"
    },
};
