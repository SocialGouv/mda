import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const strapiData = await fetchStrapi("mentions-legales");
    return {
      title: strapiData.data?.attributes.title as string,
      slug: "mentions-legales",
    };
  },
});

const Page = async () => {
  const strapiData = await fetchStrapi("mentions-legales");
  const data = strapiData.data?.attributes;
  return (
    <SimpleContentPage>
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && (
        <div className="fr-text--xl">
          <Markdown>{data.content}</Markdown>
        </div>
      )}
    </SimpleContentPage>
  );
};

export default Page;
