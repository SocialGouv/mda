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
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

const title = "Mon parcours";
const slug = "mon-parcours";

export const generateMetadata = generateMetadataFactory({
  resolveMetadata: () => ({
    title,
    slug,
  }),
});

const MonParcoursPage = async () => {
  const pageData = await fetchStrapi("parcourss", { sort: "id" });
  const data = pageData.data || [];

  return (
    <section className="fr-py-6w fr-py-md-12w">
      <Container>
        <h1>{title}</h1>
        <Grid as="ul" haveGutters>
          {data.map(parcours => (
            <GridCol as="li" key={parcours.id} lg={6}>
              <Card isEnlargeLink>
                <CardBody>
                  <CardBodyContent>
                    <CardBodyContentTitle titleAs="h3">
                      <NextLinkOrA href={`/${slug}/${parcours.attributes.slug}`}>
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

export default MonParcoursPage;
