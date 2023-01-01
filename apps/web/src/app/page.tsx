import { Box, ButtonAsLink, Container, Grid, GridCol, ImgHome } from "@design-system";
import { fetchStrapi } from "@services/strapi";
import { Suspense } from "react";
import ReactMarkdown from "react-markdown";

import styles from "./index.module.css";

const HeroMain = async () => <ReactMarkdown>{(await fetchStrapi("home-hero")).content ?? ""}</ReactMarkdown>;

const HomePage = () => {
  return (
    <section>
      <Box pt="9w" pb="4w" className={styles.hero}>
        <Container>
          <Grid haveGutters>
            <GridCol lg={7}>
              <h1>Qu'est-ce que l'autisme ?</h1>
              <Suspense>
                {/* @ts-expect-error Server Component */}
                <HeroMain />
              </Suspense>
              <ButtonAsLink href="#">Comprendre l'austisme</ButtonAsLink>&nbsp;
              <ButtonAsLink variant="secondary" target="_blank" href="https://handicap.gouv.fr/la-maison-de-lautisme">
                J'ai un doute
              </ButtonAsLink>
            </GridCol>
            <GridCol md={6} lg={5} className="fr-mx-auto">
              <ImgHome />
            </GridCol>
          </Grid>
        </Container>
      </Box>
    </section>
  );
};

export default HomePage;
