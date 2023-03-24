import { Next13Seo } from "@components/utils/Next13Seo";
import { fetchStrapi } from "@services/strapi";

import { type ParcoursProps } from "./page";

const Head = async ({ params }: ParcoursProps) => {
  const currentParcours = (
    await fetchStrapi("parcourss", {
      filters: {
        slug: {
          $eq: params.slug,
        },
      },
    })
  ).data?.[0];
  return <Next13Seo title={`${currentParcours ? currentParcours.attributes.title : ""}`} />;
};

export default Head;
