import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { NextLinkOrA } from "@design-system/utils/NextLinkOrA";

const SiteMap = () => {
  return (
    <SimpleContentPage>
      <h1>Plan du site</h1>
      <ul>
        <li>
          <NextLinkOrA href="/">Accueil</NextLinkOrA>
        </li>
        <li className="fr-mt-1w">
          <NextLinkOrA href="/mon-parcours">Mon parcours</NextLinkOrA>
          <ul>
            <li>
              <NextLinkOrA href="/mon-parcours/personne-autiste">Mon parcours de personne autiste</NextLinkOrA>
            </li>
            <li>
              <NextLinkOrA href="/mon-parcours/parent-personne-aidante">Mon parcours de parent ou d'aidant</NextLinkOrA>
            </li>
            <li>
              <NextLinkOrA href="/mon-parcours/professionnel-de-sante">
                Mon parcours de professionnel de santé ou du médico-social
              </NextLinkOrA>
            </li>
          </ul>
        </li>
        <li className="fr-mt-1w">
          <NextLinkOrA href="/mon-diagnostic">Mon diagnostic</NextLinkOrA>
        </li>
        <li className="fr-mt-1w">
          <NextLinkOrA href="/fiches-pratiques">Fiches pratiques</NextLinkOrA>
        </li>
        <li className="fr-mt-1w">
          <NextLinkOrA href="/annuaire">Annuaire</NextLinkOrA>
        </li>
        <li className="fr-mt-1w">
          <NextLinkOrA href="/glossaire">Glossaire</NextLinkOrA>
        </li>
        <li className="fr-mt-1w">
          <NextLinkOrA href="/la-maison-de-l-autisme">La Maison de l'autisme</NextLinkOrA>
        </li>
        <li className="fr-mt-1w">
          <NextLinkOrA href="/je-donne-mon-avis">Je donne mon avis</NextLinkOrA>
        </li>
      </ul>
    </SimpleContentPage>
  );
};

export default SiteMap;
