import {
  Card,
  CardBody,
  CardBodyContent,
  CardBodyContentDescription,
  CardBodyContentTitle,
  Container,
  Grid,
  GridCol,
} from "@design-system";
import { NextLinkOrA } from "@design-system/utils/NextLinkOrA";

const MonParcours = () => {
  return (
    <section className="fr-py-6w fr-py-md-12w">
      <Container>
        <h1>Mon parcours</h1>
        <Grid as="ul" haveGutters>
          <GridCol as="li" lg={6}>
            <Card isEnlargeLink>
              <CardBody>
                <CardBodyContent>
                  <CardBodyContentTitle titleAs="h3">
                    <NextLinkOrA href="/mon-parcours/personne-autiste">Je suis une personne autiste</NextLinkOrA>
                  </CardBodyContentTitle>
                  <CardBodyContentDescription>
                    En tant que personne autiste, plusieurs étapes clés sont à réaliser pour mener votre vie de la
                    manière la plus autonome possible. Quelque soit votre situation, retrouvez dans cette rubrique des
                    contenus et outils de guidance pour vous aider à y voir plus clair sur le déroulé de ces grandes
                    étapes.
                  </CardBodyContentDescription>
                </CardBodyContent>
              </CardBody>
            </Card>
          </GridCol>
          <GridCol as="li" lg={6}>
            <Card isEnlargeLink>
              <CardBody>
                <CardBodyContent>
                  <CardBodyContentTitle titleAs="h3">
                    <NextLinkOrA href="/mon-parcours/parent-personne-aidante">
                      Je suis un parent ou un aidant
                    </NextLinkOrA>
                  </CardBodyContentTitle>
                  <CardBodyContentDescription>
                    En tant que parent ou proche aidant, plusieurs étapes clés sont à réaliser pour accompagner votre
                    proche à mener sa vie de la manière la plus autonome possible. Quelque soit votre situation,
                    retrouvez dans cette rubrique des contenus et outils de guidance pour vous aider à y voir plus clair
                    sur le déroulé de ces grandes étapes.
                  </CardBodyContentDescription>
                </CardBodyContent>
              </CardBody>
            </Card>
          </GridCol>
          <GridCol as="li" lg={6}>
            <Card isEnlargeLink>
              <CardBody>
                <CardBodyContent>
                  <CardBodyContentTitle titleAs="h3">
                    <NextLinkOrA href="/mon-parcours/professionnel-de-sante">
                      Je suis un professionnel de santé ou du médico-social
                    </NextLinkOrA>
                  </CardBodyContentTitle>
                  <CardBodyContentDescription>
                    Cette rubrique du site internet est en cours de construction pour le moment. Si vous êtes un
                    professionnel de santé ou du médico-social, partagez-nous vos attentes en donnant votre avis via le
                    formulaire "Je donne mon avis".
                  </CardBodyContentDescription>
                </CardBodyContent>
              </CardBody>
            </Card>
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
};

export default MonParcours;
