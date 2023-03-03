import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { fetchStrapi } from "@services/strapi";
import ReactMarkdown from "react-markdown";

const LegalNotice = async () => {
  const strapiData = await fetchStrapi("mentions-legales");
  const data = strapiData.data?.attributes;
  return (
    <SimpleContentPage>
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && (
        <div className="fr-text--xl">
          <ReactMarkdown>{data.content}</ReactMarkdown>
        </div>
      )}
    </SimpleContentPage>
  );
};

export default LegalNotice;
