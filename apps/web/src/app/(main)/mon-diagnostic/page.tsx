import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { Markdown } from "@components/utils/Markdown";
import { Container, Grid, GridCol } from "@design-system";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";

import { DiagSteps } from "./DiagSteps";

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata() {
    const head = await fetchStrapi("diagnostic");
    return {
      title: head.data?.attributes.title as string,
      slug: "mon-diagnostic",
      description: head.data?.attributes.content,
    };
  },
});

const MonDiagnosticPage = async () => {
  const firstQuestion = (await fetchStrapi("questions", { filters: { first: { $eq: true } }, populate: "deep,4" }))
    .data?.[0];
  if (!firstQuestion) {
    return null;
  }

  const pageData = await fetchStrapi("diagnostic");
  const diagnostic = pageData.data?.attributes;

  return (
    <section className="fr-py-6w fr-py-md-12w fr-bg-grey-lightest">
      <Container>
        <Grid haveGutters justifyCenter>
          <GridCol md={10} lg={8} className="fr-bg-white fr-px-2w fr-py-4w fr-py-md-8w fr-px-md-12w">
            {diagnostic?.title && <h1 className="fr-h2 fr-text-center">{diagnostic.title}</h1>}
            {diagnostic?.content && <Markdown>{diagnostic.content}</Markdown>}
            <div aria-live="polite">
              <DiagSteps firstQuestion={firstQuestion} />
            </div>
            <div className="fr-mt-4w fr-text-center">
              <ActionsButtons />
            </div>
            {diagnostic?.bottom_content && (
              <>
                <hr className="fr-mt-4w fr-mb-2w " />
                <div className="fr-content">
                  <Markdown>{diagnostic.bottom_content}</Markdown>
                </div>
              </>
            )}
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
};

export default MonDiagnosticPage;
