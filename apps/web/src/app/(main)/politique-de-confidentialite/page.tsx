import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

import { GDPRButton } from "./GDPRButton";

const getData = () => {
  return fetchStrapi("politique-de-confidentialite");
};

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const strapiData = await getData();
    return {
      title: strapiData.data?.attributes.title as string,
      slug: "politique-de-confidentialite",
    };
  },
});

const Page = async () => {
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

export default Page;
