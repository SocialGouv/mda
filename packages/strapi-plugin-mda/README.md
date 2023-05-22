# Strapi plugin strapi-plugin-mda

Ce projet est un plugin pour le CMS strapi de la maison de l'autisme. Considérez le comme une dépendance de cet autre projet.

## Builder

Une fois les dépendances du monorepo installées, vous pouvez builder le projet en vous placant dans le dossier et en lançant

```sh
yarn build
```

## Valider le code (lint)

Se mettre dans le dossier et lancer

```sh
yarn lint
```

## Tester

Il n'y pas encore de tests en place.

## Développement

Avant de continuer, nous vous conseillons de consulter [la documentation officielle](https://docs.strapi.io/dev-docs/plugins-development) sur les plugins strapi.

### Serveur

Vous pouvez lancer le projet `strapi` en mode développement et, dans le dossier, utilser la commande

```sh
yarn dev
```

ou

```sh
yarn tsc -w .
```

pour lancer la transpilation incrémemtale. Vos changements rechargent le serveur.

### Client

Vous pouvez lancer le projet `strapi` en mode `--watch-admin` et accéder au frontend sur `http:localhost:8080`. Vous changements dans l'admin rechargent le client.
