import { SimpleContentPage } from "@components/base/SimpleContentPage";

import { FeedbackForm } from "./FeedbackForm";

const Feedback = () => {
  return (
    <SimpleContentPage>
      <h1>Partagez votre avis sur ce site internet et vos idées d'amélioration.</h1>
      <p className="fr-text--lg">
        Ce site est fait pour les personnes autistes, par des personnes autistes, et avec des personnes autistes. Les
        commentaires, réactions et propositions des personnes concernées (personnes autistes, parents, aidants,
        professionnels...) sont précieux pour nous aider à améliorer ce service.
      </p>
      <FeedbackForm />
    </SimpleContentPage>
  );
};

export default Feedback;
