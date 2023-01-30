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
                <NextLinkOrA href="/fiches-pratiques/qu-est-ce-que-l-autisme">J’en parle autour de moi</NextLinkOrA>
              </CardBodyContentTitle>
              <CardBodyContentDescription>
                L’autisme est un trouble du neuro-développement précoce, qui impacte les capacités de communication, les
                interactions sociales et les comportements des personnes.
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
                En ligne ou en physique près de chez moi, des communautés de partage et d'entraide liés au TSA existent.
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
                Un oubli&nbsp;? Une suggestion&nbsp;? Utilisez le module "JeDonneMonAvis" pour soumettre vos idées afin
                de contribuer à enrichir ce service public construit par et pour les personnes autistes et leurs
                proches.
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
                Vous cherchez une organisation agissant dans le domaine de l’autisme ? Trouvez ses coordonnées dans
                notre annuaire.
              </CardBodyContentDescription>
            </CardBodyContent>
          </CardBody>
        </Card>
      </GridCol>
    </Grid>
  </GridCol>
);
