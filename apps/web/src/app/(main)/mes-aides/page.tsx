import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { CollapsedSectionDynamicGroup } from "@design-system/client";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const head = await fetchStrapi("mes-aides");
    return {
      title: head.data?.attributes.title as string,
      slug: "mes-aides",
      description: head.data?.attributes.content,
    };
  },
});

const MesAidesPage = async () => {
  const pageData = await fetchStrapi("mes-aides", { populate: "sections" });
  const mesAides = pageData.data?.attributes;

  return (
    <SimpleContentPage>
      <ActionsButtons />
      {mesAides?.title && <h1>{mesAides.title}</h1>}
      {mesAides?.content && (
        <div className="fr-text--xl">
          <Markdown>{mesAides.content}</Markdown>
        </div>
      )}
      {mesAides?.sections && (
        <CollapsedSectionDynamicGroup
          data={
            mesAides.sections.map((s, sectionIdx) => ({
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

export default MesAidesPage;
