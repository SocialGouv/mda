import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { CollapsedSectionDynamicGroup } from "@design-system/client";
import { fetchStrapi } from "@services/strapi";
import ReactMarkdown from "react-markdown";

const AutismHouse = async () => {
  const strapiData = await fetchStrapi("mes-aides", { populate: "sections", sort: "id" });
  const data = strapiData.data?.attributes;

  return (
    <SimpleContentPage>
      <ActionsButtons />
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && (
        <div className="fr-text--xl">
          <ReactMarkdown>{data.content}</ReactMarkdown>
        </div>
      )}
      {data?.sections && (
        <CollapsedSectionDynamicGroup
          data={
            data.sections.map((s, sectionIdx) => ({
              id: `section-${sectionIdx}`,
              title: s.title,
              content: <ReactMarkdown>{s.content}</ReactMarkdown>,
            })) ?? []
          }
        />
      )}
    </SimpleContentPage>
  );
};

export default AutismHouse;
