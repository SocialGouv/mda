import { type Next13ServerPageProps } from "@common/utils/next13";
import { Container, Grid, GridCol, SideMenuLink } from "@design-system";
import { CollapsedSectionDynamicGroup, SideMenuDynamic } from "@design-system/client";
import { fetchStrapi } from "@services/strapi";
import { Suspense } from "react";
import ReactMarkdown from "react-markdown";

export type FichePratiqueProps = Next13ServerPageProps<"slug">;
const FichePratique = async ({ params }: FichePratiqueProps) => {
  const fiches = await fetchStrapi("fiche-pratiques");
  const currentFicheId = fiches.find(fiche => fiche.attributes.slug === params.slug)?.id;
  if (!currentFicheId) return null;

  const currentFiche = await fetchStrapi(`fiche-pratiques/${currentFicheId}`, { populate: "deep" });
  return (
    <section className="fr-py-md-12w">
      <Container>
        <Grid haveGutters>
          <GridCol md={4} lg={3}>
            <SideMenuDynamic buttonLabel="Sommaire des fiches pratiques">
              {fiches.map((f, index) => {
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
            <h1>{currentFiche.attributes.recap.title}</h1>
            <p className="fr-text--xs">
              <>
                Mise à jour
                {currentFiche.attributes.updatedAt &&
                  ` le ${new Date(currentFiche.attributes.updatedAt).toLocaleString("fr-FR")} -`}{" "}
                par la Maison de l'Austisme
              </>
            </p>
            <div className="fr-text--xl">
              <ReactMarkdown>{currentFiche.attributes.recap.content}</ReactMarkdown>
            </div>
            <div className="fr-mt-8w">
              <Suspense fallback={<>Chargement des sections...</>}>
                <CollapsedSectionDynamicGroup
                  data={(currentFiche.attributes.section ?? []).map((s, sectionIdx) => ({
                    id: `section-${sectionIdx}`,
                    title: s.title,
                    content: <ReactMarkdown>{s.content}</ReactMarkdown>,
                  }))}
                />
              </Suspense>
            </div>
          </GridCol>
        </Grid>
      </Container>
    </section>
  );
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const fiches = await fetchStrapi("fiche-pratiques");

  return fiches.map(fiche => ({
    slug: fiche.attributes.slug,
  }));
}

export default FichePratique;
