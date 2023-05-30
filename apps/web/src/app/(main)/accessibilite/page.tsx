import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const pageData = await fetchStrapi("accessibilite");
    const accessibilite = pageData.data?.attributes;
    return {
      description: accessibilite?.content,
      modifiedTime: accessibilite?.updatedAt,
      publishedTime: accessibilite?.createdAt,
      slug: "accessibilite",
      title: accessibilite?.title as string,
    };
  },
});

const AccessibilitePage = async () => {
  const pageData = await fetchStrapi("accessibilite");
  const accessibilite = pageData.data?.attributes;
  return (
    <SimpleContentPage>
      {accessibilite?.title && <h1>{accessibilite.title}</h1>}
      {accessibilite?.content && <Markdown>{accessibilite.content}</Markdown>}
    </SimpleContentPage>
  );
};

export default AccessibilitePage;
