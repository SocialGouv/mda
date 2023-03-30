import { Next13Seo } from "@components/utils/Next13Seo";
import { fetchStrapi } from "@services/strapi";

import { type FichePratiqueProps } from "./page";

const Head = async ({ params }: FichePratiqueProps) => {
  const currentEtape = (
    await fetchStrapi("etape-de-vies", {
      filters: {
        slug: {
          $eq: params.slug,
        },
      },
    })
  ).data?.[0];
  return <Next13Seo title={`Étape de vie${currentEtape ? ` - ${currentEtape.attributes.title}` : ""}`} />;
};

export default Head;
