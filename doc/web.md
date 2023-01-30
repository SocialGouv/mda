# Spécificités de l'application Web

## Variables d'environnement
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
