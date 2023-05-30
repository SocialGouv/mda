import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { DownloadLink } from "@design-system";
import { type DataWrapper } from "@mda/strapi-types";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const pageData = await fetchStrapi("modeles-de-courrier");
    const modelesDeCourrier = pageData.data?.attributes;
    return {
      title: modelesDeCourrier?.title as string,
      modifiedTime: modelesDeCourrier?.updatedAt,
      publishedTime: modelesDeCourrier?.publishedAt,
      slug: "modeles-de-courrier",
      description: modelesDeCourrier?.content,
    };
  },
});

const ModelesDeCourrierPage = async () => {
  const pageData = await fetchStrapi("modeles-de-courrier", { populate: "files" });
  const modelesDeCourrier = pageData.data?.attributes;
  // The cast is mandatory as the generated type is `files: MediaAttribute`
  const files = (modelesDeCourrier?.files?.data ?? []) as Array<DataWrapper<"plugin::upload.file">>;

  const fileList = files.map(({ id, attributes: { name, ext, size, url } }) => ({
    type: ext?.substring(1).toLocaleUpperCase() || "",
    id,
    title: ext ? name.replace(new RegExp(`${ext}$`), "") : name,
    size: `${Math.round(size)}ko`,
    url,
  }));

  return (
    <SimpleContentPage>
      {modelesDeCourrier?.title && <h1>{modelesDeCourrier.title}</h1>}
      {modelesDeCourrier?.content && <Markdown>{modelesDeCourrier.content}</Markdown>}
      {!!fileList.length && (
        <ul className="fr-mt-6w">
          {fileList.map(file => (
            <li key={file.id}>
              <DownloadLink href={file.url} title={file.title} type={file.type} size={file.size} />
            </li>
          ))}
        </ul>
      )}
      {!fileList.length && <p className="fr-mt-6w">Aucun modèle pour le moment.</p>}
    </SimpleContentPage>
  );
};

export default ModelesDeCourrierPage;
