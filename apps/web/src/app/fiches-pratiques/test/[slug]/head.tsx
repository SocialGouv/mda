import { Next13Seo } from "@components/utils/Next13Seo";

import { type FichePratiqueContext } from "./page";

const Head = (ctx: FichePratiqueContext) => {
  console.log("HEAD CTX", ctx);
  return <Next13Seo title="Fiche Pratique" />;
};

export default Head;
