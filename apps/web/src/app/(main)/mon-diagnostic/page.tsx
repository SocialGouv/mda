import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { Markdown } from "@components/utils/Markdown";
import { Container, Grid, GridCol } from "@design-system";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

import { DiagSteps } from "./DiagSteps";

const getData = () => {
  return fetchStrapi("diagnostic");
};

export const generateMetadata = generateMetadataFactory({
  resolveSlug: () => "mon-diagnostic",
  async resolveTitle() {
    const strapiData = await getData();
    return strapiData.data?.attributes.title as string;
  },
});

const Page = async () => {
  const firstQuestion = (await fetchStrapi("questions", { filters: { first: { $eq: true } }, populate: "deep,4" }))
    .data?.[0];
  if (!firstQuestion) {
    return null;
  }

  const strapiData = await getData();
  const data = strapiData.data?.attributes;

  return (
    <section className="fr-py-6w fr-py-md-12w fr-bg-grey-lightest">
      <Container>
        <Grid haveGutters justifyCenter>
          <GridCol md={10} lg={8} className="fr-bg-white fr-px-2w fr-py-4w fr-py-md-8w fr-px-md-12w">
            {data?.title && <h1 className="fr-h2 fr-text-center">{data.title}</h1>}
            {data?.content && <Markdown>{data.content}</Markdown>}
            <div aria-live="polite">
              <DiagSteps firstQuestion={firstQuestion} />
            </div>
            <div className="fr-mt-4w fr-text-center">
              <ActionsButtons />
            </div>
            {data?.bottom_content && (
              <>
                <hr className="fr-mt-4w fr-mb-2w " />
                <div className="fr-content">
                  <Markdown>{data.bottom_content}</Markdown>
                </div>
              </>
            )}
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
};

export default Page;
