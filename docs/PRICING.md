# Analyse packages œnotourisme — Tour de l’Évêque 2026

Sources : `EXPERIENCES ET AUTRES.xlsx` (Céline), coûts food terrain, concurrence Var / Winalist / Smartbox.

## Concurrence (benchmark)

| Canal / type | Prix repère |
|--------------|-------------|
| Domaine (historique) visite+dégust. | 10 € |
| OT MPM | 10 € (−10 % comm.) |
| Cap Adrénaline | 12 € |
| Winalist | 14 € |
| Smartbox visite+bouteille / 2 | 29,99 € |
| Smartbox initiation+btl / 2 | 59,99 € |
| Vélo + vin Aix | ~60 € |
| Pique-nique vignes (Bordeaux type) | ~74 € groupe / pax |
| Light lunch prouvé (Azur Wine Tour) | **28 € / pax** |

## Coûts food réels (terrain)

| Élément | Coût approx. |
|---------|----------------|
| Planche 2 pax (charcuterie, chèvre, tartinade, pain, olives) | ~17 € → **8,5 €/pax** |
| Light lunch 6 pax (exemple juin) | 58,54 € achat / 168 € CA → **marge 65 %** |
| Planche à 12 €/pax (Dartigunave 9 pax) | 74,5 € coût / 108 € CA → **marge 31 % ❌ trop bas** |

**Règle** : ne jamais revendre une planche food sous **25 €** ; cible marge food+guide **≥ 55 %**.

## Grille proposée (en ligne)

| Formule | Prix vente | Coût food+guide /pax | Marge brute |
|---------|------------|----------------------|-------------|
| Visite & dégustation | **12 €** | ~4 € | ~67 % |
| Initiation | **15 €** | ~5 € | ~67 % |
| Fromage | **18 €** | ~8 € | ~56 % |
| Épicurienne (planche) | **28 €** | ~13,5 € | ~52 % |
| Pique-nique pied | **38 €** | ~17 € | ~55 % |
| Pique-nique vélo | **42 €** | ~17,5 € | ~58 % |
| Pack duo + bouteille | **55 € / 2** | ~4 € + bouteille ~8–12 | ~55–65 % |
| **Option artiste LAH** | **+18 €/pax** | ~0 food | temps artiste |
| Cadeau surprise duo | 30 € flat | produit stock | variable |

### Évolutions vs grille Céline 2026

- Découverte 10 → **12 €** (aligné milieu de marché, toujours sous Winalist 14)
- Initiation 12 → **15 €**
- Fromage 15 → **18 €**
- Apéro 25 → **28 €** (validé par vente réelle Azur)
- Duo+btl 50 → **55 € / 2** (hausse bouteille + inflation)
- **Nouveaux** : picnic pied/vélo + option artiste privée

## Pique-nique — composition panier (2 pax)

- Charcuterie assortie ~6,5 €
- 1 chèvre Cabrière 4,5 €
- 1 tartinade 5,95 €
- Pain + fruit ~4 €
- Emballage / serviettes ~1 €  
**≈ 22 € / 2 = 11 €/pax** → vente 38 € laisse ~27 €/pax pour temps + marge.

Carte itinéraire : PDF auto + 1 feuille A4 au départ (~0,10 €).

## Option artiste

+18 €/pax, min 2, max 12. Si artiste absente → remboursement option intégral (affiché checkout). Ne pas vendre comme “garantie présence” sans calendrier LAH.

## RSVIN

Aucune plateforme publique **RSVIN** avec API/widget trouvée.  
**Stack retenue** : Next.js + **Stripe Checkout** (CB, Apple Pay) + emails Stripe.  
Alternative ultérieure : widget Winalist en iframe + même design shell.

## WordPress

Bouton header + iframe `/embed` ou lien `resa.toureveque.com` (voir `docs/WORDPRESS.md`).
