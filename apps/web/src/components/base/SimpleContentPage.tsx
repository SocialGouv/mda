import { Container, Grid, GridCol } from "@design-system";
import { type PropsWithChildren } from "react";

export const SimpleContentPage = ({ children }: PropsWithChildren) => (
  <section>
    <Container className="fr-py-6w fr-py-md-12w">
      <Grid justifyCenter>
        <GridCol md={10} lg={8}>
          {children}
        </GridCol>
      </Grid>
    </Container>
  </section>
);
