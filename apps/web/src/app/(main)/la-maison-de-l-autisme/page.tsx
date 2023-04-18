import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { CollapsedSectionDynamicGroup } from "@design-system/client";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const strapiData = await fetchStrapi("maison-de-l-autisme");
    return {
      title: strapiData.data?.attributes.title as string,
      slug: "la-maison-de-l-autisme",
    };
  },
});

const Page = async () => {
  const strapiData = await fetchStrapi("maison-de-l-autisme", { populate: "sections" });
  const data = strapiData.data?.attributes;

  return (
    <SimpleContentPage>
      <ActionsButtons />
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && (
        <div className="fr-text--xl">
          <Markdown>{data.content}</Markdown>
        </div>
      )}
      {data?.sections && (
        <CollapsedSectionDynamicGroup
          data={
            data.sections.map((s, sectionIdx) => ({
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

export default Page;
