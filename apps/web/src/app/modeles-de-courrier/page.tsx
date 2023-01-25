import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { DownloadLink } from "@design-system";

const Documents = () => {
  return (
    <SimpleContentPage>
      <h1>Modèles de courrier</h1>
      <ul>
        <li>
          <DownloadLink
            href="/documents/recours-administratif-prealableobligatoire.docx"
            title="Recours administratif préalable obligatoire (RAPO)"
            type="DOCX"
            size="16ko"
          />
        </li>
        <li>
          <DownloadLink href="documents/projet-de-vie.docx" title="Projet de vie" type="DOCX" size="19ko" />
        </li>
        <li>
          <DownloadLink
            href="documents/mise-en-demeure-absence-partielle-AESH-individuel.doc"
            title="Mise en demeure de la DSDEN, absence partielle AESH individuel"
            type="DOC"
            size="35ko"
          />
        </li>
        <li>
          <DownloadLink
            href="documents/mise-en-demeure-absence-totale-AESH-individuel.doc"
            title="Mise en demeure de la DSDEN, absence totale AESH individuel"
            type="DOC"
            size="35ko"
          />
        </li>
        <li>
          <DownloadLink
            href="documents/mise-en-demeure-absence-totale-AESH-mutualise.doc"
            title="Mise en demeure de la DSDEN, absence totale AESH mutualisée"
            type="DOC"
            size="35ko"
          />
        </li>
      </ul>
    </SimpleContentPage>
  );
};

export default Documents;
