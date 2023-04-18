import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

const getData = () => {
  return fetchStrapi("annuaire", { populate: "links", sort: "id" });
};

export const generateMetadata = generateMetadataFactory({
  resolveSlug: () => "annuaire",
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

export default Page;
