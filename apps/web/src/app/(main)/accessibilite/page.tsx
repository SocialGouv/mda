import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { fetchStrapi } from "@services/strapi";

const getData = async () => {
  const res = fetchStrapi("accessibilite");
  return res;
};

export const generateMetadata = async () => {
  const strapiData = await getData();
  return { title: strapiData.data?.attributes.title };
};

const Directory = async () => {
  const strapiData = await getData();
  const data = strapiData.data?.attributes;
  return (
    <SimpleContentPage>
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && <Markdown>{data.content}</Markdown>}
    </SimpleContentPage>
  );
};

export default Directory;
