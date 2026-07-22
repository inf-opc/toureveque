# Repo cible : **Lilouoz/toureveque** (pas ArtStandards, pas inf-opc)

Projet **Château La Tour de l’Évêque** uniquement.  
Compte GitHub artiste / domaine : **[Lilouoz](https://github.com/Lilouoz)**  
≠ ArtStandards (`artstandards` org/repo).

## État actuel

| | |
|--|--|
| Code poussé sur | https://github.com/inf-opc/toureveque (compte technique CLI) |
| Cible voulue | https://github.com/Lilouoz/toureveque |
| Blocage | CLI loggé en `inf-opc` → ne peut pas **créer** un repo sous `Lilouoz` |

## Option A — Transfert (2 minutes) ✅ recommandée

1. Connecte-toi sur GitHub en **Lilouoz** (navigateur).
2. Ouvre l’invitation collab :  
   https://github.com/inf-opc/toureveque/invitations  
   → **Accept** (admin).
3. Sur le repo : **Settings → General → Danger Zone → Transfer ownership**  
   - New owner : `Lilouoz`  
   - Confirm name : `toureveque`
4. Si erreur *« Repository has already been taken »* : tu as déjà un repo vide `Lilouoz/toureveque`  
   → **supprime-le** (Settings → Delete) puis refais le transfer,  
   **ou** Option B.

Après transfer, l’URL devient : `https://github.com/Lilouoz/toureveque`

## Option B — Repo Lilouoz déjà créé (vide / private)

1. En **Lilouoz** : repo `toureveque` → **Settings → Collaborators** → invite **`inf-opc`** (Write ou Admin).
2. Accepte l’invite côté `inf-opc` (ou dis-moi « collab OK »).
3. On pousse :

```bash
cd "Desktop/CHATEAU LA TOUR L'EVEQUE/resa-toureveque"
git remote set-url origin https://github.com/Lilouoz/toureveque.git
git push -u origin main
```

## Option C — Auth CLI en Lilouoz

```bash
gh auth login
# GitHub.com → HTTPS → login Lilouoz
gh repo create Lilouoz/toureveque --public --source=. --remote=origin --push
```

## Vercel

Importer **`Lilouoz/toureveque`** (après transfer), **pas** un repo ArtStandards.

## Check

```bash
git remote -v
# origin → https://github.com/Lilouoz/toureveque.git
```
