import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { DownloadLink } from "@design-system";

const Documents = () => {
  return (
    <SimpleContentPage>
      <h1>Modèles de courrier</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odit ipsam doloribus beatae, alias excepturi
        incidunt ullam, tempora voluptates voluptatibus sit dicta dignissimos, cum expedita aut molestias a perferendis
        distinctio!
      </p>
      <ul>
        <li>
          <DownloadLink
            href="#"
            title="Télécharger le document lorem ipsum sit dolores amet"
            type="JPG"
            size="61,88 ko"
          />
        </li>
        <li>
          <DownloadLink
            href="#"
            title="Télécharger le document lorem ipsum sit dolores amet"
            type="JPG"
            size="61,88 ko"
          />
        </li>
        <li>
          <DownloadLink
            href="#"
            title="Télécharger le document lorem ipsum sit dolores amet"
            type="JPG"
            size="61,88 ko"
          />
        </li>
        <li>
          <DownloadLink
            href="#"
            title="Télécharger le document lorem ipsum sit dolores amet"
            type="JPG"
            size="61,88 ko"
          />
        </li>
      </ul>
    </SimpleContentPage>
  );
};

export default Documents;
