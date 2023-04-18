import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const strapiData = await fetchStrapi("accessibilite");
    return {
      title: strapiData.data?.attributes.title as string,
      slug: "accessibilite",
    };
  },
});

const Page = async () => {
  const strapiData = await fetchStrapi("accessibilite");
  const data = strapiData.data?.attributes;
  return (
    <SimpleContentPage>
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && <Markdown>{data.content}</Markdown>}
    </SimpleContentPage>
  );
};

export default Page;
