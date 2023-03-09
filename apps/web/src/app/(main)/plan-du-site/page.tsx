import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { fetchStrapi } from "@services/strapi";
import ReactMarkdown from "react-markdown";

const SiteMap = async () => {
  const strapiData = await fetchStrapi("plan-du-site");
  const data = strapiData.data?.attributes;
  return (
    <SimpleContentPage>
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && <ReactMarkdown>{data.content}</ReactMarkdown>}
    </SimpleContentPage>
  );
};

export default SiteMap;
