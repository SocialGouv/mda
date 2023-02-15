import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { Container, Grid, GridCol } from "@design-system";
import { fetchStrapi } from "@services/strapi";

import { DiagSteps } from "./DiagSteps";

const DiagnosticPage = async () => {
  const firstQuestion = (await fetchStrapi("questions", { filters: { first: { $eq: true } }, populate: "deep,4" }))
    .data?.[0];
  if (!firstQuestion) {
    return null;
  }

  return (
    <section className="fr-py-6w fr-py-md-12w fr-bg-grey-lightest">
      <Container>
        <Grid haveGutters justifyCenter>
          <GridCol md={10} lg={8} className="fr-bg-white fr-px-2w fr-py-4w fr-py-md-8w fr-px-md-12w">
            <h1 className="fr-h2 fr-text-center">Mon diagnostic</h1>
            <p>
              Je démarre un diagnostic auprès de mon médecin traitant puis je réalise un bilan fonctionnel détaillé
              auprès d'un ensemble de professionnels de santé.
            </p>
            <DiagSteps firstQuestion={firstQuestion} />
            <div className="fr-mt-4w fr-text-center">
              <ActionsButtons />
            </div>
            <hr className="fr-mt-4w fr-mb-2w " />
            <div className="fr-content">
              <p>
                Si le professionnel indiqué n'est pas disponible dans votre région, prenez rendez-vous avec un médecin
                généraliste.
              </p>
              <p>
                Pour les adultes, le Centre de Ressource Autisme peut vous aider à trouver des professionnels de santé.
                Vous pouvez également demander une consultation en Centre médico-psychologique, quelque soit votre
                trouble. Quelle que soit votre situation, une consultation chez un médecin généraliste reste une étape
                incontournable.
              </p>
            </div>
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
};

export default DiagnosticPage;
