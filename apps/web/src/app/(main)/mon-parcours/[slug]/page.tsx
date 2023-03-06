import { type Next13ServerPageProps } from "@common/utils/next13";
import { ActionsButtons } from "@components/base/client/ActionsButtons";
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
import { fetchStrapi } from "@services/strapi";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export type ParcoursProps = Next13ServerPageProps<"slug">;

const Parcours = async ({ params }: ParcoursProps) => {
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
              <ReactMarkdown>{currentParcours.attributes.description}</ReactMarkdown>
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
                            {links.map(link => {
                              return (
                                <li key={link.id}>
                                  <TimelineItemFooterLink href={link.url}>{link.text}</TimelineItemFooterLink>
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
                        <ReactMarkdown disallowedElements={["a"]} unwrapDisallowed={true}>
                          {item.description}
                        </ReactMarkdown>
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
                              <ReactMarkdown disallowedElements={["a"]} unwrapDisallowed={true}>
                                {item.description}
                              </ReactMarkdown>
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

export async function generateStaticParams() {
  const fiches = (await fetchStrapi("parcourss")).data ?? [];

  return fiches.map(parcours => ({
    slug: parcours.attributes.slug,
  }));
}

export default Parcours;
