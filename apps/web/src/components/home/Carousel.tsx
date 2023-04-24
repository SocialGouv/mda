"use client";

import { Container } from "@design-system";
import { Carousel as ReactResponsiveCarousel } from "react-responsive-carousel";

export const Carousel = () => {
  return (
    <Container>
      <ReactResponsiveCarousel showArrows={true}>
        <div>First slide</div>
        <div>Second slide</div>
        <div>Third slide</div>
      </ReactResponsiveCarousel>
    </Container>
  );
};
