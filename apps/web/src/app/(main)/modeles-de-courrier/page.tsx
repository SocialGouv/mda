import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import { DownloadLink } from "@design-system";
import { type DataWrapper } from "@mda/strapi-types";
import { fetchStrapi } from "@services/strapi";

const Documents = async () => {
  const strapiData = await fetchStrapi("modeles-de-courrier", { populate: "files" });
  const data = strapiData.data?.attributes;
  // The cast is mandatory as the generated type is `files: MediaAttribute`
  const files = (data?.files?.data ?? []) as Array<DataWrapper<"plugin::upload.file">>;

  const fileList = files.map(({ id, attributes: { name, ext, size, url } }) => ({
    type: ext?.substring(1).toLocaleUpperCase() || "",
    id,
    title: ext ? name.replace(new RegExp(`${ext}$`), "") : name,
    size: `${Math.round(size)}ko`,
    url,
  }));

  return (
    <SimpleContentPage>
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && <Markdown>{data.content}</Markdown>}
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

export default Documents;
