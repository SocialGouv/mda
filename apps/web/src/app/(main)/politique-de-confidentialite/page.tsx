import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

import { GDPRButton } from "./GDPRButton";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const head = await fetchStrapi("politique-de-confidentialite");
    return {
      title: head.data?.attributes.title as string,
      slug: "politique-de-confidentialite",
      description: head.data?.attributes.content,
    };
  },
});

const PolitiqueDeConfidentialitePage = async () => {
  const pageData = await fetchStrapi("politique-de-confidentialite");
  const politiqueDeConfidentialite = pageData.data?.attributes;
  return (
    <SimpleContentPage>
      {politiqueDeConfidentialite?.title && <h1>{politiqueDeConfidentialite.title}</h1>}
      {politiqueDeConfidentialite?.content && <Markdown>{politiqueDeConfidentialite.content}</Markdown>}
      <div className="fr-my-2w">
        <GDPRButton>Modifier les réglages</GDPRButton>
      </div>
    </SimpleContentPage>
  );
};

export default PolitiqueDeConfidentialitePage;
