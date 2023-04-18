import { type Next13ServerPageProps } from "@common/utils/next13";
import { ActionsButtons } from "@components/base/client/ActionsButtons";
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
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineItemFooterLink,
  TimelineItemTitle,
} from "@design-system";
import { NextLinkOrA } from "@design-system/utils/NextLinkOrA";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";
import { notFound } from "next/navigation";

export type ParcoursProps = Next13ServerPageProps<"slug">;

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata({ params }: ParcoursProps) {
    const strapiData = (
      await fetchStrapi("parcourss", {
        filters: {
          slug: {
            $eq: params.slug,
          },
        },
      })
    ).data?.[0];

    return {
      title: strapiData?.attributes.title as string,
      slug: `mon-parcours/${params.slug}`,
    };
  },
});

export async function generateStaticParams() {
  const parcours = (await fetchStrapi("parcourss")).data ?? [];

  return parcours.map(p => ({
    slug: p.attributes.slug,
  }));
}

const MonParcoursSlugPage = async ({ params }: ParcoursProps) => {
  const currentParcours = await fetchStrapi("parcourss", {
    populate: "deep",
    filters: {
      slug: {
        $eq: params.slug,
      },
    },
  }).then(response => {
    if (response.data?.[0]) {
      return response.data?.[0];
    }
    notFound();
  });

  return (
    <section className="fr-py-6w fr-py-md-12w">
      <Container>
        <Grid haveGutters justifyCenter>
          <GridCol md={10} lg={8}>
            <ActionsButtons />
            <h1>{currentParcours.attributes.title}</h1>
            <div className="fr-text--xl">
              <Markdown>{currentParcours.attributes.description}</Markdown>
            </div>
          </GridCol>
          <GridCol md={10} lg={6}>
            <Timeline>
              {(currentParcours.attributes.items ?? [])
                .filter(({ timeline }) => timeline)
                .sort((a, b) => a.order - b.order)
                .map(item => {
                  const { links = [] } = item;
                  const [link] = links;
                  const hasOneLink = link && links?.length === 1;
                  return (
                    <TimelineItem
                      isEnlargeLink={hasOneLink}
                      key={item.id}
                      footer={
                        links.length > 1 && (
                          <ul>
                            {links.map(l => {
                              return (
                                <li key={l.id}>
                                  <TimelineItemFooterLink href={l.url}>{l.text}</TimelineItemFooterLink>
                                </li>
                              );
                            })}
                          </ul>
                        )
                      }
                    >
                      <TimelineItemTitle>
                        {hasOneLink ? <NextLinkOrA href={link.url}>{item.title}</NextLinkOrA> : item.title}
                      </TimelineItemTitle>
                      <TimelineDescription>
                        <Markdown disallowedElements={["a"]} unwrapDisallowed={true}>
                          {item.description}
                        </Markdown>
                      </TimelineDescription>
                    </TimelineItem>
                  );
                })}
            </Timeline>
          </GridCol>
          <GridCol md={10} lg={8} className="fr-mt-4w">
            <Grid as="ul" haveGutters>
              {(currentParcours.attributes.items ?? [])
                .filter(({ timeline }) => !timeline)
                .sort((a, b) => a.order - b.order)
                .map(item => {
                  const { links: [link] = [] } = item;
                  return (
                    <GridCol as="li" md={6} key={item.id}>
                      <Card isEnlargeLink>
                        <CardBody>
                          <CardBodyContent>
                            <CardBodyContentTitle titleAs="h2">
                              {link ? <NextLinkOrA href={link.url}>{item.title}</NextLinkOrA> : item.title}
                            </CardBodyContentTitle>
                            <CardBodyContentDescription>
                              <Markdown disallowedElements={["a"]} unwrapDisallowed={true}>
                                {item.description}
                              </Markdown>
                            </CardBodyContentDescription>
                          </CardBodyContent>
                        </CardBody>
                      </Card>
                    </GridCol>
                  );
                })}
            </Grid>
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
};

export default MonParcoursSlugPage;
