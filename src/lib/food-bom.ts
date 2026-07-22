/**
 * Nomenclatures food — standard caveau « beau, bon, présentable »
 * Règle Lilou : plateau 2 pax = **minimum 2 chèvres, cible 3** — jamais 1 chèvre pour 2 (effet pauvrette).
 *
 * Prix unitaires = fournisseurs actuels (Cabrière, Chaudron, Aix & Terra, Jean Ba) — à rafraîchir.
 */

export const UNIT = {
  chevreCabriere: 4.5,
  tartinadeAixTerra: 5.95,
  /** Assiette charcuterie généreuse 2 pax (serrano + saucisson) — pas le mini 6,50 € */
  charcuterieGenerous2pax: 12,
  /** Mini historique (trop chiche) — ne plus utiliser */
  charcuterieStingy2pax: 6.5,
  painAssorti2pax: 4.5,
  olivesPot: 2.5,
  cruditesFruit2pax: 3,
  painFromage2pax: 3,
  mielOuConfiture: 1.5,
  emballagePicnic: 2,
  fruitPicnic: 3,
} as const;

export type FoodBomId = "fromage-2pax" | "epicurienne-2pax" | "picnic-2pax";

export interface BomLine {
  label: string;
  qty: number;
  unitCost: number;
  note?: string;
}

export interface FoodBom {
  id: FoodBomId;
  name: string;
  pax: number;
  /** Nb chèvres — règle métier */
  chevres: number;
  lines: BomLine[];
  total: number;
  perPerson: number;
}

function sum(lines: BomLine[]) {
  return Math.round(lines.reduce((s, l) => s + l.qty * l.unitCost, 0) * 100) / 100;
}

/** Visite + fromage — 2 pax : 3 chèvres + pain */
export function bomFromage2pax(chevres: 2 | 3 = 3): FoodBom {
  const lines: BomLine[] = [
    {
      label: "Chèvre frais La Cabrière",
      qty: chevres,
      unitCost: UNIT.chevreCabriere,
      note: "Min. 2 · cible 3 pour 2 pax",
    },
    {
      label: "Pain / gressins",
      qty: 1,
      unitCost: UNIT.painFromage2pax,
    },
    {
      label: "Miel ou confiture d’accompagnement",
      qty: 1,
      unitCost: UNIT.mielOuConfiture,
    },
  ];
  const total = sum(lines);
  return {
    id: "fromage-2pax",
    name: `Plateau fromage 2 pax (${chevres} chèvres)`,
    pax: 2,
    chevres,
    lines,
    total,
    perPerson: Math.round((total / 2) * 100) / 100,
  };
}

/** Planche épicurienne — 2 pax généreuse (3 chèvres) */
export function bomEpicurienne2pax(chevres: 2 | 3 = 3): FoodBom {
  const lines: BomLine[] = [
    {
      label: "Charcuterie généreuse (Chaudron)",
      qty: 1,
      unitCost: UNIT.charcuterieGenerous2pax,
      note: "Pas le mini 6,50 €",
    },
    {
      label: "Chèvre frais La Cabrière",
      qty: chevres,
      unitCost: UNIT.chevreCabriere,
      note: "Min. 2 · cible 3",
    },
    {
      label: "Tartinade Aix & Terra",
      qty: 2,
      unitCost: UNIT.tartinadeAixTerra,
      note: "2 pots (ex. tapenade + poichichade)",
    },
    {
      label: "Pains assortis",
      qty: 1,
      unitCost: UNIT.painAssorti2pax,
    },
    {
      label: "Olives",
      qty: 1,
      unitCost: UNIT.olivesPot,
    },
    {
      label: "Crudités / fruit de saison",
      qty: 1,
      unitCost: UNIT.cruditesFruit2pax,
    },
    {
      label: "Présentation (serviettes, support)",
      qty: 1,
      unitCost: 1,
    },
  ];
  const total = sum(lines);
  return {
    id: "epicurienne-2pax",
    name: `Planche épicurienne 2 pax (${chevres} chèvres)`,
    pax: 2,
    chevres,
    lines,
    total,
    perPerson: Math.round((total / 2) * 100) / 100,
  };
}

/** Panier pique-nique 2 pax — min. 2 chèvres */
export function bomPicnic2pax(chevres: 2 | 3 = 2): FoodBom {
  const lines: BomLine[] = [
    {
      label: "Charcuterie panier",
      qty: 1,
      unitCost: 10,
    },
    {
      label: "Chèvre frais La Cabrière",
      qty: chevres,
      unitCost: UNIT.chevreCabriere,
      note: "Minimum 2 pour 2 pax",
    },
    {
      label: "Tartinade",
      qty: 1,
      unitCost: UNIT.tartinadeAixTerra,
    },
    {
      label: "Pain",
      qty: 1,
      unitCost: 3.5,
    },
    {
      label: "Fruit",
      qty: 1,
      unitCost: UNIT.fruitPicnic,
    },
    {
      label: "Emballage panier chic",
      qty: 1,
      unitCost: UNIT.emballagePicnic,
    },
  ];
  const total = sum(lines);
  return {
    id: "picnic-2pax",
    name: `Panier pique-nique 2 pax (${chevres} chèvres)`,
    pax: 2,
    chevres,
    lines,
    total,
    perPerson: Math.round((total / 2) * 100) / 100,
  };
}

/** Coûts / pax retenus pour le pricing (standard généreux) */
export const FOOD_COST = {
  /** 3 chèvres + pain + miel */
  fromagePerPerson: bomFromage2pax(3).perPerson,
  /** Planche complète 3 chèvres */
  epicuriennePerPerson: bomEpicurienne2pax(3).perPerson,
  /** Picnic 2 chèvres min */
  picnicPerPerson: bomPicnic2pax(2).perPerson,
} as const;

export const FOOD_STANDARDS = {
  chevresMin2pax: 2,
  chevresTarget2pax: 3,
  rule: "Plateau 2 pax : jamais moins de 2 chèvres ; standard service = 3. Présentation généreuse obligatoire.",
} as const;
