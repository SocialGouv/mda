import {
  Card,
  CardBody,
  CardBodyContent,
  CardBodyContentDescription,
  CardBodyContentTitle,
  Container,
  Grid,
  GridCol,
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineItemFooterLink,
  TimelineItemTitle,
} from "src/design-system/server";
import { NextLinkOrA } from "src/design-system/utils/NextLinkOrA";

const MonParcoursAidant = () => {
  return (
    <section className="fr-py-6w fr-py-md-12w">
      <Container>
        <Grid haveGutters justifyCenter>
          <GridCol md={10} lg={8}>
            <h1>Parcours parent, personne aidante</h1>
            <p className="fr-text--xs">
              Vérifié le 8 novembre 2022 - Direction de l'information légale et administrative (Premier ministre)
            </p>
            <div className="fr-text--xl">
              <p>
                L’autisme est un trouble du neuro-développement précoce, qui impacte les capacités de communication, les
                interactions sociales et les comportements des personnes. Ce trouble va souvent de pair avec d’autres
                manifestations : hyper ou hypo sensibilité aux sons, lumières, odeur... , trouble du déficit de
                l’attention avec ou sans hyperactivité (TDAH), troubles “dys” (dyslexie, dyspraxie, dysphasie,...).
              </p>
            </div>
          </GridCol>
          <GridCol md={10} lg={6}>
            <Timeline>
              <TimelineItem isEnlargeLink>
                <TimelineItemTitle>
                  <NextLinkOrA href="/mon-parcours/parent-personne-aidante">Je me pose des questions</NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  Je m'interroge sur mes comportements ou ceux de mon enfant. Je souhaite repérer des différences de
                  comportements et de ressentis qui pourraient relever d'un trouble du neuro-développement.
                </TimelineDescription>
              </TimelineItem>
              <TimelineItem
                footer={
                  <ul>
                    <li>
                      <TimelineItemFooterLink href="#">Scolarisation</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="#">Etudes supérieures</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="#">Transport</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="#">Logement</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="#">Mon Emploi</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="#">L'emploi de mon enfant</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="#">Tutelle & curatelle</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="#">Protection des biens</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="#">
                        Relations sociales, amoureuses & familiales
                      </TimelineItemFooterLink>
                    </li>
                  </ul>
                }
              >
                <TimelineItemTitle>Je me pose des questions</TimelineItemTitle>
                <TimelineDescription>
                  Je m'interroge sur mes comportements ou ceux de mon enfant. Je souhaite repérer des différences de
                  comportements et de ressentis qui pourraient relever d'un trouble du neuro-développement.
                </TimelineDescription>
              </TimelineItem>
              <TimelineItem isEnlargeLink>
                <TimelineItemTitle>
                  <NextLinkOrA href="/mon-parcours/parent-personne-aidante">Je me pose des questions</NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  Je m'interroge sur mes comportements ou ceux de mon enfant. Je souhaite repérer des différences de
                  comportements et de ressentis qui pourraient relever d'un trouble du neuro-développement.
                </TimelineDescription>
              </TimelineItem>
            </Timeline>
          </GridCol>
          <GridCol md={10} lg={8}>
            <Grid haveGutters>
              <GridCol md={6}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h2">
                        <NextLinkOrA href="#">J’en parle autour de moi</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        L’autisme est un trouble du neuro-développement précoce, qui impacte les capacités de
                        communication, les interactions sociales et les comportements des personnes.
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
                        <NextLinkOrA href="#">Je cherche des groupes avec qui échanger</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        En ligne ou en physique près de chez moi, des communautés de partage et d'entraide liés au TSA
                        existent.
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
                        <NextLinkOrA href="#">Je donne mon avis</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Un oubli ? Une suggestion ? Utilisez le module "JeDonneMonAvis" pour soumettre vos idées afin de
                        contribuer à enrichir ce service public construit par et pour les personnes autistes et leurs
                        proches.
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
                        <NextLinkOrA href="#">Annuaire</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Vous cherchez une organisation agissant dans le domaine de l’autisme ? Trouvez ses coordonnées
                        dans notre annuaire.
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
