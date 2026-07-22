# Réservation œnotourisme — Château La Tour de l’Évêque

App de réservation en ligne (Next.js 15 · Stripe · Vercel), style aligné sur [toureveque.com](https://www.toureveque.com/) (Josefin Sans, crème `#f7f3ec`, accent sable `#e3d5c1`).

**Repo cible : [github.com/Lilouoz/toureveque](https://github.com/Lilouoz/toureveque)**  
(Projet château **uniquement** — **pas** ArtStandards.)

Staging technique temporaire : [inf-opc/toureveque](https://github.com/inf-opc/toureveque)  
→ transfer vers Lilouoz : voir [`docs/GITHUB-LILOUOZ.md`](docs/GITHUB-LILOUOZ.md)

## Fonctionnalités

- Formules 2026 rentables (voir [`docs/PRICING.md`](docs/PRICING.md))
- **Pique-nique vignes** (à pied / à vélo Accueil Vélo)
- Option **dégustation privée avec l’artiste LAH**
- Date + créneaux mar–sam
- Récap temps réel + **paiement Stripe Checkout** (CB)
- Mode sans clé Stripe = demande enregistrée (demo)
- Page `/embed` pour iframe WordPress
- Bouton header → guide [`docs/WORDPRESS.md`](docs/WORDPRESS.md)

## Stack

| Couche | Choix |
|--------|--------|
| Front | Next.js 15 App Router, Tailwind 4 |
| Paiement | Stripe Checkout |
| Host | Vercel |
| CMS site | WordPress (lien / iframe) |

> **RSVIN** : pas d’API/widget public trouvé → stack propriétaire Stripe. Si le domaine a un compte RSVIN/Winalist, on peut brancher un deep-link en plus (même UI).

## Démarrage local (VS Code)

```bash
# Node ≥ 20 (nvm use 22)
cd resa-toureveque   # ou clone du repo
npm install
cp .env.example .env.local
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

### Variables d’environnement

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# optionnel webhook plus tard
# STRIPE_WEBHOOK_SECRET=whsec_...
```

Sans `STRIPE_SECRET_KEY`, le flux aboutit en **demande de réservation** (logs serveur + page succès).

## Déploiement Vercel

1. Import du repo GitHub `Lilouoz/toureveque`
2. Framework : Next.js (auto)
3. Env : `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_SITE_URL=https://resa.toureveque.com`
4. Domaine custom `resa` (CNAME)
5. Stripe Dashboard → activer Checkout FR + méthodes CB

```bash
npx vercel --prod
```

## Parcours client

1. Choisir formule + nb personnes  
2. Date (mar–sam) + créneau  
3. Options (artiste, cadeau)  
4. Coordonnées → **Payer** → Stripe → confirmation  

## Structure

```
src/app/           # pages + API checkout
src/components/    # header, footer, wizard résa
src/lib/packages.ts # grilles prix + marges
docs/PRICING.md    # analyse rentabilité
docs/WORDPRESS.md  # bouton header + iframe
```

## Contact domaine

- Tél. 04 94 28 20 17  
- contact@toureveque.com  
- Route de Cuers, 83390 Pierrefeu-du-Var  

© Château La Tour de l’Évêque — famille Sumeire
