import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { fetchStrapi } from "@services/strapi";

import { GDPRButton } from "./GDPRButton";

const PrivacyPolicy = async () => {
  const strapiData = await fetchStrapi("politique-de-confidentialite");
  const data = strapiData.data?.attributes;
  return (
    <SimpleContentPage>
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && <Markdown>{data.content}</Markdown>}
      <div className="fr-my-2w">
        <GDPRButton>Modifier les réglages</GDPRButton>
      </div>
    </SimpleContentPage>
  );
};

export default PrivacyPolicy;
