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
                  <NextLinkOrA href="/fiches-pratiques/je-sollicite-la-mdph-et-je-monte-un-dossier">
                    Je sollicite la MDPH et je dépose un dossier
                  </NextLinkOrA>
                </TimelineItemTitle>
                <TimelineDescription>
                  Lorsque j'ai finalisé mon parcours de diagnostic et qu'il conclut à des Troubles du Spectre de
                  l'Autisme, je m'adresse à la Maison Départementale des Personnes Handicapées et je dépose un dossier.
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
          <GridCol md={10} lg={8} className="fr-mt-4w">
            <Grid haveGutters>
              <GridCol md={6}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h2">
                        <NextLinkOrA href="/la-maison-de-l-autisme"> La Maison de l'autisme physique</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        La Maison de l’autisme n’est plus un projet, c’est une réalité. Elle se poursuit avec vous. Elle
                        a hâte de vous accueillir à Aubervilliers et en ligne dès avril prochain.
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
              <GridCol md={6}>
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
              <GridCol md={6}>
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
