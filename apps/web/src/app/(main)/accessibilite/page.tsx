import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { fetchStrapi } from "@services/strapi";
import ReactMarkdown from "react-markdown";

const Directory = async () => {
  const strapiData = await fetchStrapi("accessibilite");
  const data = strapiData.data?.attributes;
  return (
    <SimpleContentPage>
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && <ReactMarkdown>{data.content}</ReactMarkdown>}
    </SimpleContentPage>
  );
};

export default Directory;
