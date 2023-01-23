import { Container, Grid, GridCol } from "@design-system";

import { FeedbackForm } from "./FeedbackForm";

const Feedback = () => {
  return (
    <section>
      <Container className="fr-py-6w fr-py-md-12w">
        <Grid justifyCenter>
          <GridCol md={10} lg={8}>
            <h1>Partagez votre avis sur ce site internet et vos idées d'amélioration.</h1>
            <p className="fr-text--lg">
              Ce site est fait pour les personnes autistes, par des personnes autistes, et avec des personnes autistes.
              Les commentaires, réactions et propositions des personnes concernées (personnes autistes, parents,
              aidants, professionnels...) sont précieux pour nous aider à améliorer ce service.
            </p>
            <FeedbackForm />
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
};

export default Feedback;
