import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Alert, AlertTitle } from "@design-system";

import { FeedbackForm } from "./FeedbackForm";

const Feedback = () => {
  return (
    <SimpleContentPage>
      <h1>Partagez votre avis sur ce site internet et vos idées d'amélioration.</h1>
      <p className="fr-text--lg">
        Ce site est fait pour les personnes autistes, par des personnes autistes, et avec des personnes concernées.
        C'est une version beta en cours de déploiement progressif. Vos commentaires, réactions et propositions sont
        précieux pour nous aider à améliorer ce service au fur et à mesure.
      </p>
      <Alert>
        <AlertTitle as="h2">
          Attention, les demandes personnelles transmises via ce formulaire ne pourront être traitées sur ce site.
        </AlertTitle>
        <p>
          Pour les demandes personnelles, veuillez vous rapprocher de l'organisme en charge de votre dossier. Pour toute
          question, vous pouvez contacter{" "}
          <a
            href="https://www.autismeinfoservice.fr/"
            target="_blank"
            rel="noreferrer"
            title="Site Autisme Info Service - nouvelle fenêtre"
          >
            Autisme Info Service
          </a>
          .
        </p>
      </Alert>
      <FeedbackForm />
    </SimpleContentPage>
  );
};

export default Feedback;
