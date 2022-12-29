import { Box, ButtonAsLink, Container, Grid, GridCol, ImgHome } from "@design-system";

import styles from "./index.module.css";

const HomePage = () => {
  return (
    <section>
      <Box pt="9w" pb="4w" className={styles.hero}>
        <Container>
          <Grid haveGutters>
            <GridCol lg={7}>
              <h1>Qu'est-ce que l'autisme ?</h1>
              <p>
                L’autisme est un trouble du neuro-développement précoce, qui impacte les capacités de communication, les
                interactions sociales et les comportements des personnes. Ce trouble va souvent de pair avec d’autres
                manifestations : hyper ou hypo sensibilité aux sons, lumières, odeur... , trouble du déficit de
                l’attention avec ou sans hyperactivité (TDAH), troubles “dys” (dyslexie, dyspraxie, dysphasie,...).
              </p>
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
