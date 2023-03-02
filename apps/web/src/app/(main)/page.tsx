import { config } from "@common/config";
import { PictoDocumentDownload } from "@components/pictos/PictoDocumentDownload";
import { PictoHealth } from "@components/pictos/PictoHealth";
import { PictoHumanCooperation } from "@components/pictos/PictoHumanCooperation";
import { PictoMap } from "@components/pictos/PictoMap";
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
import { NextLinkOrA } from "@design-system/utils/NextLinkOrA";
import { fetchStrapi } from "@services/strapi";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import mdaPic from "../../../public/mda.jpg";
import styles from "./index.module.css";

const HomePage = async () => {
  const strapiData = await fetchStrapi("accueil", {
    populate: "links,MDA_img",
    sort: "id",
  });

  const data = strapiData.data?.attributes;
  const homeImgPath = data?.MDA_img?.data?.attributes.url;
  const homeImgSrc = homeImgPath ? new URL(homeImgPath, config.strapi.apiUrl).toString() : "/home-hero.jpeg";

  return (
    <>
      <section>
        <div className={`${styles.hero} fr-py-6w fr-py-md-12w`}>
          <Container>
            <Grid haveGutters>
              <GridCol lg={7}>
                {data?.title && <h1>{data.title}</h1>}
                {data?.content && <ReactMarkdown>{data.content}</ReactMarkdown>}
                {data?.links && (
                  <ButtonGroup inline="mobile-up">
                    {data.links.map((link, index) => (
                      <ButtonGroupItem key={index}>
                        <ButtonAsLink variant={link.theme} href={link.href}>
                          {link.text}
                        </ButtonAsLink>
                      </ButtonGroupItem>
                    ))}
                  </ButtonGroup>
                )}
              </GridCol>
              <GridCol md={6} lg={5} className="fr-mx-auto">
                <Image className="fr-fluid-img" src={homeImgSrc} alt="" width={486} height={324} />
              </GridCol>
            </Grid>
          </Container>
        </div>
        <div className="fr-pt-6w fr-pt-md-8w">
          <Container>
            <h2>Démarches et outils</h2>
            <Grid as="ul" haveGutters>
              <GridCol as="li" lg={6}>
                <Tile>
                  <TileBody>
                    <TileBodyTitle href="/mon-parcours" titleAs="h3">
                      Mon parcours
                    </TileBodyTitle>
                    <TileBodyDescription>
                      En tant que personne autiste, parent ou aidant, plusieurs étapes clés sont à réaliser pour mener
                      sa vie de la manière la plus autonome possible.
                    </TileBodyDescription>
                  </TileBody>
                  <TileImg>
                    <PictoMap />
                  </TileImg>
                </Tile>
              </GridCol>
              <GridCol as="li" lg={6}>
                <Tile>
                  <TileBody>
                    <TileBodyTitle href="/modeles-de-courrier" titleAs="h3">
                      Modèles de courrier
                    </TileBodyTitle>
                    <TileBodyDescription>
                      Une demande d'aide ? Un recours ? La saisie d'un médiateur ? Nous vous proposons dans cette
                      rubrique une banque de courrier type à utiliser pour vos démarches.
                    </TileBodyDescription>
                  </TileBody>
                  <TileImg>
                    <PictoDocumentDownload />
                  </TileImg>
                </Tile>
              </GridCol>
              <GridCol as="li" lg={6}>
                <Tile>
                  <TileBody>
                    <TileBodyTitle href="/mes-aides" titleAs="h3">
                      Mes aides
                    </TileBodyTitle>
                    <TileBodyDescription>
                      Selon votre situation, celle de enfant ou de votre proche, des ressources sont disponibles pour
                      vous aider au quotidien.
                    </TileBodyDescription>
                  </TileBody>
                  <TileImg>
                    <PictoHumanCooperation />
                  </TileImg>
                </Tile>
              </GridCol>
              <GridCol as="li" lg={6}>
                <Tile>
                  <TileBody>
                    <TileBodyTitle href="/mon-diagnostic" titleAs="h3">
                      Mon diagnostic
                    </TileBodyTitle>
                    <TileBodyDescription>
                      Le diagnostic est une suite de rendez-vous médicaux qui se réalise auprès de plusieurs
                      professionnels de santé. Cliquez ici pour comprendre comment mener votre diagnostic étape par
                      étape.
                    </TileBodyDescription>
                  </TileBody>
                  <TileImg>
                    <PictoHealth />
                  </TileImg>
                </Tile>
              </GridCol>
            </Grid>
            <h2 className="fr-mt-8w fr-mt-md-12w">Fiches pratiques les plus lues</h2>
            <Grid as="ul" haveGutters>
              <GridCol as="li" md={6} lg={4}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h3">
                        <NextLinkOrA href="/fiches-pratiques/qu-est-ce-que-l-autisme">
                          Qu'est ce que l'autisme&nbsp;?
                        </NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        L’autisme est un trouble du neurodéveloppement (TND) précoce qui impacte les capacités de
                        communication, les interactions sociales et les comportements des personnes.
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
              <GridCol as="li" md={6} lg={4}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h3">
                        <NextLinkOrA href="/fiches-pratiques/plateforme-coordination-et-d-orientation">
                          Plateforme Coordination et d’Orientation (PCO)
                        </NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Les plateformes de coordination et d’orientation (PCO) pour suspicion de troubles du
                        neurodéveloppement (TND) s’adressent aux enfants de 0 à 12 ans pour qu’ils bénéficient,
                        gratuitement et sans tarder, d’un parcours de soins.
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
              <GridCol as="li" md={6} lg={4}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h3">
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
              <GridCol as="li" md={6} lg={4}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h3">
                        <NextLinkOrA href="/fiches-pratiques/dossier-mdph">Dossier MDPH</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Pour obtenir la reconnaissance de votre handicap et le soutien nécessaire à la gestion de votre
                        quotidien, il est nécessaire de connaître les aides et les orientations auxquelles vous pouvez
                        prétendre.
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
              <GridCol as="li" md={6} lg={4}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h3">
                        <NextLinkOrA href="/fiches-pratiques/acteurs-et-organismes">Acteurs et organismes</NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Il existe plusieurs acteurs et organismes qui interviennent dans le secteur de l’autisme.
                        Aujourd’hui, en France, ils accompagnent les personnes autistes dans leur quotidien.
                      </CardBodyContentDescription>
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
              <GridCol as="li" md={6} lg={4}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h3">
                        <NextLinkOrA href="/fiches-pratiques/je-cherche-des-groupes-d-entraide">
                          Je cherche des groupes d'entraide
                        </NextLinkOrA>
                      </CardBodyContentTitle>
                      <CardBodyContentDescription>
                        Le partage d’expériences similaires peut constituer une véritable aide pour les personnes
                        concernées ou pour leurs proches.
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
              <Image className="fr-fluid-img" src={mdaPic} alt="" width={441} height={291} placeholder="blur" />
            </GridCol>
            <GridCol lg={7} className="fr-pt-2w fr-pt-lg-6w fr-pl-lg-4w">
              {data?.MDA_title && <h2 className="fr-h1">{data.MDA_title}</h2>}
              {data?.MDA_subtitle && <p className="fr-text--lg fr-text--bold">{data.MDA_subtitle}</p>}
              {data?.MDA_content && <ReactMarkdown>{data.MDA_content}</ReactMarkdown>}
              {data?.MDA_link_text && (
                <div className="fr-mt-4w">
                  <ButtonAsLink href="/la-maison-de-l-autisme">{data.MDA_link_text}</ButtonAsLink>
                </div>
              )}
            </GridCol>
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
