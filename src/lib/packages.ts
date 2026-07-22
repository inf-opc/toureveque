/**
 * Offre œnotourisme 2026 — Château La Tour de l'Évêque
 * Sources : EXPERIENCES ET AUTRES.xlsx (Céline), coûts food terrain, concurrence Var.
 * Règle : marge food brute cible ≥ 55 % · jamais redescendre au planche 12 € (cas Dartigunave).
 */

export type PackageId =
  | "decouverte"
  | "initiation"
  | "fromage"
  | "epicurienne"
  | "picnic-pied"
  | "picnic-velo"
  | "duo-bouteille";

export type AddonId = "artiste-privee" | "cadeau-surprise";

export interface ExperiencePackage {
  id: PackageId;
  name: string;
  tagline: string;
  description: string;
  durationMin: number;
  pricePerPerson: number;
  /** Si true, le prix est pour 2 personnes (forfait) */
  isPairPrice?: boolean;
  pairPrice?: number;
  includes: string[];
  /** Coût food estimé TTC / pax (hors temps guide) */
  foodCostPerPerson: number;
  /** Coût fixe guide/temps (réparti) */
  guideCostPerPerson: number;
  minGuests: number;
  maxGuests: number;
  /** Créneaux horaires proposés */
  slots: string[];
  featured?: boolean;
  badge?: string;
  imageHint: string;
}

export interface Addon {
  id: AddonId;
  name: string;
  description: string;
  /** Prix additionnel par personne */
  pricePerPerson: number;
  /** Ou forfait groupe (si set, remplace per person) */
  flatPrice?: number;
  compatibleWith: PackageId[] | "all";
  note?: string;
}

export const OPENING = {
  days: [2, 3, 4, 5, 6] as number[], // mar–sam (JS: 0=dim)
  label: "Mardi – Samedi · 10h – 18h",
  phone: "04 94 28 20 17",
  email: "contact@toureveque.com",
  address: "Route de Cuers, 83390 Pierrefeu-du-Var",
  site: "https://www.toureveque.com",
};

/** Créneaux standards visite */
const SLOTS_VISIT = ["10:00", "11:00", "14:00", "15:00", "16:00"];
/** Créneaux pique-nique (déjeuner) */
const SLOTS_PICNIC = ["11:00", "12:00", "12:30"];

export const PACKAGES: ExperiencePackage[] = [
  {
    id: "decouverte",
    name: "Visite & dégustation",
    tagline: "L’essentiel du domaine",
    description:
      "Visite guidée des caves (gravité, bio) et dégustation de la gamme. Point d’entrée idéal.",
    durationMin: 60,
    pricePerPerson: 12,
    foodCostPerPerson: 1.5,
    guideCostPerPerson: 2.5,
    minGuests: 1,
    maxGuests: 12,
    slots: SLOTS_VISIT,
    includes: [
      "Visite caves & savoir-faire",
      "Dégustation 3–4 cuvées",
      "Présentation bio / biodynamie",
    ],
    imageHint: "caves",
  },
  {
    id: "initiation",
    name: "Initiation à la dégustation",
    tagline: "Comprendre le vin autrement",
    description:
      "Visite + atelier sensoriel (vue, nez, bouche) pour découvrir comment goûter un rosé de Provence.",
    durationMin: 75,
    pricePerPerson: 15,
    foodCostPerPerson: 1.5,
    guideCostPerPerson: 3.5,
    minGuests: 2,
    maxGuests: 10,
    slots: SLOTS_VISIT,
    includes: [
      "Visite caves",
      "Atelier initiation 15–20 min",
      "Dégustation commentée",
    ],
    imageHint: "degustation",
  },
  {
    id: "fromage",
    name: "Visite, dégustation & fromage",
    tagline: "Accords doux",
    description:
      "Visite + dégustation accompagnée de fromages frais La Cabrière.",
    durationMin: 75,
    pricePerPerson: 18,
    foodCostPerPerson: 5.5,
    guideCostPerPerson: 2.5,
    minGuests: 2,
    maxGuests: 10,
    slots: SLOTS_VISIT,
    includes: [
      "Visite + dégustation",
      "Fromages frais locaux",
      "Pain & accompagnements",
    ],
    imageHint: "fromage",
  },
  {
    id: "epicurienne",
    name: "Dégustation épicurienne",
    tagline: "Planche apéritive du terroir",
    description:
      "Visite des caves puis planche : charcuteries, fromages frais, tartinades, pains, olives. Formule prouvée (groupes & Azur Wine Tour).",
    durationMin: 90,
    pricePerPerson: 28,
    foodCostPerPerson: 10.5,
    guideCostPerPerson: 3,
    minGuests: 2,
    maxGuests: 12,
    slots: ["11:00", "12:00", "15:00", "16:00"],
    featured: true,
    badge: "Coup de cœur",
    includes: [
      "Visite caves",
      "Dégustation",
      "Planche apéro complète",
      "Produits artisans locaux",
    ],
    imageHint: "apero",
  },
  {
    id: "picnic-pied",
    name: "Pique-nique dans les vignes",
    tagline: "À pied · panier & carte",
    description:
      "Panier pique-nique gourmand, carte d’itinéraire balisé dans le cirque de vignes, couverture. Liberté & Provence.",
    durationMin: 150,
    pricePerPerson: 38,
    foodCostPerPerson: 15,
    guideCostPerPerson: 2,
    minGuests: 2,
    maxGuests: 8,
    slots: SLOTS_PICNIC,
    badge: "Nouveau",
    featured: true,
    includes: [
      "Panier pique-nique (2 pax min)",
      "Carte itinéraire vignes (PDF + papier)",
      "Couverture & vaisselle jetable chic",
      "1 verre de bienvenue au départ",
      "Dégustation express au retour (option)",
    ],
    imageHint: "picnic",
  },
  {
    id: "picnic-velo",
    name: "Pique-nique à vélo",
    tagline: "Accueil Vélo · vignes",
    description:
      "Même panier + itinéraire cyclable adapté (label Accueil Vélo). Vélos non fournis — partenaires location sur demande.",
    durationMin: 180,
    pricePerPerson: 42,
    foodCostPerPerson: 15,
    guideCostPerPerson: 2.5,
    minGuests: 2,
    maxGuests: 8,
    slots: SLOTS_PICNIC,
    badge: "Nouveau",
    includes: [
      "Panier pique-nique",
      "Carte itinéraire vélo sécurisé",
      "Point d’eau / consignes Accueil Vélo",
      "1 verre de bienvenue",
      "Liste loueurs partenaires (Cuers–Hyères)",
    ],
    imageHint: "velo",
  },
  {
    id: "duo-bouteille",
    name: "Pack duo + bouteille",
    tagline: "Pour deux · souvenir inclus",
    description:
      "Visite + dégustation pour 2 et une bouteille offerte (Pétale de Rose ou équivalent selon stock).",
    durationMin: 60,
    pricePerPerson: 0,
    isPairPrice: true,
    pairPrice: 55,
    foodCostPerPerson: 1.5,
    guideCostPerPerson: 2.5,
    minGuests: 2,
    maxGuests: 2,
    slots: SLOTS_VISIT,
    includes: [
      "Visite + dégustation × 2",
      "1 bouteille offerte",
      "Idéal couple / cadeau",
    ],
    imageHint: "duo",
  },
];

export const ADDONS: Addon[] = [
  {
    id: "artiste-privee",
    name: "Dégustation privée avec l’artiste",
    description:
      "Rencontre avec Lilou Aurélie H. (LAH) — exposition REVERS(E) au caveau. Moment exclusif autour des œuvres et du vin.",
    pricePerPerson: 18,
    compatibleWith: "all",
    note: "Sous réserve de présence de l’artiste (mar–sam). Confirmation sous 24 h.",
  },
  {
    id: "cadeau-surprise",
    name: "Cadeau surprise (duo)",
    description: "Limonadier ou livre de recettes — forfait 2 personnes.",
    pricePerPerson: 0,
    flatPrice: 30,
    compatibleWith: ["decouverte", "initiation", "fromage", "epicurienne"],
    note: "Remplace le pack duo classique si choisi seul au caveau — ici en option cadeau.",
  },
];

export function getPackage(id: PackageId) {
  return PACKAGES.find((p) => p.id === id)!;
}

export function marginPercent(pkg: ExperiencePackage): number {
  const sell = pkg.isPairPrice
    ? (pkg.pairPrice ?? 0) / 2
    : pkg.pricePerPerson;
  const cost = pkg.foodCostPerPerson + pkg.guideCostPerPerson;
  if (sell <= 0) return 0;
  return Math.round(((sell - cost) / sell) * 100);
}

export function computeTotal(opts: {
  packageId: PackageId;
  guests: number;
  addonIds: AddonId[];
}): {
  base: number;
  addons: number;
  total: number;
  perPerson: number;
  lines: { label: string; amount: number }[];
} {
  const pkg = getPackage(opts.packageId);
  const guests = Math.max(
    pkg.minGuests,
    Math.min(pkg.maxGuests, opts.guests)
  );
  const lines: { label: string; amount: number }[] = [];

  let base: number;
  if (pkg.isPairPrice && pkg.pairPrice != null) {
    base = pkg.pairPrice;
    lines.push({
      label: `${pkg.name} (2 pers.)`,
      amount: base,
    });
  } else {
    base = pkg.pricePerPerson * guests;
    lines.push({
      label: `${pkg.name} × ${guests}`,
      amount: base,
    });
  }

  let addonsTotal = 0;
  for (const aid of opts.addonIds) {
    const ad = ADDONS.find((a) => a.id === aid);
    if (!ad) continue;
    if (
      ad.compatibleWith !== "all" &&
      !ad.compatibleWith.includes(opts.packageId)
    )
      continue;
    let amount: number;
    if (ad.flatPrice != null && ad.flatPrice > 0) {
      amount = ad.flatPrice;
    } else {
      amount = ad.pricePerPerson * guests;
    }
    addonsTotal += amount;
    lines.push({ label: ad.name, amount });
  }

  const total = base + addonsTotal;
  return {
    base,
    addons: addonsTotal,
    total,
    perPerson: Math.round((total / guests) * 100) / 100,
    lines,
  };
}

/** Créneaux disponibles pour une date (hors dimanche/lundi) */
export function isOpenDay(date: Date): boolean {
  return OPENING.days.includes(date.getDay());
}

export function formatEuro(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}
