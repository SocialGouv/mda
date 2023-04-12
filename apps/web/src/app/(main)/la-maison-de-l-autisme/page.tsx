import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Markdown } from "@components/utils/Markdown";
import {
  Card,
  CardBody,
  CardBodyContent,
  CardBodyContentDescription,
  CardBodyContentTitle,
  CardBodyFooter,
  Grid,
  GridCol,
  Link,
  LinkGroup,
  LinkGroupItem,
} from "@design-system";
import { CollapsedSectionDynamicGroup } from "@design-system/client";
import { fetchStrapi } from "@services/strapi";

const getData = async () => {
  const res = fetchStrapi("maison-de-l-autisme", { populate: "sections,events", sort: "id" });
  return res;
};

export const generateMetadata = async () => {
  const strapiData = await getData();
  return { title: strapiData.data?.attributes.title };
};

const AutismHouse = async () => {
  const strapiData = await getData();
  const data = strapiData.data?.attributes;
  const now = new Date();
  const events = data?.events?.data ?? [];
  const currentEvents = events.filter(
    e => new Date(e.attributes.start_date) <= now && new Date(e.attributes.end_date) > now,
  );
  const upcomingEvents = events
    .filter(e => new Date(e.attributes.start_date) > now)
    .map(event => {
      const {
        attributes: { title, description, start_date, end_date, connection_link },
      } = event;

      const body = encodeURIComponent(description ? description + "\n\n" + connection_link : connection_link);

      return {
        ...event,
        googleLink: `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start_date.replace(
          /[-:]/g,
          "",
        )}/${end_date.replace(/[-:]/g, "")}&details=${body}&output=xml`,
        outlookLink: `https://outlook.office.com/calendar/0/deeplink/compose?subject=${title}&body=${body}&startdt=${start_date}&enddt=${end_date}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent`,
      };
    });

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
      <h2 className="fr-mt-6w" id="events">
        Évènements
      </h2>
      {!!currentEvents.length && (
        <>
          <h3 className="fr-mt-4w">En cours</h3>
          <Grid as="ul" haveGutters>
            {currentEvents.map(event => {
              return (
                <GridCol as="li" md={6} key={event.id}>
                  <Card isEnlargeLink>
                    <CardBody>
                      <CardBodyContent>
                        <CardBodyContentTitle titleAs="h2">
                          <a
                            className="fr-no-external-icon"
                            href={event.attributes.connection_link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {event.attributes.title}
                          </a>
                        </CardBodyContentTitle>
                        <CardBodyContentDescription>
                          {event.attributes.description && (
                            <Markdown disallowedElements={["a"]} unwrapDisallowed={true}>
                              {event.attributes.description}
                            </Markdown>
                          )}
                        </CardBodyContentDescription>
                      </CardBodyContent>
                    </CardBody>
                  </Card>
                </GridCol>
              );
            })}
          </Grid>
        </>
      )}

      {!!upcomingEvents.length && (
        <>
          <h3 className="fr-mt-4w">À venir</h3>
          <Grid as="ul" haveGutters>
            {upcomingEvents.map(event => {
              return (
                <GridCol as="li" md={6} key={event.id}>
                  <Card>
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
                      </CardBodyContent>
                      <CardBodyFooter>
                        <LinkGroup>
                          <LinkGroupItem>
                            <Link
                              iconLeft="fr-icon-calendar-line"
                              href={event.googleLink}
                              title="Ajouter à Google Calendar"
                              target="_blank"
                            >
                              Google
                            </Link>
                          </LinkGroupItem>
                          <LinkGroupItem>
                            <Link
                              iconLeft="fr-icon-calendar-line"
                              href={event.outlookLink}
                              title="Ajouter à Outlook"
                              target="_blank"
                            >
                              Outlook
                            </Link>
                          </LinkGroupItem>
                        </LinkGroup>
                      </CardBodyFooter>
                    </CardBody>
                  </Card>
                </GridCol>
              );
            })}
          </Grid>
        </>
      )}

      {!currentEvents.length && !upcomingEvents.length && <p>Il n'y a aucun évènement en cours ou à venir</p>}
    </SimpleContentPage>
  );
};

export default AutismHouse;
