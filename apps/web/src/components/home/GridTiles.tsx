import { Container, Grid, GridCol, Tile, TileBody, TileBodyDescription, TileBodyTitle, TileImg } from "@design-system";
import { type GetAttributesValues } from "@mda/strapi-types";

import { PICTOS } from "../pictos";

interface GridTilesProps {
  grid: GetAttributesValues<"common.grid-tiles">;
}

export const GridTiles = ({ grid }: GridTilesProps) => (
  <div className="fr-pt-6w fr-pt-md-8w">
    <Container>
      <h2>{grid.title}</h2>
      {grid.tiles && (
        <Grid as="ul" haveGutters>
          {grid.tiles.map(tile => (
            <GridCol as="li" lg={6} key={tile.id}>
              <Tile>
                <TileBody>
                  <TileBodyTitle href={tile.slug} titleAs="h3">
                    {tile.title}
                  </TileBodyTitle>
                  <TileBodyDescription>{tile.description}</TileBodyDescription>
                </TileBody>
                <TileImg>{PICTOS[tile.picto]}</TileImg>
              </Tile>
            </GridCol>
          ))}
        </Grid>
      )}
    </Container>
  </div>
);
