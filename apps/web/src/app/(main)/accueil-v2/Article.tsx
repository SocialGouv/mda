import { config } from "@common/config";
import { Markdown } from "@components/utils/Markdown";
import { ButtonAsLink, ButtonGroup, ButtonGroupItem, Container, Grid, GridCol } from "@design-system";
import { type GetAttributesValues } from "@mda/strapi-types";
import Image from "next/image";

interface ArticleProps {
  article: GetAttributesValues<"common.articles">;
}

const BUTTON_GROUPS_CLASSNAME = {
  center: ".fr-btns-group--center",
  left: ".fr-btns-group--left",
  right: ".fr-btns-group--right",
};

const Article = ({ article }: ArticleProps) => {
  const { section, buttons, buttons_position, image, image_position, image_height, image_width, theme } = article;

  const img =
    !!image && !!image.data?.attributes.url && !!image_height && !!image_width
      ? {
          height: image_height,
          url: new URL(image.data.attributes.url, config.strapi.apiUrl).toString(),
          width: image_width,
        }
      : null;

  const SectionCol = () => (
    <GridCol lg={img ? 7 : 12}>
      {section?.title && <h1>{section.title}</h1>}
      {section?.subtitle && <p className="fr-text--lg fr-text--bold">{section?.subtitle}</p>}
      {section?.content && <Markdown>{section.content}</Markdown>}
      {buttons && (
        <ButtonGroup className={BUTTON_GROUPS_CLASSNAME[buttons_position]} inline="mobile-up">
          {buttons.map((button, index) => (
            <ButtonGroupItem key={index}>
              <ButtonAsLink variant={button.theme} href={button.url}>
                {button.text}
              </ButtonAsLink>
            </ButtonGroupItem>
          ))}
        </ButtonGroup>
      )}
    </GridCol>
  );

  const ImageCol = () =>
    img ? (
      <GridCol md={6} lg={5} className="fr-mx-auto">
        <Image className="fr-fluid-img" src={img.url} alt="" width={img.width} height={img.height} />
      </GridCol>
    ) : null;

  return (
    <div className={`fr-py-6w fr-py-md-12w${theme ? ` ${theme}` : ""}`}>
      <Container>
        <Grid haveGutters>
          {img && image_position === "left" ? (
            <>
              <ImageCol />
              <SectionCol />
            </>
          ) : (
            <>
              <SectionCol />
              <ImageCol />
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Article;
