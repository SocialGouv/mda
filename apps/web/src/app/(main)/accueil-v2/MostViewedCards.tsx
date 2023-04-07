import {
  ButtonAsLink,
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
import { type GetAttributesValues } from "@mda/strapi-types";

interface CardProps {
  excerpt: string;
  id: number;
  slug: string;
  title: string;
}

interface MostViewedCardsProps<T extends CardProps> {
  cards: T[];
  section: GetAttributesValues<"common.most-viewed-cards">;
}

const COLLECTIONS_BASE_SLUG = {
  "fiche-pratiques": "fiches-pratiques",
};

const MostViewedCards = ({ cards, section }: MostViewedCardsProps<CardProps>) => (
  <div className="fr-pt-6w fr-pt-md-8w">
    <Container>
      <h2>{section.title}</h2>
      {cards && (
        <Grid as="ul" haveGutters>
          {cards.map(card => (
            <GridCol as="li" md={6} lg={4} key={card.id}>
              <Card isEnlargeLink>
                <CardBody>
                  <CardBodyContent>
                    <CardBodyContentTitle titleAs="h3">
                      <NextLinkOrA href={`/${COLLECTIONS_BASE_SLUG[section.collection]}/${card.slug}`}>
                        {card.title}
                      </NextLinkOrA>
                    </CardBodyContentTitle>
                    <CardBodyContentDescription>{card.excerpt}</CardBodyContentDescription>
                  </CardBodyContent>
                </CardBody>
              </Card>
            </GridCol>
          ))}
        </Grid>
      )}
      {section.button && (
        <div className="fr-mt-4w fr-mt-md-6w fr-text-center">
          <ButtonAsLink href={section.button.url} variant={section.button.theme}>
            {section.button.text}
          </ButtonAsLink>
        </div>
      )}
    </Container>
  </div>
);

export default MostViewedCards;
