import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { JsonLd, type JsonLdProps } from "@components/utils/JsonLd";
import { Markdown } from "@components/utils/Markdown";
import { CollapsedSectionDynamicGroup } from "@design-system/client";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";
import { type Article } from "schema-dts";

const slug = "mes-aides";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const pageData = await fetchStrapi("mes-aides");
    const mesAides = pageData.data?.attributes;
    return {
      description: mesAides?.content,
      modifiedTime: mesAides?.updatedAt,
      publishedTime: mesAides?.createdAt,
      slug,
      title: mesAides?.title as string,
    };
  },
});

const MesAidesPage = async () => {
  const pageData = await fetchStrapi("mes-aides", { populate: "sections" });
  const mesAides = pageData.data?.attributes;

  const jsonLd: JsonLdProps<Article> = {
    type: "Article",
    dateCreated: mesAides?.createdAt,
    dateModified: mesAides?.updatedAt,
    name: mesAides?.title,
    slug,
  };

  return (
    <SimpleContentPage>
      <JsonLd {...jsonLd}></JsonLd>
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
