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

const title = "Fiches pratiques";
const slug = "fiches-pratiques";

export const generateMetadata = generateMetadataFactory({
  resolveMetadata: () => ({
    title,
    slug,
  }),
});

const FichesPratiquesPage = async () => {
  const fiches = await fetchStrapi("fiche-pratiques", {
    populate: "recap",
    sort: "id",
  }).then(responses => responses.data ?? []);
  console.log("fiches", fiches);
  fiches.unshift({
    id: 0,
    attributes: {
      title: "Glossaire",
      slug: "/glossaire",
      excerpt: "Retrouvez le glossaire des termes administratifs et médicaux liés aux troubles autistiques",
      createdAt: "2023-01-29T18:45:42.279Z",
      updatedAt: "2023-06-06T08:13:36.448Z",
      recap: { id: 0, title: "Glossaire", content: "xxx" },
    },
  });
  return (
    <section className="fr-py-6w fr-py-md-12w">
      <Container>
        <h1>{title}</h1>
        <Grid as="ul" haveGutters>
          {fiches.map(fiche => {
            if (!fiche.attributes.slug) return;
            return (
              <GridCol as="li" md={6} lg={4} key={fiche.id}>
                <Card isEnlargeLink>
                  <CardBody>
                    <CardBodyContent>
                      <CardBodyContentTitle titleAs="h3">
                        <NextLinkOrA
                          href={
                            fiche.attributes.slug.startsWith("/")
                              ? fiche.attributes.slug
                              : `/${slug}/${fiche.attributes.slug}`
                          }
                        >
                          {fiche.attributes.title}
                        </NextLinkOrA>
                      </CardBodyContentTitle>
                      {fiche.attributes.excerpt && (
                        <CardBodyContentDescription>
                          <Markdown>{fiche.attributes.excerpt}</Markdown>
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

export default FichesPratiquesPage;
