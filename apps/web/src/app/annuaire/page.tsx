import { SimpleContentPage } from "@components/base/SimpleContentPage";

const Directory = () => {
  return (
    <SimpleContentPage>
      <h1>Annuaire</h1>
      <p className="fr-text--lg">
        Vous cherchez des contacts de confiance&nbsp;? Un établissement ou un organisme&nbsp;? Des professionnels de
        santé&nbsp;? Une association&nbsp;?
      </p>
      <p className="fr-mt-6w">
        Rendez-vous sur l'annuaire d'
        <a href="https://annuaire.autismeinfoservice.fr/" target="_blank" rel="noreferrer">
          Autisme Info Service
        </a>
      </p>
    </SimpleContentPage>
  );
};

export default Directory;
