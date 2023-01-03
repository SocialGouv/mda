import { ButtonAsLink, ButtonGroup, Container, Grid, GridCol, ImgHome } from "@design-system";
import { fetchStrapi } from "@services/strapi";
import { Suspense } from "react";
import ReactMarkdown from "react-markdown";

import styles from "./index.module.css";

const HeroMain = async () => <ReactMarkdown>{(await fetchStrapi("home-hero")).content ?? ""}</ReactMarkdown>;

const HomePage = () => {
  return (
    <section>
      <div className={`${styles.hero} fr-py-6w fr-py-md-12w`}>
        <Container>
          <Grid haveGutters>
            <GridCol lg={7}>
              <h1>Qu'est-ce que l'autisme ?</h1>
              <Suspense>
                {/* @ts-expect-error Server Component */}
                <HeroMain />
              </Suspense>
              <ButtonGroup inline="mobile-up">
                <ButtonAsLink href="#">Comprendre l'austisme</ButtonAsLink>&nbsp;
                <ButtonAsLink variant="secondary" target="_blank" href="https://handicap.gouv.fr/la-maison-de-lautisme">
                  J'ai un doute
                </ButtonAsLink>
              </ButtonGroup>
            </GridCol>
            <GridCol md={6} lg={5} className="fr-mx-auto">
              <ImgHome />
            </GridCol>
          </Grid>
        </Container>
      </div>
    </section>
  );
};

export default HomePage;
