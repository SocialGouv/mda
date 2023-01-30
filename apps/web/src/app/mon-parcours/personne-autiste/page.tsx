import { ActionsButtons } from "@components/base/client/ActionsButtons";
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
            <ActionsButtons />
            <h1>Mon parcours de personne autiste</h1>
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
                  <NextLinkOrA href="/fiches-pratiques/je-m-interroge-envers-moi-meme">
                    Je me pose des questions
                  </NextLinkOrA>
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
                  <NextLinkOrA href="/mes-aides">Je prends connaissance de mes aides</NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  Je peux bénéficier d’aides financières, matérielles et humaines, même si je n'ai pas encore de
                  diagnostic.
                </TimelineDescription>
              </TimelineItem>
              <TimelineItem isEnlargeLink>
                <TimelineItemTitle>
                  <NextLinkOrA href="fiches-pratiques/je-sollicite-la-mdph-et-je-monte-un-dossier">
                    Je sollicite la MDPH et je dépose un dossier
                  </NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  Lorsque j'ai finalisé mon parcours de diagnostic et qu'il conclut à un TSA, je m'adresse à la Maison
                  Départementale des Personnes Handicapées et je dépose un dossier.
                </TimelineDescription>
              </TimelineItem>
              <TimelineItem isEnlargeLink>
                <TimelineItemTitle>
                  <NextLinkOrA href="/mes-aides">Je prends connaissance des nouvelles aides</NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  Lorsque j'ai reçu une réponse de la Maison Départementale des Personnes Handicapées suite au dépôt de
                  mon dossier, je peux bénéficier de nouvelles aides.
                </TimelineDescription>
              </TimelineItem>

              <TimelineItem
                footer={
                  <ul>
                    <li>
                      <TimelineItemFooterLink href="/fiches-pratiques/etudier-du-college-aux-etudes-superieures">
                        Étudier
                      </TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="/fiches-pratiques/personne-tsa-travailler">
                        Travailler
                      </TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="/fiches-pratiques/se-soigner">Se soigner</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="/fiches-pratiques/se-deplacer"> Se déplacer</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="/fiches-pratiques/se-loger">Se loger</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="/fiches-pratiques/partir-en-vacances">
                        Partir en vacances
                      </TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="fiches-pratiques/avoir-des-loisirs">
                        Avoir des loisirs
                      </TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="/fiches-pratiques/tisser-du-lien-amical-amoureux-et-familial">
                        Tisser du lien amical, amoureux et familial
                      </TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="/fiches-pratiques/etre-protege">
                        Être protégé
                      </TimelineItemFooterLink>
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
