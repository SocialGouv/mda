import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const head = await fetchStrapi("accessibilite");
    return {
      title: head.data?.attributes.title as string,
      slug: "accessibilite",
      description: head.data?.attributes.content,
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
