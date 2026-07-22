# Analyse packages — avec **6 à 8 verres** (coût vin réel)

## Réponse courte

**Avant : non.** Le premier modèle mettait ~1,50 € « food » et **presque zéro vin** — faux pour le caveau TE.

**Maintenant : oui.** Le coût vin est calé sur **6–8 verres / personne** (moyenne **7 × 4 cl**).

Fichier code : `src/lib/wine-cost.ts` + champs `wineCostPerPerson` dans `packages.ts`.

---

## Formule vin

```
volume (cl)     = nb_verres × 4 cl
fraction btl    = volume / 75
COGS (€)        = fraction × 8 €   ← prix de revient moyen bouteille
Opportunité (€) = fraction × 16 €  ← valeur caveau moyenne (ventes perdues)
Blended (€)     = 60 % opportunité + 40 % COGS  ← utilisé pour la marge
```

| Verres | Volume | Bouteilles | COGS (8 €) | Opportunité (16 €) | **Blended (utilisé)** |
|--------|--------|------------|------------|--------------------|------------------------|
| 6 | 24 cl | 0,32 | 2,56 € | 5,12 € | **~4,10 €** |
| **7 (moy.)** | **28 cl** | **0,37** | **2,99 €** | **5,97 €** | **~4,78 €** |
| 8 | 32 cl | 0,43 | 3,41 € | 6,83 € | **~5,46 €** |

Si les verres sont plus généreux (**5 cl**) : × 1,25 sur tout le tableau  
→ moyenne 7 verres ≈ **6,0 €** blended / pax.

Si le mix est plus « prestige » (bouteille retail 22 €) : encore +30–40 %.

> **À ajuster avec PF** : prix de revient réel + prix caveau moyen des cuvées versées.  
> Variables dans `wine-cost.ts` : `bottleCostCogs`, `bottleRetailCaveau`, `pourCl`, `glassesAvg`.

---

## Coût total / pax (vin + food + guide)

| Formule | Vin (6–8 v.) | Food | Guide | **Coût total** | **Prix vente** | **Marge** |
|---------|--------------|------|-------|----------------|----------------|-----------|
| Visite & dégustation | ~4,8 € | 0 | 2,5 | **~7,3 €** | **15 €** | ~51 % |
| Initiation | ~5,5 € (8 v.) | 0 | 3,5 | **~9,0 €** | **18 €** | ~50 % |
| Fromage | ~4,8 € | 5,5 | 2,5 | **~12,8 €** | **22 €** | ~42 % |
| Épicurienne | ~4,8 € | 10,5 | 3,0 | **~18,3 €** | **32 €** | ~43 % |
| Picnic pied | ~0,7 € (1 verre) | 15 | 2,0 | **~17,7 €** | **38 €** | ~53 % |
| Picnic vélo | ~0,7 € | 15 | 2,5 | **~18,2 €** | **42 €** | ~57 % |
| Duo + bouteille / pax | ~4,8 + **~5** (½ btl offerte) | 0 | 2,5 | **~12,3 €** | **32,5 €** (65/2) | ~62 % |

### Anciens prix (trop bas une fois le vin compté)

| | Prix old | Coût réel vin inclus | Marge réelle |
|--|----------|----------------------|--------------|
| Découverte | 10–12 € | ~7,3 € | **~27–39 %** ❌ |
| Épicurienne | 25–28 € | ~18,3 € | **~27–35 %** ❌ |

→ D’où le **rehaussement** de la grille en ligne (15 / 18 / 22 / 32 / 65 duo).

---

## Dégustation gratuite (caveau sans résa)

Toujours possible commercialement (drive ventes bouteilles).  
**Coût caché** : ~4,8–5,5 € de vin blended / pax qui ne vient **que** de la conversion bouteille.  
À suivre : taux d’achat post-dégust. Si < 1 bouteille / 3 visiteurs → la gratuite « pure » plombe ; la **visite payante 15 €** protège mieux.

---

## Food — standard « pas pauvrette » (Lilou)

**Règle** : plateau **2 pax = min. 2 chèvres, cible 3** (Cabrière 4,50 €).  
Jamais 1 chèvre pour 2. Planche / panier **généreux, beau, présentable**.

Nomenclature code : `src/lib/food-bom.ts`

### Fromage 2 pax (3 chèvres)

| Ligne | € |
|-------|---|
| 3 × chèvre 4,50 | 13,50 |
| Pain + miel | 4,50 |
| **Total 2 pax** | **18 €** → **9 €/pax** |
| **Prix vente** | **26 €/pax** |

### Planche épicurienne 2 pax (généreuse)

| Ligne | € |
|-------|---|
| Charcuterie généreuse (pas le mini 6,50) | 12 |
| **3 chèvres** | 13,50 |
| 2 tartinades | 11,90 |
| Pains + olives + crudités/fruit + prés. | ~11 |
| **Total 2 pax** | **~48 €** → **~24 €/pax** |
| + vin ~4,8 + guide 3 | **coût ~32 €/pax** |
| **Prix vente** | **48 €/pax** (~40 % marge) |

Ancien modèle 1 chèvre + charcut 6,50 = panier **chiche** et faux coût 10,50 €/pax.

### Picnic 2 pax

| | |
|--|--|
| Min. **2 chèvres** + charcut + tartinade + pain + fruit | **~35 € / 2** → **~17,5 €/pax** |
| Vente | **42 €** pied · **46 €** vélo |

### Interdits

- 1 chèvre pour 2 pax  
- Charcuterie « mini » 6,50 € seule sur planche payante  
- Planche food vendue **12 €/pax** (Dartigunave = catastrophe marge + image)

---

## Option artiste (+18 €)

N’ajoute **pas** de verres (même 6–8). C’est du temps / cadre privé LAH.  
Si artiste absente → remboursement option.

---

## Checklist validation PF

- [ ] Confirmer **cl par verre** (4 ou 5)
- [ ] Confirmer **nb moyen** 6 / 7 / 8
- [ ] Donner **prix de revient** moyen des cuvées dégustées
- [ ] Donner **prix caveau** moyen (opportunité)
- [ ] Valider grille 15 / 18 / 22 / 32 / 38 / 42 / 65
