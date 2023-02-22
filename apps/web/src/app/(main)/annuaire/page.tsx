import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { fetchStrapi } from "@services/strapi";
import ReactMarkdown from "react-markdown";

const Directory = async () => {
  const strapiData = await fetchStrapi("annuaire", { populate: "links", sort: "id" });
  const data = strapiData.data?.attributes;
  return (
    <SimpleContentPage>
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && (
        <div className="fr-text--xl">
          <ReactMarkdown>{data.content}</ReactMarkdown>
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
          ))}{" "}
        </ul>
      )}
    </SimpleContentPage>
  );
};

export default Directory;
