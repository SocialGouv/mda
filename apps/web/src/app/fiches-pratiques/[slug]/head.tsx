import { Next13Seo } from "@components/utils/Next13Seo";
import { fetchStrapi } from "@services/strapi";

import { type FichePratiqueProps } from "./page";

const Head = async ({ params }: FichePratiqueProps) => {
  const currentFiche = (await fetchStrapi("fiche-pratiques", { populate: "deep", slug: params.slug }))[0];
  return (
    <head>
      <Next13Seo title={`Fiche Pratique - ${currentFiche.attributes.title}`} />
    </head>
  );
};

export default Head;
