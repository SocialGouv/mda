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

const title = "Étapes de vie";
const slug = "parcours";

export const generateMetadata = generateMetadataFactory({
  resolveMetadata: () => ({
    title,
    slug,
  }),
});

const ParcoursPage = async () => {
  const etapes = await fetchStrapi("etape-de-vies", { populate: "recap", sort: "id" }).then(
    responses => responses.data ?? [],
  );

  return (
    <section className="fr-py-6w fr-py-md-12w">
      <Container>
        <h1>{title}</h1>
        <Grid as="ul" haveGutters>
          {etapes.map(etape => {
            if (!etape.attributes.slug) return;
            return (
              <GridCol as="li" md={6} lg={4} key={etape.id}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h3">
                        <NextLinkOrA href={`/${slug}/${etape.attributes.slug}`}>{etape.attributes.title}</NextLinkOrA>
                      </CardBodyContentTitle>
                      {etape.attributes.excerpt && (
                        <CardBodyContentDescription>
                          <Markdown>{etape.attributes.excerpt}</Markdown>
                        </CardBodyContentDescription>
                      )}
                    </CardBodyContent>
                  </CardBody>
                </Card>
              </GridCol>
            );
          })}
        </Grid>
      </Container>
    </section>
  );
};

export default ParcoursPage;
