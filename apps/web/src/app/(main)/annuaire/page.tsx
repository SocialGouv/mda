import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { fetchStrapi } from "@services/strapi";

const getData = async () => {
  const res = await fetchStrapi("annuaire", { populate: "links", sort: "id" });
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
      {data?.content && (
        <div className="fr-text--xl">
          <Markdown>{data.content}</Markdown>
        </div>
      )}
      {data?.links && (
        <ul>
          {data.links.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </SimpleContentPage>
  );
};

export default Directory;
