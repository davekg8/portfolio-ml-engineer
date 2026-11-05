# Portfolio — David Egbakou

En ligne : https://david-egbakou.netlify.app

Portfolio bilingue de David Egbakou, positionné comme **ML Engineer spécialisé en forecasting et systèmes ML**.

## Lancer localement

Le site est statique. Ouvrez `dist/index.html` dans un navigateur ou servez le dossier `dist` avec le serveur HTTP de votre choix.

## Structure

- `dist/index.html` — contenu et structure
- `dist/styles.css` — direction visuelle et responsive design
- `dist/script.js` — langue FR/EN, menu mobile et animations progressives
- `dist/assets/` — CV français et anglais, image d'aperçu `og-image.png`

## Langue

La langue est choisie dans cet ordre : paramètre `?lang=fr` ou `?lang=en` dans l'URL, dernier choix du visiteur, puis langue du navigateur. Pour envoyer la version anglaise à un recruteur : `https://<ton-site>/?lang=en`.

Chaque texte traduit porte `data-fr` et `data-en`. Pour un saut de ligne, écrire `&lt;br&gt;` dans ces attributs.

## Hébergement

Hébergé sur Netlify (projet `david-egbakou`). `netlify.toml` publie le dossier `dist`.

L'aperçu de partage (`og:image`, `og:url`) pointe vers `https://david-egbakou.netlify.app`. Si un nom de domaine est ajouté, remplacer cette adresse dans `dist/index.html`.

## CV

- `cv/resume_en.tex` — source LaTeX du CV anglais, publié dans `dist/assets/Resume_David_Egbakou.pdf`.
- Le CV français (`dist/assets/CV_David_Egbakou.pdf`) est compilé à part.

Recompiler le CV anglais :

```bash
cd cv && pdflatex resume_en.tex && mv resume_en.pdf ../dist/assets/Resume_David_Egbakou.pdf
```
