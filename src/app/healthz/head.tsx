import { config } from "@common/config";
import { Next13Seo } from "@components/utils/Next13Seo";

const Head = () => {
  return (
    <Next13Seo title="HealthZ" description={`Page healthZ de l'application ${config.siteTitle}.`} noindex nofollow />
  );
};

export default Head;
