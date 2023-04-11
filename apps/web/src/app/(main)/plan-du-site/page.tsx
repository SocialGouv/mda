import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const head = await fetchStrapi("plan-du-site");
    return {
      title: head.data?.attributes.title as string,
      slug: "plan-du-site",
      description: head.data?.attributes.content,
    };
  },
});

const PlanDuSitePage = async () => {
  const pageData = await fetchStrapi("plan-du-site");
  const planDuSite = pageData.data?.attributes;
  return (
    <SimpleContentPage>
      {planDuSite?.title && <h1>{planDuSite.title}</h1>}
      {planDuSite?.content && <Markdown>{planDuSite.content}</Markdown>}
    </SimpleContentPage>
  );
};

export default PlanDuSitePage;
