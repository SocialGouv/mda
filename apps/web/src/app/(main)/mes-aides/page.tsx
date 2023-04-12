import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { CollapsedSectionDynamicGroup } from "@design-system/client";
import { fetchStrapi } from "@services/strapi";

const getData = async () => {
  const res = fetchStrapi("mes-aides", { populate: "sections", sort: "id" });
  return res;
};

export const generateMetadata = async () => {
  const strapiData = await getData();
  return { title: strapiData.data?.attributes.title };
};

const HelpPage = async () => {
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

export default HelpPage;
