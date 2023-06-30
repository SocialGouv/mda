import { type Next13ServerPageProps } from "@common/utils/next13";
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
import { type DataWrapper } from "@mda/strapi-types";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

import { Tabs } from "./Tabs";

export type EvenementsProps = Next13ServerPageProps<"slug">;

export const generateMetadata = generateMetadataFactory({
  resolveMetadata() {
    return {
      description: "Évènements de la maison de l'Autisme",
      slug: "evenements",
      title: "Évènements",
    };
  },
});

const enrichEvent = (event: DataWrapper<"api::event.event">) => {
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
};

const EventsList = ({ events }: { events: Array<DataWrapper<"api::event.event">> }) => {
  return (
    <Grid as="ul" haveGutters>
      {events.map(originalEvent => {
        const event = enrichEvent(originalEvent);
        return (
          <GridCol as="li" key={event.id}>
            <Card>
              <CardBody>
                <CardBodyContent>
                  <CardBodyContentTitle titleAs="h2">{event.attributes.title}</CardBodyContentTitle>
                  <CardBodyContentDescription>
                    {event.attributes.description && <Markdown>{event.attributes.description}</Markdown>}
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
  );
};

const EventsPage = async () => {
  const eventsData = await fetchStrapi("events", {});

  const now = new Date();
  const events = eventsData?.data ?? [];
  const currentEvents = events.filter(
    e => new Date(e.attributes.start_date) <= now && new Date(e.attributes.end_date) > now,
  );
  const pastEvents = events.filter(
    e => new Date(e.attributes.start_date) < now && new Date(e.attributes.end_date) < now,
  );
  const upcomingEvents = events.filter(e => new Date(e.attributes.start_date) > now);

  const eventsTabs = [];

  if (upcomingEvents.length) {
    eventsTabs.push({
      label: "À venir",
      iconId: "fr-icon-add-line",
      content: <EventsList events={upcomingEvents} />,
    });
  }
  if (currentEvents.length) {
    eventsTabs.push({
      label: "En cours",
      iconId: "fr-icon-add-line",
      content: <EventsList events={currentEvents} />,
    });
  }
  if (pastEvents.length) {
    eventsTabs.push({
      label: "Passés",
      iconId: "fr-icon-add-line",
      content: <EventsList events={pastEvents} />,
    });
  }

  return (
    <SimpleContentPage>
      <ActionsButtons />
      <h2 className="fr-mt-6w" id="events">
        Évènements
      </h2>

      <Tabs tabs={eventsTabs} />

      {!currentEvents.length && !upcomingEvents.length && <p>Il n'y a aucun évènement en cours ou à venir</p>}
    </SimpleContentPage>
  );
};

export default EventsPage;
