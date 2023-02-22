# Maison Numérique de l'autisme (RGAA)

## Init
### Node
Le projet est en node version 18 minimum. Un fichier `.nvmrc` est disponible :
```sh
nvm use
```

### Installation des dépendances
```sh
yarn
```

## Développement
### Préparation
Le projet ayant besoin d'une base de donnée locale pour fonctionner, il est requis d'avoir docker d'installé.

### Démarrer
Toutes les apps en même temps :
```sh
# à la racine
yarn dev
```

La base de données sera lancée automatiquement en amont de la commande.

Pour lancer le développement application par application :
**Strapi :**
```sh
# pour lancer la base de données
yarn db
cd apps/strapi
yarn dev
```


(to be removed) this is a test !

**Web :**
```sh
cd apps/web
yarn dev
```

### URL
- Strapi => `http://localhost:1337/admin`
- Web => `http://localhost:3000`
- PgAdmin (pour voir la db) => `http://localhost:5050`

### Arrêter
Les commandes `yarn dev` sont stopable avec `Ctrl+C`.

Pour arrêter la base de donnée, il faut soit la couper dans l'interface de docker (comme Docker for Mac), soit lancer la commande à la racine :
```sh
yarn db:stop
```

### Valider le code (lint)
Soit lancer la commande à la racine, soit dans le dossier de chaque application :
```sh
yarn lint
```

### Tester
Il n'y pas encore de tests en place.

## Licence

Apache 2.0 - Direction du numérique des ministère sociaux.

Voir [LICENSE](./LICENSE)
