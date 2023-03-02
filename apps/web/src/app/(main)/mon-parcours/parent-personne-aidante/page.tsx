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
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineItemFooterLink,
  TimelineItemTitle,
} from "@design-system";
import { NextLinkOrA } from "@design-system/utils/NextLinkOrA";

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
                En tant que parent ou proche aidant, plusieurs étapes clés sont à réaliser pour accompagner votre enfant
                ou votre proche à mener sa vie de la manière la plus autonome possible. Quelque soit votre situation,
                retrouvez ci-dessous des contenus et outils de guidance pour vous aider à y voir plus clair sur le
                déroulé de ces grandes étapes.
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
                  Lorsque mon enfant ou mon proche a finalisé son parcours de diagnostic et qu'il conclut à des Troubles
                  du Spectre de l'Autisme, je m'adresse à la Maison Départementale des Personnes Handicapées et je
                  dépose un dossier.
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
          <GridCol md={10} lg={8} className="fr-mt-4w">
            <Grid as="ul" haveGutters>
              <GridCol as="li" md={6}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h2">
                        <NextLinkOrA href="/fiches-pratiques/je-demande-de-l-aide-a-mon-entourage">
                          Je demande de l'aide à mon entourage
                        </NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Demander de l'aide à son entourage est un réflexe important pour améliorer sa qualité de vie en
                        tant que parent, et faire face aux nombreux défis auxquels on se trouve confronté après le
                        diagnostic de son enfant.
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
                        <NextLinkOrA href="/fiches-pratiques/je-cherche-des-groupes-d-entraide">
                          Je cherche des groupes avec qui échanger
                        </NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Échanger avec des personnes permet de trouver du soutien, de rompre avec l’isolement, de mieux
                        comprendre la situation et de rechercher des solutions, mais également de valoriser votre
                        expérience.
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
                        <NextLinkOrA href="/annuaire">Annuaire</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Vous cherchez des contacts de confiance&nbsp;? Un établissement ou un organisme&nbsp;? Des
                        professionnels de santé&nbsp;? Une association&nbsp;?
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
