import { Container, Grid, GridCol } from "@design-system";

const Directory = () => {
  return (
    <section>
      <Container className="fr-py-6w fr-py-md-12w">
        <Grid justifyCenter>
          <GridCol md={10} lg={8}>
            <h1>Annuaire</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odit ipsam doloribus beatae, alias
              excepturi incidunt ullam, tempora voluptates voluptatibus sit dicta dignissimos, cum expedita aut
              molestias a perferendis distinctio!
            </p>
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
};

export default Directory;
