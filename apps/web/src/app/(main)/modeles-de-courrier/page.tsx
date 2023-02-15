import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { DownloadLink } from "@design-system";
import { NextLinkOrA } from "@design-system/utils/NextLinkOrA";

const Documents = () => {
  return (
    <SimpleContentPage>
      <h1>Modèles de courrier</h1>
      <p className="fr-text--lg">
        Plusieurs personnes concernées nous ont partagé le besoin d'accéder rapidement et facilement à des modèles de
        courrier. Vous trouverez ci-dessous ces modèles à télécharger et personnaliser. Si vous avez des suggestions de
        modèles à ajouter, dites-le nous grâce au formulaire{" "}
        <NextLinkOrA href="je-donne-mon-avis">Je donne mon avis</NextLinkOrA>.
      </p>
      <ul className="fr-mt-6w">
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
