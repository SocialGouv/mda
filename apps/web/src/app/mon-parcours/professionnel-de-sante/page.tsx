import { ActionsButtons } from "@components/base/client/ActionsButtons";
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

const MonParcoursAidant = () => {
  return (
    <section className="fr-py-6w fr-py-md-12w">
      <Container>
        <Grid haveGutters justifyCenter>
          <GridCol md={10} lg={8}>
            <ActionsButtons />
            <h1>Mon parcours de professionnel de santé ou du médico-sociale</h1>
            <p className="fr-text--xs">
              Vérifié le 8 novembre 2022 - Direction de l'information légale et administrative (Premier ministre)
            </p>
            <div className="fr-text--xl">
              <p>
                Cette rubrique du site internet est en cours de construction pour le moment. Si vous êtes un
                professionnel de santé ou du médico-social, partagez-nous vos attentes en donnant votre avis via le
                formulaire <NextLinkOrA href="/je-donne-mon-avis">Je donne mon avis</NextLinkOrA>.
              </p>
            </div>
          </GridCol>

          <GridCol md={10} lg={8} className="fr-mt-4w">
            <Grid haveGutters>
              <GridCol md={6}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h2">
                        <NextLinkOrA href="#">Comment diagnostiquer un patient potentiellement autiste</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>

              <GridCol md={6}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h2">
                        <NextLinkOrA href="#">Parcours de diagnostic</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
              <GridCol md={6}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h2">
                        <NextLinkOrA href="/je-donne-mon-avis">Je donne mon avis</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Un oubli&nbsp;? Une suggestion&nbsp;? Utilisez le module "JeDonneMonAvis" pour soumettre vos
                        idées afin de contribuer à enrichir ce service public construit par et pour les personnes
                        autistes et leurs proches.
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
              <GridCol md={6}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h2">
                        <NextLinkOrA href="#">Recommandations de Bonnes Pratiques Professionnelles</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
            </Grid>
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
};

export default MonParcoursAidant;
