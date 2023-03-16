import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import {
  Card,
  CardBody,
  CardBodyContent,
  CardBodyContentDescription,
  CardBodyContentTitle,
  Grid,
  GridCol,
} from "@design-system";
import { CollapsedSectionDynamicGroup } from "@design-system/client";
import { fetchStrapi } from "@services/strapi";

const AutismHouse = async () => {
  const strapiData = await fetchStrapi("maison-de-l-autisme", { populate: "sections,events", sort: "id" });
  const data = strapiData.data?.attributes;
  const now = new Date();
  const events = data?.events?.data ?? [];
  const currentEvents = events.filter(
    e => new Date(e.attributes.start_date) <= now && new Date(e.attributes.end_date) > now,
  );
  const upcomingEvents = events.filter(e => new Date(e.attributes.start_date) > now);

  return (
    <SimpleContentPage>
      <ActionsButtons />
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && (
        <div className="fr-text--xl">
          <Markdown>{data.content}</Markdown>
        </div>
      )}
      {data?.sections && (
        <CollapsedSectionDynamicGroup
          data={
            data.sections.map((s, sectionIdx) => ({
              id: `section-${sectionIdx}`,
              title: s.title,
              content: <Markdown>{s.content}</Markdown>,
            })) ?? []
          }
        />
      )}
      <h2 id="events">Évènements</h2>
      {!!currentEvents.length && (
        <>
          <h3>En cours</h3>
          <Grid haveGutters justifyCenter>
            <GridCol md={10} lg={8} className="fr-mt-4w">
              <Grid as="ul" haveGutters>
                {currentEvents.map(event => {
                  return (
                    <GridCol as="li" md={6} key={event.id}>
                      <Card isEnlargeLink>
                        <CardBody>
                          <CardBodyContent>
                            <CardBodyContentTitle titleAs="h2">{event.attributes.title}</CardBodyContentTitle>
                            <CardBodyContentDescription>
                              {event.attributes.description && (
                                <Markdown disallowedElements={["a"]} unwrapDisallowed={true}>
                                  {event.attributes.description}
                                </Markdown>
                              )}
                            </CardBodyContentDescription>
                            {/* TODO: Connect me button */}
                          </CardBodyContent>
                        </CardBody>
                      </Card>
                    </GridCol>
                  );
                })}
              </Grid>
            </GridCol>
          </Grid>
        </>
      )}

      {!!upcomingEvents.length && (
        <>
          <h3>À venir</h3>
          <Grid haveGutters justifyCenter>
            <GridCol md={10} lg={8} className="fr-mt-4w">
              <Grid as="ul" haveGutters>
                {upcomingEvents.map(event => {
                  return (
                    <GridCol as="li" md={6} key={event.id}>
                      <Card isEnlargeLink>
                        <CardBody>
                          <CardBodyContent>
                            <CardBodyContentTitle titleAs="h2">{event.attributes.title}</CardBodyContentTitle>
                            <CardBodyContentDescription>
                              {event.attributes.description && (
                                <Markdown disallowedElements={["a"]} unwrapDisallowed={true}>
                                  {event.attributes.description}
                                </Markdown>
                              )}
                            </CardBodyContentDescription>
                            {/* TODO: Add to calendar buttons */}
                          </CardBodyContent>
                        </CardBody>
                      </Card>
                    </GridCol>
                  );
                })}
              </Grid>
            </GridCol>
          </Grid>
        </>
      )}

      {!currentEvents.length && !upcomingEvents.length && <p>Il n'y a aucun évènement en cours ou à venir</p>}
    </SimpleContentPage>
  );
};

export default AutismHouse;
