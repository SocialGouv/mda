import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

const getData = () => {
  return fetchStrapi("plan-du-site");
};

export const generateMetadata = generateMetadataFactory({
  resolveSlug: () => "plan-du-site",
  async resolveTitle() {
    const strapiData = await getData();
    return strapiData.data?.attributes.title as string;
  },
});

const Page = async () => {
  const strapiData = await getData();
  const data = strapiData.data?.attributes;
  return (
    <SimpleContentPage>
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && <Markdown>{data.content}</Markdown>}
    </SimpleContentPage>
  );
};

export default Page;
