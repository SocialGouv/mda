import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { CollapsedSectionDynamicGroup } from "@design-system/client";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

const getData = () => {
  return fetchStrapi("maison-de-l-autisme", { populate: "sections", sort: "id" });
};

export const generateMetadata = generateMetadataFactory({
  resolveSlug: () => "la-maison-de-l-autisme",
  async resolveTitle() {
    const strapiData = await getData();
    return strapiData.data?.attributes.title as string;
  },
});

const Page = async () => {
  const strapiData = await getData();
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
