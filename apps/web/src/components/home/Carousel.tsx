"use client";

import { Container } from "@design-system";
import { type GetAttributesValues } from "@mda/strapi-types";
import Slider, { type Settings } from "react-slick";

import { Article } from "./Article";

interface CarouselProps {
  carousel: GetAttributesValues<"common.carousels">;
}

export const Carousel = ({ carousel }: CarouselProps) => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="fr-pt-6w fr-pt-md-12w fr-pb-0 fr-px-3w">
      <Container>
        <Slider {...settings} className="carousel">
          {carousel.articles?.map(article => (
            <Article article={article} key={article.id}></Article>
          ))}
        </Slider>
      </Container>
    </div>
  );
};
