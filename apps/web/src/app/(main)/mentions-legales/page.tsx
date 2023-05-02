import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const head = await fetchStrapi("mentions-legales");
    return {
      title: head.data?.attributes.title as string,
      slug: "mentions-legales",
      description: head.data?.attributes.content,
    };
  },
});

const MentionsLegalesPage = async () => {
  const pageData = await fetchStrapi("mentions-legales");
  const mentionsLeages = pageData.data?.attributes;
  return (
    <SimpleContentPage>
      {mentionsLeages?.title && <h1>{mentionsLeages.title}</h1>}
      {mentionsLeages?.content && (
        <div className="fr-text--xl">
          <Markdown>{mentionsLeages.content}</Markdown>
        </div>
      )}
    </SimpleContentPage>
  );
};

export default MentionsLegalesPage;
