import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const pageData = await fetchStrapi("annuaire");
    const annuaire = pageData.data?.attributes;
    return {
      description: annuaire?.content,
      modifiedTime: annuaire?.updatedAt,
      publishedTime: annuaire?.createdAt,
      slug: "annuaire",
      title: annuaire?.title as string,
    };
  },
});

const AnnuairePage = async () => {
  const pageData = await fetchStrapi("annuaire", { populate: "links", sort: "id" });
  const annuaire = pageData.data?.attributes;
  return (
    <SimpleContentPage>
      {annuaire?.title && <h1>{annuaire.title}</h1>}
      {annuaire?.content && (
        <div className="fr-text--xl">
          <Markdown>{annuaire.content}</Markdown>
        </div>
      )}
      {annuaire?.links && (
        <ul>
          {annuaire.links.map((link, index) => (
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

export default AnnuairePage;
