import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { fetchStrapi } from "@services/strapi";
import ReactMarkdown from "react-markdown";

const PrivacyPolicy = async () => {
  const strapiData = await fetchStrapi("politique-de-confidentialite");
  const data = strapiData.data?.attributes;
  return (
    <SimpleContentPage>
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && <ReactMarkdown>{data.content}</ReactMarkdown>}
    </SimpleContentPage>
  );
};

export default PrivacyPolicy;
