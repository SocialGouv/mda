import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const pageData = await fetchStrapi("plan-du-site");
    const planDuSite = pageData.data?.attributes;
    return {
      description: planDuSite?.content,
      modifiedTime: planDuSite?.updatedAt,
      publishedTime: planDuSite?.createdAt,
      slug: "plan-du-site",
      title: planDuSite?.title as string,
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
