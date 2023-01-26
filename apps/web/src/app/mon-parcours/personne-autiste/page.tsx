import {
  Container,
  Grid,
  GridCol,
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineItemFooterLink,
  TimelineItemTitle,
} from "@design-system";
import { NextLinkOrA } from "@design-system/utils/NextLinkOrA";

import { Tiles } from "../Tiles";

const MonParcoursAidant = () => {
  return (
    <section className="fr-py-6w fr-py-md-12w">
      <Container>
        <Grid haveGutters justifyCenter>
          <GridCol md={10} lg={8}>
            <h1>Mon parcours de personne autiste</h1>
            <p className="fr-text--xs">
              Vérifié le 8 novembre 2022 - Direction de l'information légale et administrative (Premier ministre)
            </p>
            <div className="fr-text--xl">
              <p>
                En tant que personne autiste, plusieurs étapes clés sont à réaliser pour mener votre vie de la manière
                la plus autonome possible. Quelque soit votre situation, retrouvez ci-dessous des contenus et outils de
                guidance pour vous aider à y voir plus clair sur le déroulé de ces grandes étapes.
              </p>
            </div>
          </GridCol>
          <GridCol md={10} lg={6}>
            <Timeline>
              <TimelineItem isEnlargeLink>
                <TimelineItemTitle>
                  <NextLinkOrA href="#">Je me pose des questions</NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  Je m'interroge sur mes comportements ou mes ressentis. Je souhaite repérer des signes qui pourraient
                  relever d'un trouble du neurodéveloppement comme l'autisme.
                </TimelineDescription>
              </TimelineItem>
              <TimelineItem isEnlargeLink>
                <TimelineItemTitle>
                  <NextLinkOrA href="/mon-diagnostic">Je démarre un diagnostic</NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  Je consulte un professionnel de santé et selon son avis médical le parcours de diagnostic peut
                  démarrer.
                </TimelineDescription>
              </TimelineItem>
              <TimelineItem isEnlargeLink>
                <TimelineItemTitle>
                  <NextLinkOrA href="#">Je prends connaissance de mes aides</NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  Le site de service public Mes Droits Sociaux vous permet d'accéder à un formulaire de simulation des
                  aides auxquelles vous pouvez prétendre, selon votre situation personnelle et familiale.
                </TimelineDescription>
              </TimelineItem>
              <TimelineItem isEnlargeLink>
                <TimelineItemTitle>
                  <NextLinkOrA href="#">Je sollicite la MDPH et je dépose un dossier</NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  Lorsque mon enfant ou mon proche a finalisé son parcours de diagnostic et qu'il conclut à un TSA, je
                  m'adresse à la Maison Départementale des Personnes Handicapées et je dépose un dossier.
                </TimelineDescription>
              </TimelineItem>

              <TimelineItem isEnlargeLink>
                <TimelineItemTitle>
                  <NextLinkOrA href="#">
                    Je prends connaissances des nouvelles aides disponible suite à la réponse de la MDPH
                  </NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  Suite au retour de la MDPH, selon ma situation familiale de nouvelles aides sont maintenant
                  disponibles pour moi et mon enfant.
                </TimelineDescription>
              </TimelineItem>

              <TimelineItem
                footer={
                  <ul>
                    <li>
                      <TimelineItemFooterLink href="#">Étudier</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="#">Travailler</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="#">Se soigner</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="#"> Se déplacer</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="#">Se loger</TimelineItemFooterLink>
                    </li>

                    <li>
                      <TimelineItemFooterLink href="#">Partir en vacances, avoir des loisir</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="#">
                        Tisser du lien amical, amoureux et familial
                      </TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="#">Être protégé</TimelineItemFooterLink>
                    </li>
                  </ul>
                }
              >
                <TimelineItemTitle>Je mène à bien les différentes étapes de ma vie</TimelineItemTitle>
                <TimelineDescription>
                  Plusieurs étapes clés sont à réaliser pour mener sa vie de la manière la plus autonome possible.
                </TimelineDescription>
              </TimelineItem>
            </Timeline>
          </GridCol>
          <Tiles />
        </Grid>
      </Container>
    </section>
  );
};

export default MonParcoursAidant;
