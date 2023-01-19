import {
  ButtonAsLink,
  ButtonGroup,
  ButtonGroupItem,
  Card,
  CardBody,
  CardBodyContent,
  CardBodyContentDescription,
  CardBodyContentTitle,
  Container,
  Grid,
  GridCol,
  Tile,
  TileBody,
  TileBodyDescription,
  TileBodyTitle,
  TileImg,
} from "@design-system";
import { fetchStrapi } from "@services/strapi";
import ReactMarkdown from "react-markdown";
import { PlaceholderImg } from "src/design-system/base/ImgPlaceholder";
import { NextLinkOrA } from "src/design-system/utils/NextLinkOrA";

import styles from "./index.module.css";

const HeroMain = async () => <ReactMarkdown>{(await fetchStrapi("home-hero")).content ?? ""}</ReactMarkdown>;

const HomePage = () => {
  return (
    <>
      <section>
        <div className={`${styles.hero} fr-py-6w fr-py-md-12w`}>
          <Container>
            <Grid haveGutters>
              <GridCol lg={7}>
                <h1>Qu'est-ce que l'autisme&nbsp;?</h1>
                {/* @ts-expect-error Server Component */}
                <HeroMain />
                <ButtonGroup inline="mobile-up">
                  <ButtonGroupItem>
                    <ButtonAsLink href="/fiches-pratiques/qu-est-ce-que-l-autisme">Comprendre l'austisme</ButtonAsLink>
                  </ButtonGroupItem>
                  <ButtonGroupItem>
                    <ButtonAsLink variant="secondary" href="#">
                      J'ai un doute
                    </ButtonAsLink>
                  </ButtonGroupItem>
                </ButtonGroup>
              </GridCol>
              <GridCol md={6} lg={5} className="fr-mx-auto">
                <PlaceholderImg />
              </GridCol>
            </Grid>
          </Container>
        </div>
        <div className="fr-pt-6w fr-pt-md-8w">
          <Container>
            <h2>Démarches et outils</h2>
            <Grid haveGutters>
              <GridCol lg={6}>
                <Tile>
                  <TileBody>
                    <TileBodyTitle href="/mon-parcours" titleAs="h3">
                      Mon parcours
                    </TileBodyTitle>
                    <TileBodyDescription>
                      En tant que personne autiste ou parent d'enfant autiste, une série de démarches est à réaliser pas
                      à pas pour pouvoir être pris en charge et mener sa vie de la manière la plus autonome possible.
                    </TileBodyDescription>
                  </TileBody>
                  <TileImg>
                    <PlaceholderImg />
                  </TileImg>
                </Tile>
              </GridCol>
              <GridCol lg={6}>
                <Tile>
                  <TileBody>
                    <TileBodyTitle href="#" titleAs="h3">
                      Modèles de courrier
                    </TileBodyTitle>
                    <TileBodyDescription>
                      Une demande d'aide ? Un recours ? La saisie d'un médiateur ? Nous vous proposons dans cette
                      rubrique une banque de courrier type à utiliser pour vos démarches.
                    </TileBodyDescription>
                  </TileBody>
                  <TileImg>
                    <PlaceholderImg />
                  </TileImg>
                </Tile>
              </GridCol>
              <GridCol lg={6}>
                <Tile>
                  <TileBody>
                    <TileBodyTitle href="#" titleAs="h3">
                      Mes aides
                    </TileBodyTitle>
                    <TileBodyDescription>
                      Selon votre situation, plusieurs aides sont disponibles afin d'aider votre enfant et votre famille
                      au quotidien.
                    </TileBodyDescription>
                  </TileBody>
                  <TileImg>
                    <PlaceholderImg />
                  </TileImg>
                </Tile>
              </GridCol>
              <GridCol lg={6}>
                <Tile>
                  <TileBody>
                    <TileBodyTitle href="#" titleAs="h3">
                      Mon diagnostic
                    </TileBodyTitle>
                    <TileBodyDescription>
                      Le diagnostic est une suite de rendez-vous médicaux qui se réalise auprès de plusieurs
                      professionnels de santé. Cliquez ici pour comprendre comment mener votre diagnostic étape par
                      étape.
                    </TileBodyDescription>
                  </TileBody>
                  <TileImg>
                    <PlaceholderImg />
                  </TileImg>
                </Tile>
              </GridCol>
            </Grid>
            <h2 className="fr-mt-8w fr-mt-md-12w">Fiches pratiques les plus lues</h2>
            <Grid haveGutters>
              <GridCol md={6} lg={4}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h3">
                        <NextLinkOrA href="#">Dossier MDPH</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Le dossier MDPH est une étape incontournable du parcours d'une personne autiste. Retrouvez ici
                        toutes les informations pratiques pour compléter ce dossier.
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
              <GridCol md={6} lg={4}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h3">
                        <NextLinkOrA href="#">Démarches de la vie quotidienne</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Scolarisation, études supérieures, transport, logement, emploi ... cette rubrique partage les
                        grandes étapes de la vie d'une personne autiste et les démarches associées.
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
              <GridCol md={6} lg={4}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h3">
                        <NextLinkOrA href="#">Méthodes pédagogiques et communicationnelles</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Vous trouverez dans cette rubrique des fiches pratiques sur les méthodes pédagogiques et
                        communicationnelles pour vous aider au quotidien avec votre enfant.
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
              <GridCol md={6} lg={4}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h3">
                        <NextLinkOrA href="#">Groupes d'entraides</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Souvent implantés au cœur de la ville, ils permettent de se retrouver, de s’entraider,
                        d’organiser des activités visant au développement personnel, de passer des moments conviviaux et
                        de créer des liens.
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
              <GridCol md={6} lg={4}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h3">
                        <NextLinkOrA href="#">Formations certifiantes</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        En ligne ou en présentiel, cette rubrique référence une large variété de formations spécialisées
                        sur les Troubles du Neuro-Développement et le Trouble du Spectre Autistique.
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
              <GridCol md={6} lg={4}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h3">
                        <NextLinkOrA href="#">Solutions de répit</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        En ligne ou en présentiel, cette rubrique référence une large variété de formations spécialisées
                        sur les Troubles du Neuro-Développement et le Trouble du Spectre Autistique.
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
            </Grid>
            <div className="fr-mt-4w fr-mt-md-6w fr-text-center">
              <ButtonAsLink href="/fiches-pratiques" variant="secondary">
                Voir toutes les fiches pratiques
              </ButtonAsLink>
            </div>
          </Container>
        </div>
      </section>
      <section className="fr-py-8w fr-py-md-12w">
        <Container>
          <Grid haveGutters>
            <GridCol lg={5}>
              <PlaceholderImg />
            </GridCol>
            <GridCol lg={7} className="fr-pt-2w fr-pt-lg-6w fr-pl-lg-4w">
              <h2 className="fr-h1">La maison de l’autisme</h2>
              <p className="fr-text--lg fr-text--bold">
                La Maison de l'autisme sera située 10 rue Waldeck Rochet à Aubervilliers, en Seine-Saint-Denis. Les
                services du département de la Seine-Saint-Denis et la RATP faciliteront l'accès à la Maison de
                l'autisme.
              </p>
              <p>
                La Maison de l’autisme permettra d’accéder facilement et de manière simple à des ressources humaines,
                matérielles et immatérielles. La Maison de l'autisme sera dans un premier temps animée par trois acteurs
                : le Groupement National des Centres Ressources Autisme (GNCRA), Centre Ressources Autisme Île-de-France
                (CRAIF) et Autisme Info Service. Par la suite, les associations volontaires pourront rejoindre cette
                initiative
              </p>
              <div className="fr-mt-4w">
                <ButtonAsLink href="#">En savoir plus</ButtonAsLink>
              </div>
            </GridCol>
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
