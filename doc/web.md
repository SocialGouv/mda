# Spécificités de l'application Web

Dossier : `apps/web/`

## Organisation des dossiers
```
apps/                   # groupeur de workspaces d'application
├─ web/                 # application web
│  ├─ public/           # images, fichiers, favicon, etc., à utiliser dans l'app
│  ├─ scripts/          # dédiés à l'application web
│  ├─ src/              # sources
│  │  ├─ app/           # dossier "app" Next13
│  │  ├─ common/        # code commun front back (e.i. métier ou config)
│  │  ├─ components/    # composants propres à l'app web
│  │  ├─ design-system/ # ds dédié standalone
│  │  ├─ pages/         # pages Next<12, utilisé uniquement pour l'api
│  │  ├─ services/      # services d'accès aux données
│  │  ├─ styles/        # feuilles de style de l'app web
│  ├─ types/            # types manuels globaux de l'app web
│  ├─ .env.development  # .env de dev à copier en .env.development.local si besoin
│  ├─ .env.production   # .env de prod (informatif et pour les build locaux)
│  ├─ .eslintrc.js      # config de lint générique exposant la config @mda/eslint-config
│  ├─ env.d.ts          # représentation en types des vars d'env de l'app
│  ├─ package.json      # package.json de l'app web uniquement
```

## Variables d'environnement & Config
Comme toute application Nextjs, des variables d'environnement sont injectées à la compilation ET à l'exécution.

Un fichier `.env.development` est disponible, mais doit être obligatoirement copié avant (en `.env.development.local` par exemple). Voir [la doc officielle](https://nextjs.org/docs/basic-features/environment-variables) pour plus d'informations.

Sauf si les ports de l'application sont changés en local par exemple, les variables par défaut suffisent pour la faire fonctionner.

Ces variables sont chargées via le fichier [`@common/config`](../apps/web/src/common/config/index.ts).  
Elles sont séparées en deux catégories, les variables utilisables uniquement côté serveur, qui sont sous l'objet `config.server`, et celles utilisables partout, accessibles via `config` directement.

Une variable serveur ne doit pas être préfixée par `NEXT_PUBLIC_`. Quand aux variables serveur, elle ne sont utilisables que sur les composants serveur. Côté client, ils n'auront qu'une valeur vide (`""`).  
En revanche il est possible de passer des variables serveur vers des composants client en les passant comme des props depuis un composant serveur.  
Example avec la variable `env` :
```tsx
"use client";

const ClientComposant = ({ env, children }) => {
    // anything you want to do with "env"
    return <>{children}</>
}
```

```tsx
import { config } from "@common/config";

// server component can call client components as "leaf"
const ServerComponent = () => {
    const data = await fetch("url");

    return <ClientComposant env={config.server.env}>{data}</ClientComposant>
}
```

Il faut toutefois rester prudent sur cette méthode et ne jamais passer de variables sensibles.

Plus d'info sur les server components : https://beta.nextjs.org/docs/rendering/server-and-client-components

## Webhook de revalidation
Dans l'application, une seule route d'API est en place, la route de webhook pour Strapi permettant de revalider les pages serveur.  
Le webhook n'est accesible qu'en POST et un token d'authentification doit être ajouté aux headers.  
Example : `fetch("/api/strapi/webhook", { type: "api::fiche-pratique.fiche-pratique", fragment: "je-m-interroge-sur-mon-enfant" })`

## Appeler des données venant de Strapi
Une fonction dédiée est disponible pour récupérer des données de Strapi : `fetchStrapi()`.  
Elle complètement typée et donne l'autocomplete nécessaire à sa bonne utilisation. Suivant les arguments donnés, elle permet de récupérer soit des objets uniques, soit des collections (tableaux). Elle se base sur le nom de la resource plutôt que son slug Strapi par soucis de facilité d'utilisation.  
Example :
```ts
// fetch multiple items
const fiches = await fetchStrapi("fiche-pratiques");
console.log(fiches.length);

// fetch single item with id "1"
const fiche = await fetchStrapi("fiche-pratiques/1", { populate: "deep" });
```

Le second argument est un ensemble d'option permettant d'affiner la requête : tris, selection de certains champs uniquement, filtres, pagination, chargement des relations (`populate`).  
Se référer à la documentation REST de Strapi pour la description des paramêtres : https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/api-parameters.html

"Populate" peut aussi prendre la valeur `deep` pour récupérer tous les niveaux de relation en même temps, grâce au plugin [strapi-plugin-populate-deep](https://github.com/Barelydead/strapi-plugin-populate-deep).

## Composants
L'application étant en mode `app` avec Next13, les composants serveur sont activés par défaut. Il est donc important de bien découpler ses logiques d'affichage et d'utiliser `"use client"` avec parcimonie et uniquement dans des composants bas niveau ou parallèles.  
Ne pas hésiter donc à séparer une composant qui ne contiendrait qu'une partie utilisant des hooks front ou des interractions.

Essayer aussi au maximum d'avoir des composants clients dans dossier séparé, comme dans `src/components/base/client` ou `src/design-system/base/client`. Cette séparation évitera d'exporter en même temps des composants clients et serveurs dans le même [barrel](https://basarat.gitbook.io/typescript/main-1/barrel) ; d'ailleurs, il existe pour ça deux barrels distincts dans le design system pour garder des import propres : `src/design-system/client.ts` & `src/design-system/server.ts`.

En cas d'extrême nécessité, il est tout a fait possible au besoin de réexporter une composant serveur "simple" assez générique en composant client. Ce composant pourra ensuite être utilisé dans un autre composant client sans déranger Next :
```ts
// src/design-system/client.ts

"use client"; // utiliser la directive dans un export permet de "convertir" les composants serveur en composants client

// ...

export { Container as ClientContainer } from "./layout/Container";
```

Cette méthode de réexport est utilisable aussi pour les libraries front interractives qui n'utilisent pas encore la directive `"use client"` mais qui pourraient être utilisées en "bout de chaîne" dans une page.

Plus d'info sur [la doc](https://beta.nextjs.org/docs/rendering/server-and-client-components) de Next.
