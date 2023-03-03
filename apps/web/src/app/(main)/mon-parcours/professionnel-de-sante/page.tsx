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
            <h1>Mon parcours de professionnel de santé ou du médico-social</h1>
            <div className="fr-text--xl">
              <p>
                Cette rubrique du site internet est en cours de construction pour le moment. Si vous êtes un
                professionnel de santé ou du médico-social, partagez-nous vos attentes en donnant votre avis via le
                formulaire <NextLinkOrA href="/je-donne-mon-avis">Je donne mon avis</NextLinkOrA>.
              </p>
            </div>
          </GridCol>

          <GridCol md={10} lg={8} className="fr-mt-4w">
            <Grid as="ul" haveGutters>
              <GridCol as="li" md={6}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h2">
                        <NextLinkOrA href="/fiches-pratiques/comment-puis-je-diagnostiquer-un-patient-potentiellement-autiste">
                          Comment diagnostiquer un patient potentiellement autiste
                        </NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Le diagnostic de troubles du spectre de l’autisme relève d’un médecin, qui s’appuie autant que
                        nécessaire sur une démarche pluridisciplinaire.
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
              <GridCol as="li" md={6}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h2">
                        <NextLinkOrA href="/fiches-pratiques/parcours-de-diagnostic">
                          Parcours de diagnostic
                        </NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Le diagnostic est un parcours qui se réalise auprès de plusieurs professionnels de santé.
                        Plusieurs types de parcours existent selon l'âge de la personne.
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
              <GridCol as="li" md={6}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h2">
                        <NextLinkOrA href="/je-donne-mon-avis">Je donne mon avis</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Un oubli&nbsp;? Une suggestion&nbsp;? Utilisez le module Je donne mon avis pour soumettre vos
                        idées afin de contribuer à enrichir ce service public.
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
              <GridCol as="li" md={6}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h2">
                        <NextLinkOrA href="/fiches-pratiques/recommandations-de-bonnes-pratiques-professionnelles">
                          Recommandations de Bonnes Pratiques Professionnelles
                        </NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Les recommandations de bonnes pratiques professionnelles (aussi appelées les RBPP) sont des
                        synthèses rigoureuses de l’état de l’art, des connaissances et des pratiques sur l’autisme, à un
                        temps donné.
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
