/**
 * Offre œnotourisme 2026 — Château La Tour de l'Évêque
 * Sources : EXPERIENCES ET AUTRES.xlsx (Céline), coûts food terrain, concurrence Var.
 *
 * COÛT VIN : 6–8 verres / pax (moy. 7 × 4 cl) — voir wine-cost.ts
 * Règle : marge brute cible ≥ 50 % en mode blended · planche food jamais < 25 €.
 */

import {
  WINE_COST_AVG,
  WINE_COST_MAX,
  WINE_COST_MIN,
  wineCostPerPerson,
} from "./wine-cost";

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
  isPairPrice?: boolean;
  pairPrice?: number;
  includes: string[];
  /** Coût food / pax (hors vin) */
  foodCostPerPerson: number;
  /**
   * Coût vin dégustation / pax (6–8 verres).
   * 0 si pas de dégustation caveau (ex. picnic pur + 1 verre d’accueil).
   */
  wineCostPerPerson: number;
  /** Temps guide / accueil réparti */
  guideCostPerPerson: number;
  /** Nb de verres inclus dans l’offre (affichage client) */
  glassesIncluded: string;
  minGuests: number;
  maxGuests: number;
  slots: string[];
  featured?: boolean;
  badge?: string;
  imageHint: string;
}

export interface Addon {
  id: AddonId;
  name: string;
  description: string;
  pricePerPerson: number;
  flatPrice?: number;
  compatibleWith: PackageId[] | "all";
  note?: string;
}

export const OPENING = {
  days: [2, 3, 4, 5, 6] as number[],
  label: "Mardi – Samedi · 10h – 18h",
  phone: "04 94 28 20 17",
  email: "contact@toureveque.com",
  address: "Route de Cuers, 83390 Pierrefeu-du-Var",
  site: "https://www.toureveque.com",
};

const SLOTS_VISIT = ["10:00", "11:00", "14:00", "15:00", "16:00"];
const SLOTS_PICNIC = ["11:00", "12:00", "12:30"];

/** 1 verre d’accueil picnic ≈ 1/7 de la dégustation complète */
const WINE_WELCOME = round2(WINE_COST_AVG / 7);

/** Dégustation standard 6–8 verres */
const WINE_FULL = WINE_COST_AVG;
/** Initiation un peu plus généreuse (haut de fourchette) */
const WINE_RICH = WINE_COST_MAX;

export const PACKAGES: ExperiencePackage[] = [
  {
    id: "decouverte",
    name: "Visite & dégustation",
    tagline: "L’essentiel du domaine",
    description:
      "Visite guidée des caves (gravité, bio) et dégustation de la gamme — en moyenne 6 à 8 verres.",
    durationMin: 60,
    pricePerPerson: 15,
    foodCostPerPerson: 0,
    wineCostPerPerson: WINE_FULL,
    guideCostPerPerson: 2.5,
    glassesIncluded: "6–8 verres",
    minGuests: 1,
    maxGuests: 12,
    slots: SLOTS_VISIT,
    includes: [
      "Visite caves & savoir-faire",
      "Dégustation 6–8 verres (gamme)",
      "Présentation bio / biodynamie",
    ],
    imageHint: "caves",
  },
  {
    id: "initiation",
    name: "Initiation à la dégustation",
    tagline: "Comprendre le vin autrement",
    description:
      "Visite + atelier sensoriel (vue, nez, bouche) avec dégustation commentée 6–8 verres.",
    durationMin: 75,
    pricePerPerson: 18,
    foodCostPerPerson: 0,
    wineCostPerPerson: WINE_RICH,
    guideCostPerPerson: 3.5,
    glassesIncluded: "6–8 verres",
    minGuests: 2,
    maxGuests: 10,
    slots: SLOTS_VISIT,
    includes: [
      "Visite caves",
      "Atelier initiation 15–20 min",
      "Dégustation commentée 6–8 verres",
    ],
    imageHint: "degustation",
  },
  {
    id: "fromage",
    name: "Visite, dégustation & fromage",
    tagline: "Accords doux",
    description:
      "Visite + dégustation 6–8 verres accompagnée de fromages frais La Cabrière.",
    durationMin: 75,
    pricePerPerson: 22,
    foodCostPerPerson: 5.5,
    wineCostPerPerson: WINE_FULL,
    guideCostPerPerson: 2.5,
    glassesIncluded: "6–8 verres",
    minGuests: 2,
    maxGuests: 10,
    slots: SLOTS_VISIT,
    includes: [
      "Visite + dégustation 6–8 verres",
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
      "Visite des caves, 6–8 verres, puis planche : charcuteries, fromages, tartinades, pains, olives.",
    durationMin: 90,
    pricePerPerson: 32,
    foodCostPerPerson: 10.5,
    wineCostPerPerson: WINE_FULL,
    guideCostPerPerson: 3,
    glassesIncluded: "6–8 verres",
    minGuests: 2,
    maxGuests: 12,
    slots: ["11:00", "12:00", "15:00", "16:00"],
    featured: true,
    badge: "Coup de cœur",
    includes: [
      "Visite caves",
      "Dégustation 6–8 verres",
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
      "Panier pique-nique, carte d’itinéraire dans les vignes, 1 verre d’accueil. Option : dégustation complète au retour (+forfait découverte).",
    durationMin: 150,
    pricePerPerson: 38,
    foodCostPerPerson: 15,
    wineCostPerPerson: WINE_WELCOME,
    guideCostPerPerson: 2,
    glassesIncluded: "1 verre d’accueil",
    minGuests: 2,
    maxGuests: 8,
    slots: SLOTS_PICNIC,
    badge: "Nouveau",
    featured: true,
    includes: [
      "Panier pique-nique (2 pax min)",
      "Carte itinéraire vignes (PDF + papier)",
      "Couverture & vaisselle chic",
      "1 verre de bienvenue au départ",
    ],
    imageHint: "picnic",
  },
  {
    id: "picnic-velo",
    name: "Pique-nique à vélo",
    tagline: "Accueil Vélo · vignes",
    description:
      "Même panier + itinéraire cyclable (label Accueil Vélo). 1 verre d’accueil. Vélos non fournis.",
    durationMin: 180,
    pricePerPerson: 42,
    foodCostPerPerson: 15,
    wineCostPerPerson: WINE_WELCOME,
    guideCostPerPerson: 2.5,
    glassesIncluded: "1 verre d’accueil",
    minGuests: 2,
    maxGuests: 8,
    slots: SLOTS_PICNIC,
    badge: "Nouveau",
    includes: [
      "Panier pique-nique",
      "Carte itinéraire vélo",
      "Point d’eau / consignes Accueil Vélo",
      "1 verre de bienvenue",
      "Liste loueurs partenaires",
    ],
    imageHint: "velo",
  },
  {
    id: "duo-bouteille",
    name: "Pack duo + bouteille",
    tagline: "Pour deux · souvenir inclus",
    description:
      "Visite + dégustation 6–8 verres pour 2 et une bouteille offerte (Pétale de Rose ou équivalent).",
    durationMin: 60,
    pricePerPerson: 0,
    isPairPrice: true,
    pairPrice: 65,
    foodCostPerPerson: 0,
    wineCostPerPerson: WINE_FULL,
    guideCostPerPerson: 2.5,
    glassesIncluded: "6–8 verres / pers.",
    minGuests: 2,
    maxGuests: 2,
    slots: SLOTS_VISIT,
    includes: [
      "Visite + dégustation × 2 (6–8 verres chacun)",
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
    note: "Sous réserve de présence de l’artiste (mar–sam). Confirmation sous 24 h. N’ajoute pas de verres : même dégustation, cadre privé.",
  },
  {
    id: "cadeau-surprise",
    name: "Cadeau surprise (duo)",
    description: "Limonadier ou livre de recettes — forfait 2 personnes.",
    pricePerPerson: 0,
    flatPrice: 30,
    compatibleWith: ["decouverte", "initiation", "fromage", "epicurienne"],
  },
];

export function getPackage(id: PackageId) {
  return PACKAGES.find((p) => p.id === id)!;
}

/** Coût total variable / pax (vin + food + guide) */
export function unitCost(pkg: ExperiencePackage): number {
  return round2(
    pkg.wineCostPerPerson + pkg.foodCostPerPerson + pkg.guideCostPerPerson
  );
}

export function marginPercent(pkg: ExperiencePackage): number {
  const sell = pkg.isPairPrice
    ? (pkg.pairPrice ?? 0) / 2
    : pkg.pricePerPerson;
  const cost = unitCost(pkg);
  // duo: + moitié bouteille offerte (~8–12 € / 2 = 5 € pax approx)
  const giftBottle = pkg.id === "duo-bouteille" ? 5 : 0;
  const costAll = cost + giftBottle;
  if (sell <= 0) return 0;
  return Math.round(((sell - costAll) / sell) * 100);
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
    lines.push({ label: `${pkg.name} (2 pers.)`, amount: base });
  } else {
    base = pkg.pricePerPerson * guests;
    lines.push({ label: `${pkg.name} × ${guests}`, amount: base });
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
    const amount =
      ad.flatPrice != null && ad.flatPrice > 0
        ? ad.flatPrice
        : ad.pricePerPerson * guests;
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

/** Exposé pour docs / debug */
export const WINE_COST_META = {
  ...wineCostPerPerson(),
  min: WINE_COST_MIN,
  max: WINE_COST_MAX,
  avg: WINE_COST_AVG,
};

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
