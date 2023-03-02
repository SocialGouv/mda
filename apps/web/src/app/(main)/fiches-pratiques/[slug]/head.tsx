import { Next13Seo } from "@components/utils/Next13Seo";
import { fetchStrapi } from "@services/strapi";

import { type FichePratiqueProps } from "./page";

const Head = async ({ params }: FichePratiqueProps) => {
  const currentFiche = (
    await fetchStrapi("fiche-pratiques", {
      filters: {
        slug: {
          $eq: params.slug,
        },
      },
    })
  ).data?.[0];
  return (
    <head>
      <Next13Seo title={`Fiche pratique${currentFiche ? ` - ${currentFiche.attributes.title}` : ""}`} />
    </head>
  );
};

export default Head;
