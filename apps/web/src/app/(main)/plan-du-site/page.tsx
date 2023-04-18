import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const strapiData = await fetchStrapi("plan-du-site");
    return {
      title: strapiData.data?.attributes.title as string,
      slug: "plan-du-site",
    };
  },
});

const Page = async () => {
  const strapiData = await fetchStrapi("plan-du-site");
  const data = strapiData.data?.attributes;
  return (
    <SimpleContentPage>
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && <Markdown>{data.content}</Markdown>}
    </SimpleContentPage>
  );
};

export default Page;
