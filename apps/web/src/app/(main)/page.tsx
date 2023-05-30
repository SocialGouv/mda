import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { config } from "@common/config";
import { ArticleFull } from "@components/home/Article";
import { Carousel } from "@components/home/Carousel";
import { GridTiles } from "@components/home/GridTiles";
import { MostViewedCards } from "@components/home/MostViewedCards";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

export const generateMetadata = generateMetadataFactory({
  // The layout template does not work here ?
  resolveMetadata: async () => {
    const pageData = await fetchStrapi("accueil");
    const accueil = pageData.data?.attributes;

    return {
      title: `Accueil | ${config.siteTitle}`,
      modifiedTime: accueil?.updatedAt,
      publishedTime: accueil?.publishedAt,
    };
  },
});

const AccueilPage = async () => {
  const pageData = await fetchStrapi("accueil", {
    populate: "deep",
  });

  const widgets = await Promise.all(
    (pageData.data?.attributes.widgets || []).map(async widget => {
      if (widget.__component === "common.most-viewed-cards") {
        const strapiCardsData = await fetchStrapi<typeof widget.collection>(`${widget.collection}/most-viewed`);
        return {
          ...widget,
          cards: strapiCardsData.data || [],
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
            return <ArticleFull article={widget} key={widget.id} />;
          case "common.grid-tiles":
            return <GridTiles grid={widget} key={widget.id} />;
          case "common.most-viewed-cards":
            return <MostViewedCards cards={widget.cards} section={widget} key={widget.id} />;
          case "common.carousels":
            return <Carousel carousel={widget} key={widget.id}></Carousel>;
          default:
            return null;
        }
      })}
    </section>
  );
};

export default AccueilPage;
