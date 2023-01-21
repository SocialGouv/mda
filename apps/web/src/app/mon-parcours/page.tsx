import {
  Card,
  CardBody,
  CardBodyContent,
  CardBodyContentDescription,
  CardBodyContentTitle,
  Container,
  Grid,
  GridCol,
} from "src/design-system/server";
import { NextLinkOrA } from "src/design-system/utils/NextLinkOrA";

const MonParcours = () => {
  return (
    <section className="fr-py-6w fr-py-md-12w">
      <Container>
        <h1>Mon Parcours</h1>
        <Grid haveGutters>
          <GridCol lg={6}>
            <Card isEnlargeLink>
              <CardBody>
                <CardBodyContent>
                  <CardBodyContentTitle titleAs="h3">
                    <NextLinkOrA href="/mon-parcours/parent-personne-aidante">
                      Parcours parent, personne aidante
                    </NextLinkOrA>
                  </CardBodyContentTitle>
                  <CardBodyContentDescription>
                    L’autisme est un trouble du neuro-développement précoce, qui impacte les capacités de communication,
                    les interactions sociales et les comportements des personnes. Ce trouble va souvent de pair avec
                    d’autres manifestations : hyper ou hypo sensibilité aux sons, lumières, odeur... , trouble du
                    déficit de l’attention avec ou sans hyperactivité (TDAH), troubles “dys” (dyslexie, dyspraxie,
                    dysphasie,...).
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
