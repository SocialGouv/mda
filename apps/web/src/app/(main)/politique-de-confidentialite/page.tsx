import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { fetchStrapi } from "@services/strapi";

import { GDPRButton } from "./GDPRButton";

const getData = async () => {
  const res = fetchStrapi("plan-du-site");
  return res;
};

export const generateMetadata = async () => {
  const strapiData = await getData();
  return { title: strapiData.data?.attributes.title };
};

const PrivacyPolicy = async () => {
  const strapiData = await getData();
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
