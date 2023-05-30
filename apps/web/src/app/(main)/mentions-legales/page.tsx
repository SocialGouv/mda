import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const pageData = await fetchStrapi("mentions-legales");
    const mentionsLegales = pageData.data?.attributes;
    return {
      description: mentionsLegales?.content,
      modifiedTime: mentionsLegales?.updatedAt,
      publishedTime: mentionsLegales?.createdAt,
      slug: "mentions-legales",
      title: mentionsLegales?.title as string,
    };
  },
});

const MentionsLegalesPage = async () => {
  const pageData = await fetchStrapi("mentions-legales");
  const mentionsLegales = pageData.data?.attributes;
  return (
    <SimpleContentPage>
      {mentionsLegales?.title && <h1>{mentionsLegales.title}</h1>}
      {mentionsLegales?.content && (
        <div className="fr-text--xl">
          <Markdown>{mentionsLegales.content}</Markdown>
        </div>
      )}
    </SimpleContentPage>
  );
};

export default MentionsLegalesPage;
