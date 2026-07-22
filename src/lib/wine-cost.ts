/**
 * Coût réel de la dégustation — 6 à 8 verres / personne (pratique caveau TE).
 *
 * Hypothèses calibrables (changer ici = tout le pricing suit) :
 * - volume par verre : 4 cl (standard œnotourisme ; 5 cl si service généreux)
 * - 7 verres = moyenne de la fourchette 6–8
 * - mix de cuvées (entrée + cœur de gamme + 1 prestige)
 */

export const WINE_TASTING = {
  glassesMin: 6,
  glassesMax: 8,
  glassesAvg: 7,
  pourCl: 4,
  /** Prix de revient moyen bouteille 75 cl (production / sortie cuverie) */
  bottleCostCogs: 8,
  /**
   * Valeur caveau moyenne bouteille (ce qu’on aurait pu vendre) —
   * coût d’opportunité pour juger la rentabilité « vraie ».
   */
  bottleRetailCaveau: 16,
  bottleMl: 75,
} as const;

/** Litres / fraction de bouteille pour N verres */
export function wineVolume(glasses: number, pourCl = WINE_TASTING.pourCl) {
  const cl = glasses * pourCl;
  return {
    cl,
    bottles: cl / WINE_TASTING.bottleMl,
  };
}

/** Coût vin / personne */
export function wineCostPerPerson(opts?: {
  glasses?: number;
  mode?: "cogs" | "opportunity" | "blended";
}): { cogs: number; opportunity: number; blended: number; bottles: number; glasses: number } {
  const glasses = opts?.glasses ?? WINE_TASTING.glassesAvg;
  const { bottles } = wineVolume(glasses);
  const cogs = round2(bottles * WINE_TASTING.bottleCostCogs);
  const opportunity = round2(bottles * WINE_TASTING.bottleRetailCaveau);
  /** Blended = 60 % opportunité + 40 % COGS — vision caveau réaliste */
  const blended = round2(opportunity * 0.6 + cogs * 0.4);
  return { cogs, opportunity, blended, bottles: round2(bottles), glasses };
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

/**
 * Pour le pricing packages on utilise le mode **blended** par défaut
 * (ni trop optimiste COGS, ni full retail).
 */
export const WINE_COST_AVG = wineCostPerPerson({ mode: "blended" }).blended;
export const WINE_COST_MIN = wineCostPerPerson({ glasses: 6 }).blended;
export const WINE_COST_MAX = wineCostPerPerson({ glasses: 8 }).blended;
