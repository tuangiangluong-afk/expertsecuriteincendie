export interface SeoDestination {
    slug: string;
    name: string;
    type: 'airport' | 'station' | 'place';
    keywords: string[];
}

export interface SeoService {
    slug: string;
    title: string;
    description: string;
    keywords: string[];
}

export const SEO_DESTINATIONS: SeoDestination[] = [
    { slug: 'aeroport-orly', name: 'Aéroport d\'Orly (ORY)', type: 'airport', keywords: ['Orly', 'Aéroport Sud', 'Aéroport Ouest'] },
    { slug: 'aeroport-roissy-cdg', name: 'Aéroport Roissy CDG', type: 'airport', keywords: ['Roissy', 'Charles de Gaulle', 'CDG'] },
    { slug: 'gare-montparnasse', name: 'Gare Montparnasse', type: 'station', keywords: ['Gare Montparnasse', 'TGV Atlantique'] },
    { slug: 'gare-de-lyon', name: 'Gare de Lyon', type: 'station', keywords: ['Gare de Lyon', 'TGV Sud-Est'] },
    { slug: 'gare-du-nord', name: 'Gare du Nord', type: 'station', keywords: ['Gare du Nord', 'Eurostar'] },
    { slug: 'paris-centre', name: 'Paris Centre', type: 'place', keywords: ['Paris', 'Capitale'] },
    { slug: 'la-defense', name: 'La Défense', type: 'place', keywords: ['La Défense', 'Affaires'] },
];

export const SEO_SERVICES: SeoService[] = [
    {
        slug: 'maintenance-extincteur-maison',
        title: 'extincteur Maison Individuelle',
        description: 'maintenance de Extincteur Eau, CO2 et Poudre pour locaux professionnels et copropriétés.',
        keywords: ['maison', 'pavillon', 'Extincteur', 'domicile']
    },
    {
        slug: 'maintenance-extincteur-copropriete',
        title: 'extincteur en Copropriété',
        description: 'Solutions pour syndics et résidents : extincteurs, BAES et registre de sécurité.',
        keywords: ['copropriété', 'syndic', 'immeuble', 'parking souterrain']
    },
    {
        slug: 'maintenance-extincteur-entreprise',
        title: 'extincteur Entreprise & Flotte',
        description: 'protection pour collaborateurs et flotte de locaux. Supervision et monétisation.',
        keywords: ['entreprise', 'flotte', 'parking pro', 'supervision']
    },
    {
        slug: 'maintenance-rapide',
        title: 'Dépannage & Maintenance',
        description: 'Service de maintenance et réparation d\'extincteurs toutes marques certifié Incendie.',
        keywords: ['dépannage', 'maintenance', 'sav', 'réparation']
    }
];
