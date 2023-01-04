import { type PropsWithChildren } from "react";

import { NextLinkOrA } from "../utils/NextLinkOrA";

export type TileProps = PropsWithChildren;

export const Tile = ({ children }: TileProps) => (
  <div className="fr-tile fr-enlarge-link fr-tile--horizontal">{children}</div>
);

export const TileBody = ({ children }: PropsWithChildren) => <div className="fr-tile__body">{children}</div>;

export type TileBodyTitleProps = PropsWithChildren<{
  href: string;
  titleAs?: "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}>;

export const TileBodyTitle = ({ href, children, titleAs: HtmlTag = "p" }: TileBodyTitleProps) => {
  return (
    <HtmlTag className="fr-tile__title">
      <NextLinkOrA href={href}>{children}</NextLinkOrA>
    </HtmlTag>
  );
};

export const TileBodyDescription = ({ children }: PropsWithChildren) => <p className="fr-tile__desc">{children}</p>;

export const TileImg = ({ children }: PropsWithChildren) => <div className="fr-tile__img">{children}</div>;
