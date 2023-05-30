import { type Next13ServerPageProps } from "@common/utils/next13";
import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { JsonLd, type JsonLdProps } from "@components/utils/JsonLd";
import { Markdown } from "@components/utils/Markdown";
import { Container, Grid, GridCol, SideMenuLink } from "@design-system";
import { CollapsedSectionDynamicGroup, SideMenuDynamic } from "@design-system/client";
import { generateMetadataFactory } from "@services/metadata";
import { fetchStrapi } from "@services/strapi";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { type Article } from "schema-dts";

export type FichePratiqueProps = Next13ServerPageProps<"slug">;

export const generateMetadata = generateMetadataFactory({
  async resolveMetadata({ params }: FichePratiqueProps) {
    const currentFiche = (
      await fetchStrapi("fiche-pratiques", {
        filters: {
          slug: {
            $eq: params.slug,
          },
        },
      })
    ).data?.[0]?.attributes;

    return {
      description: currentFiche?.excerpt,
      modifiedTime: currentFiche?.updatedAt,
      publishedTime: currentFiche?.createdAt,
      slug: `fiches-pratiques/${params.slug}`,
      title: currentFiche?.title as string,
    };
  },
});

export async function generateStaticParams() {
  const fiches = (await fetchStrapi("fiche-pratiques")).data ?? [];

  return fiches.map(fiche => ({
    slug: fiche.attributes.slug,
  }));
}

const FichesPratiquesSlugPage = async ({ params }: FichePratiqueProps) => {
  const [fiches, pageData] = await Promise.all([
    fetchStrapi("fiche-pratiques").then(responses => responses.data ?? []),
    fetchStrapi("fiche-pratiques", {
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

  const currentFiche = pageData.attributes;

  const jsonLd: JsonLdProps<Article> = {
    type: "Article",
    dateCreated: currentFiche.createdAt,
    dateModified: currentFiche.updatedAt,
    name: currentFiche.title,
    slug: currentFiche.slug,
  };

  return (
    <section className="fr-py-md-12w">
      <JsonLd {...jsonLd}></JsonLd>
      <Container>
        <Grid haveGutters>
          <GridCol md={4} lg={3} className="fr-no-print">
            <SideMenuDynamic buttonLabel="Sommaire des fiches pratiques">
              {fiches?.map((f, index) => {
                if (!f.attributes.slug) return;
                const href = `/fiches-pratiques/${f.attributes.slug}`;
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
            <h1>{currentFiche.recap?.title}</h1>
            <p className="fr-text--xs">
              <>
                Mise à jour
                {currentFiche.updatedAt && ` le ${new Date(currentFiche.updatedAt).toLocaleString("fr-FR")} -`} par la
                Maison de l'autisme
              </>
            </p>
            <div className="fr-text--xl">
              <Markdown>{currentFiche.recap.content}</Markdown>
            </div>
            <div className="fr-mt-8w">
              <Suspense fallback={<>Chargement des sections...</>}>
                <CollapsedSectionDynamicGroup
                  data={
                    currentFiche.section?.map((s, sectionIdx) => ({
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

export default FichesPratiquesSlugPage;
