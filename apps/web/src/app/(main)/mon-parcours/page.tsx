import { Markdown } from "@components/utils/Markdown";
import {
  Card,
  CardBody,
  CardBodyContent,
  CardBodyContentDescription,
  CardBodyContentTitle,
  Container,
  Grid,
  GridCol,
} from "@design-system";
import { NextLinkOrA } from "@design-system/utils/NextLinkOrA";
import { fetchStrapi } from "@services/strapi";

const MonParcours = async () => {
  const strapiData = await fetchStrapi("parcourss", { sort: "id" });
  const data = strapiData.data || [];

  return (
    <section className="fr-py-6w fr-py-md-12w">
      <Container>
        <h1>Mon parcours</h1>
        <Grid as="ul" haveGutters>
          {data.map(parcours => (
            <GridCol as="li" key={parcours.id} lg={6}>
              <Card isEnlargeLink>
                <CardBody>
                  <CardBodyContent>
                    <CardBodyContentTitle titleAs="h3">
                      <NextLinkOrA href={`/mon-parcours/${parcours.attributes.slug}`}>
                        {parcours.attributes.title}
                      </NextLinkOrA>
                    </CardBodyContentTitle>
                    <CardBodyContentDescription>
                      <Markdown disallowedElements={["a"]} unwrapDisallowed={true}>
                        {parcours.attributes.description}
                      </Markdown>
                    </CardBodyContentDescription>
                  </CardBodyContent>
                </CardBody>
              </Card>
            </GridCol>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default MonParcours;
