# MDA Strapi

Ce projet contient le CMS strapi de la maison numérique de l'autisme.

## Lancer

### Générer l'environnement

Se mettre dans le dossier et lancer
```sh
yarn generate-env
```
Cette commande ajoutera un `.env` pour les secrets de Strapi. Rajoutez y éventuellement les variables matomo si vous le désirez.

### Builder l'application

Pour builder strapi, il faut d'abord builder le plugin. Plus d'information dans le [README.md](../../packages/strapi-plugin-mda/README.md#builder) du plugin.

Une fois le plugin buildé, se mettre dans le dossier et lancer la commande

```sh
yarn build
```

Cette opération n'est nécessaire que la première fois que vous lancez l'application en local où lorsque vous changez le(s) plugin(s).

### Lancer en mode développement

Se mettre dans le dossier et lancer

```sh
yarn dev
```

L'API se lance sur `http://localhost:1337` et l'admin sur `http://localhost:1337/admin`

### Importer la configuration

Naviguer sur `http://localhost:1337/admin` et s'identifier à l'aide des identifiants de dev [ici](./src/bootstrap/dev/create-admin.ts) (Champs email / password). Vous pouvez également créer un utilisateur à l'aide de la commande strapi.

```sh
yarn strapi admin:create-user
```

Une fois authentifié, naviguer vers `Settings > Config Sync Interface` puis bouton import. Cette action n'est nécessaire que la première fois que vous lancez le service ou que vous modifiez les Content-types.

### Générer les types

Afin de générer les contrats d'API avec le front, se mettre dans le dossier et lancer

```sh
yarn generate-types
```

Cette commande n'est nécessaire que si vous modifiez les Content-Types strapi. Le fichier généré est dans git.

## Valider le code (lint)

Se mettre dans le dossier et lancer

```sh
yarn lint
```

## Tester

Il n'y pas encore de tests en place.

## Développement

Beacoup de développement se font dans le content type builder de l'admin. Cependant, si vous voulez lancer le serveur pour développer le plugin, vous pouvez utiliser dans le dossier

```sh
yarn dev --watch-admin
```