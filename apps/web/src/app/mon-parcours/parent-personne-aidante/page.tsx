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
            <h1>Mon parcours de parent ou d'aidant</h1>
            <div className="fr-text--xl">
              <p>
                En tant que parent ou proche aidant, plusieurs étapes clés sont à réaliser pour accompagner votre proche
                à mener sa vie de la manière la plus autonome possible. Quelque soit votre situation, retrouvez
                ci-dessous des contenus et outils de guidance pour vous aider à y voir plus clair sur le déroulé de ces
                grandes étapes.
              </p>
            </div>
          </GridCol>
          <GridCol md={10} lg={6}>
            <Timeline>
              <TimelineItem isEnlargeLink>
                <TimelineItemTitle>
                  <NextLinkOrA href="/fiches-pratiques/je-m-interroge-sur-mon-enfant">
                    Je me pose des questions
                  </NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  Je m'interroge sur les comportements de mon enfant ou de mon proche. Je souhaite repérer des signes de
                  comportements ou de ressentis qui pourraient relever d'un trouble du neurodéveloppement comme
                  l'autisme.
                </TimelineDescription>
              </TimelineItem>
              <TimelineItem isEnlargeLink>
                <TimelineItemTitle>
                  <NextLinkOrA href="/mon-diagnostic">Je démarre un diagnostic</NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  J'accompagne mon enfant ou mon proche auprès d'un professionnel de santé et selon son avis médical le
                  parcours de diagnostic peut démarrer.
                </TimelineDescription>
              </TimelineItem>
              <TimelineItem isEnlargeLink>
                <TimelineItemTitle>
                  <NextLinkOrA href="/mes-aides">Je prends connaissance de mes aides</NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  Mon enfant ou mon proche peut bénéficier d’aides financières, matérielles et humaines, même s'ils
                  n'ont pas encore de diagnostic.
                </TimelineDescription>
              </TimelineItem>
              <TimelineItem isEnlargeLink>
                <TimelineItemTitle>
                  <NextLinkOrA href="/fiches-pratiques/je-sollicite-la-mdph-et-je-monte-un-dossier">
                    Je sollicite la MDPH et je dépose un dossier
                  </NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  Lorsque mon enfant ou mon proche a finalisé son parcours de diagnostic et qu'il conclut à un TSA, je
                  m'adresse à la Maison Départementale des Personnes Handicapées et je dépose un dossier.
                </TimelineDescription>
              </TimelineItem>

              <TimelineItem isEnlargeLink>
                <TimelineItemTitle>
                  <NextLinkOrA href="/mes-aides">Je prends connaissance des nouvelles aides</NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  Lorsque mon enfant ou mon proche ont reçu une réponse de la Maison Départementale des Personnes
                  Handicapées suite au dépôt de leur dossier, ils peuvent bénéficier de nouvelles aides.
                </TimelineDescription>
              </TimelineItem>

              <TimelineItem
                footer={
                  <ul>
                    <li>
                      <TimelineItemFooterLink title="Cette page est en cours de rédaction et sera prochainement disponible.">
                        Être scolarisé
                      </TimelineItemFooterLink>
                    </li>
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
                      <TimelineItemFooterLink href="/fiches-pratiques/se-loger">Logement</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink title="Cette page est en cours de rédaction et sera prochainement disponible.">
                        Travailler quand on est parent ou aidant
                      </TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="/fiches-pratiques/se-soigner">Se soigner</TimelineItemFooterLink>
                    </li>
                    <li>
                      <TimelineItemFooterLink href="/fiches-pratiques/se-deplacer">Se déplacer</TimelineItemFooterLink>
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
                      <TimelineItemFooterLink href="/fiches-pratiques/avoir-des-loisirs">
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
                        Mettre en place des mesures de protection
                      </TimelineItemFooterLink>
                    </li>
                  </ul>
                }
              >
                <TimelineItemTitle>J'accompagne mon enfant ou mon proche tout au long de sa vie</TimelineItemTitle>
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
