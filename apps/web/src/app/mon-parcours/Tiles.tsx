import {
  Card,
  CardBody,
  CardBodyContent,
  CardBodyContentDescription,
  CardBodyContentTitle,
  Grid,
  GridCol,
} from "@design-system";
import { NextLinkOrA } from "@design-system/utils/NextLinkOrA";

export const Tiles = () => (
  <GridCol md={10} lg={8} className="fr-mt-4w">
    <Grid haveGutters>
      <GridCol md={6}>
        <Card isEnlargeLink>
          <CardBody>
            <CardBodyContent>
              <CardBodyContentTitle titleAs="h2">
                <NextLinkOrA href="/la-maison-de-l-autisme"> La Maison de l'autisme physique</NextLinkOrA>
              </CardBodyContentTitle>
              <CardBodyContentDescription>
                La Maison de l’autisme n’est plus un projet, c’est une réalité. Elle se poursuit avec vous. Elle a hâte
                de vous accueillir à Aubervilliers et en ligne dès avril prochain.
              </CardBodyContentDescription>
            </CardBodyContent>
          </CardBody>
        </Card>
      </GridCol>

      <GridCol md={6}>
        <Card isEnlargeLink>
          <CardBody>
            <CardBodyContent>
              <CardBodyContentTitle titleAs="h2">
                <NextLinkOrA href="/fiches-pratiques/je-cherche-des-groupes-d-entraide">
                  Je cherche des groupes avec qui échanger
                </NextLinkOrA>
              </CardBodyContentTitle>
              <CardBodyContentDescription>
                Échanger avec des personnes permet de trouver du soutien, de rompre avec l’isolement, de mieux
                comprendre la situation et de rechercher des solutions, mais également de valoriser votre expérience.
              </CardBodyContentDescription>
            </CardBodyContent>
          </CardBody>
        </Card>
      </GridCol>
      <GridCol md={6}>
        <Card isEnlargeLink>
          <CardBody>
            <CardBodyContent>
              <CardBodyContentTitle titleAs="h2">
                <NextLinkOrA href="/je-donne-mon-avis">Je donne mon avis</NextLinkOrA>
              </CardBodyContentTitle>
              <CardBodyContentDescription>
                Un oubli&nbsp;? Une suggestion&nbsp;? Utilisez le module Je donne mon avis pour soumettre vos idées afin
                de contribuer à enrichir ce service public.
              </CardBodyContentDescription>
            </CardBodyContent>
          </CardBody>
        </Card>
      </GridCol>
      <GridCol md={6}>
        <Card isEnlargeLink>
          <CardBody>
            <CardBodyContent>
              <CardBodyContentTitle titleAs="h2">
                <NextLinkOrA href="/annuaire">Annuaire</NextLinkOrA>
              </CardBodyContentTitle>
              <CardBodyContentDescription>
                Vous cherchez des contacts de confiance&nbsp;? Un établissement ou un organisme&nbsp;? Des
                professionnels de santé&nbsp;? Une association&nbsp;?
              </CardBodyContentDescription>
            </CardBodyContent>
          </CardBody>
        </Card>
      </GridCol>
    </Grid>
  </GridCol>
);
