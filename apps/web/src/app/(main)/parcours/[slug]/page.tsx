import { type Next13ServerPageProps } from "@common/utils/next13";
import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { Markdown } from "@components/utils/Markdown";
import { Container, Grid, GridCol, SideMenuLink } from "@design-system";
import { CollapsedSectionDynamicGroup, SideMenuDynamic } from "@design-system/client";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export type EtapeDeVieProps = Next13ServerPageProps<"slug">;

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata({ params }: EtapeDeVieProps) {
    const head = (
      await fetchStrapi("etape-de-vies", {
        filters: {
          slug: {
            $eq: params.slug,
          },
        },
      })
    ).data?.[0];

    return {
      title: head?.attributes.title as string,
      slug: `parcours/${params.slug}`,
      description: head?.attributes.excerpt,
    };
  },
});

export async function generateStaticParams() {
  const etapes = (await fetchStrapi("etape-de-vies")).data ?? [];

  return etapes.map(etape => ({
    slug: etape.attributes.slug,
  }));
}

const ParcoursSlugPage = async ({ params }: EtapeDeVieProps) => {
  const [etapes, currentEtape] = await Promise.all([
    fetchStrapi("etape-de-vies").then(responses => responses.data ?? []),
    fetchStrapi("etape-de-vies", {
      populate: "deep",
      filters: {
        slug: {
          $eq: params.slug,
        },
      },
    }).then(response => {
      if (response.data?.[0]) {
        return response.data?.[0];
      }
      notFound();
    }),
  ]);

  return (
    <section className="fr-py-md-12w">
      <Container>
        <Grid haveGutters>
          <GridCol md={4} lg={3} className="fr-no-print">
            <SideMenuDynamic buttonLabel="Sommaire des étapes de vie">
              {etapes
                ?.filter(({ attributes: { type } }) => type === currentEtape.attributes.type)
                .map((f, index) => {
                  if (!f.attributes.slug) return;
                  const href = `/parcours/${f.attributes.slug}`;
                  return (
                    <SideMenuLink key={index} href={href} isCurrent={f.attributes.slug === params?.slug}>
                      {f.attributes.title}
                    </SideMenuLink>
                  );
                })}
            </SideMenuDynamic>
          </GridCol>
          <GridCol className="fr-py-6w fr-pt-md-0" md={8} lg={9}>
            <ActionsButtons />
            <h1>{currentEtape.attributes.recap?.title}</h1>
            <p className="fr-text--xs">
              <>
                Mise à jour
                {currentEtape.attributes.updatedAt &&
                  ` le ${new Date(currentEtape.attributes.updatedAt).toLocaleString("fr-FR")} -`}{" "}
                par la Maison de l'autisme
              </>
            </p>
            <div className="fr-text--xl">
              <Markdown>{currentEtape.attributes.recap.content}</Markdown>
            </div>
            <div className="fr-mt-8w">
              <Suspense fallback={<>Chargement des sections...</>}>
                <CollapsedSectionDynamicGroup
                  data={
                    currentEtape.attributes.section?.map((s, sectionIdx) => ({
                      id: `section-${sectionIdx}`,
                      title: s.title,
                      content: <Markdown>{s.content}</Markdown>,
                    })) ?? []
                  }
                />
              </Suspense>
            </div>
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
};

export default ParcoursSlugPage;
