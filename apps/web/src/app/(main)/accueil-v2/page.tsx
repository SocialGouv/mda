import { fetchStrapi } from "@services/strapi";

import Article from "./Article";
import GridTiles from "./GridTiles";
import MostViewedCards from "./MostViewedCards";

const HomePage = async () => {
  const strapiData = await fetchStrapi("accueil-v2", {
    populate: "deep",
  });

  const widgets = await Promise.all(
    (strapiData.data?.attributes.widgets || []).map(async widget => {
      if (widget.__component === "common.most-viewed-cards") {
        // TODO find a solution for this cast
        const strapiData = await fetchStrapi<"api::fiche-pratique.fiche-pratique">(`${widget.collection}/most-viewed`);
        return {
          ...widget,
          cards: strapiData.data || [],
        };
      }
      return widget;
    }),
  );

  return (
    <section>
      {widgets.map(widget => {
        switch (widget.__component) {
          case "common.articles":
            return <Article article={widget} key={widget.id} />;
          case "common.grid-tiles":
            return <GridTiles grid={widget} key={widget.id} />;
          case "common.most-viewed-cards":
            return <MostViewedCards cards={widget.cards} section={widget} key={widget.id} />;
          default:
            return null;
        }
      })}
    </section>
  );
};

export default HomePage;
