# MDA web

Ce projet contient le site web de la maison numérique de l'autisme.

## Lancer

### Générer l'environnement

Copiez le fichier `.env.development` en `.env.local` ou `.env.development.local` à la racine. Référez vous à [la documentation officielle](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables) pour la hiérarchie. Rajoutez y éventuellement les variables matomo si vous le désirez.

### Lancer en mode développement

Se mettre dans le dossier et lancer

```sh
yarn dev
```

### Builder l'application

Pour builder le site, il faut que strapi soit lancé (en mode développement ou non).

Une fois strapi lancé, se mettre dans le dossier et lancer la commande

```sh
yarn build
```

### Lancer en mode production

Après avoir buildé le projet, vous pouvez lancer le serveur en mode production depuis le dossier avec

```sh
yarn start
```

Attention toutefois aux CSPs et autres restrictions.

## Valider le code (lint)

Se mettre dans le dossier et lancer

```sh
yarn lint
```

## Tester

Il n'y pas encore de tests en place.

## Développement

Soyez bien surs de maintenir les contrats entre l'API et le front à jour depuis strapi. Plus d'informations dans le [REAMDE.md](../../apps/strapi/README.md#générer-les-types) de strapi.
