import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { config } from "@common/config";
import { ArticleFull } from "@components/home/Article";
import { Carousel } from "@components/home/Carousel";
import { GridTiles } from "@components/home/GridTiles";
import { MostViewedCards } from "@components/home/MostViewedCards";
import { JsonLd, type JsonLdProps } from "@components/utils/JsonLd";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";
import { type WebSite } from "schema-dts";

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
  const accueil = pageData.data?.attributes;

  const jsonLd: JsonLdProps<WebSite> = {
    type: "WebSite",
    dateCreated: accueil?.createdAt,
    dateModified: accueil?.updatedAt,
    datePublished: accueil?.publishedAt,
    name: "La Maison Numérique de l'autisme",
  };

  const widgets = await Promise.all(
    (accueil?.widgets || []).map(async widget => {
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
      <JsonLd {...jsonLd}></JsonLd>
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
