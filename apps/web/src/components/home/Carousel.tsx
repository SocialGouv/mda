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
    <Container>
      <Slider {...settings} className="carousel">
        {carousel.articles?.map(article => (
          <Article article={article} key={article.id}></Article>
        ))}
      </Slider>
    </Container>
  );
};
