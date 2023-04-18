import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { CollapsedSectionDynamicGroup } from "@design-system/client";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const head = await fetchStrapi("maison-de-l-autisme");
    return {
      title: head.data?.attributes.title as string,
      slug: "la-maison-de-l-autisme",
      description: head.data?.attributes.content,
    };
  },
});

const LaMaisonDeLAutismePage = async () => {
  const pageData = await fetchStrapi("maison-de-l-autisme", { populate: "sections" });
  const laMaisonDeLAutisme = pageData.data?.attributes;

  return (
    <SimpleContentPage>
      <ActionsButtons />
      {laMaisonDeLAutisme?.title && <h1>{laMaisonDeLAutisme.title}</h1>}
      {laMaisonDeLAutisme?.content && (
        <div className="fr-text--xl">
          <Markdown>{laMaisonDeLAutisme.content}</Markdown>
        </div>
      )}
      {laMaisonDeLAutisme?.sections && (
        <CollapsedSectionDynamicGroup
          data={
            laMaisonDeLAutisme.sections.map((s, sectionIdx) => ({
              id: `section-${sectionIdx}`,
              title: s.title,
              content: <Markdown>{s.content}</Markdown>,
            })) ?? []
          }
        />
      )}
    </SimpleContentPage>
  );
};

export default LaMaisonDeLAutismePage;
