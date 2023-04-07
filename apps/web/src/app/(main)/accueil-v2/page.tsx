import { fetchStrapi } from "@services/strapi";

import Article from "./Article";
import GridTiles from "./GridTiles";
import MostViewedCards from "./MostViewedCards";

const HomePage = async () => {
  const strapiData = await fetchStrapi("accueil-v2", {
    populate: "deep",
  });

  const widgets = strapiData.data?.attributes.widgets || [];

  return (
    <section>
      {widgets.map(widget => {
        switch (widget.__component) {
          case "common.articles":
            return <Article article={widget} key={widget.id} />;
          case "common.grid-tiles":
            return <GridTiles grid={widget} key={widget.id} />;
          case "common.most-viewed-cards":
            return <MostViewedCards cards={[]} section={widget} key={widget.id} />;
          default:
            return null;
        }
      })}
    </section>
  );
};

export default HomePage;
