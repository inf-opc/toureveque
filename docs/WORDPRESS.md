# Intégration sur toureveque.com (WordPress)

## 1. Bouton **RÉSERVER** dans l’en-tête

Thème enfant `toureveque` (parent Oculus).

### Option A — Menu WP

Apparence → Menus → ajouter un lien personnalisé :

- URL : `https://resa.toureveque.com/reserver` (ou URL Vercel)
- Texte : `RÉSERVER`
- CSS classes : `btn-resa-header`

CSS (Apparence → Personnaliser → CSS additionnel) :

```css
.btn-resa-header a,
a.btn-resa-header {
  display: inline-block !important;
  background: #1a1a1a !important;
  color: #fff !important;
  padding: 10px 18px !important;
  letter-spacing: 0.14em !important;
  font-size: 11px !important;
  text-transform: uppercase !important;
  border: 1px solid #1a1a1a !important;
  margin-left: 8px;
}
.btn-resa-header a:hover {
  background: #e3d5c1 !important;
  color: #1a1a1a !important;
  border-color: #e3d5c1 !important;
}
```

### Option B — Snippet PHP (header)

Dans le thème enfant, après le menu :

```php
<a class="btn-resa-header" href="https://resa.toureveque.com/reserver">
  Réserver
</a>
```

## 2. Page « Expériences / Réservation »

Créer une page WP vide « Réserver » puis :

**Iframe pleine largeur** (bloc HTML personnalisé) :

```html
<iframe
  src="https://resa.toureveque.com/embed"
  title="Réservation expériences"
  style="width:100%;min-height:1100px;border:0;display:block;background:#fff;"
  loading="lazy"
  allow="payment *"
></iframe>
```

Ou **redirection** 301 de `/reserver` vers l’app Vercel (plus simple, meilleur SEO paiement).

## 3. DNS (recommandé)

| Type | Nom | Valeur |
|------|-----|--------|
| CNAME | `resa` | `cname.vercel-dns.com` |

Dans Vercel : Domain `resa.toureveque.com`.

## 4. CORS / cookies

Stripe Checkout redirige hors iframe (plein écran) → OK.  
Ne pas forcer le checkout **dans** l’iframe (3DS).
