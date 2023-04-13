import { type Next13ServerPageProps } from "@common/utils/next13";
import { SearchResultsList } from "@components/base/SearchResultsList";
import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { Link } from "@design-system";
import { mapMeilisearchHit, type SearchHit, searchStrapi } from "@services/strapi";

export const dynamic = "force-dynamic";

export const generateMetadata = () => {
  return { title: "Recherche" };
};

export type SearchProps = Next13ServerPageProps<"", "keyword">;
const Search = async ({ searchParams: { keyword } }: SearchProps) => {
  const searchResults = keyword
    ? await searchStrapi(keyword).then(hits => hits.map(mapMeilisearchHit).filter((hit): hit is SearchHit => !!hit))
    : [];

  const glossaryItems = (searchResults ?? []).filter(item => item.type === "glossaire-item");
  const lifeStepItems = (searchResults ?? []).filter(item => item.type === "etape-de-vie");
  const practicalGuideItems = (searchResults ?? []).filter(item => item.type === "fiches-pratiques");
  const pagesItems = (searchResults ?? []).filter(item => item.type === "page");

  if (keyword) {
    return (
      <SimpleContentPage>
        {searchResults && searchResults.length !== 0 ? (
          <>
            <h1 className="fr-text--regular">
              <strong>
                {searchResults.length} résultat{searchResults.length > 1 && "s"}
              </strong>{" "}
              pour&nbsp;: <strong>«{keyword}»</strong>
            </h1>
            {lifeStepItems.length ? <SearchResultsList title="Étapes de vie" data={lifeStepItems} /> : null}
            {practicalGuideItems.length ? (
              <SearchResultsList title="Fiches pratiques" data={practicalGuideItems} className="fr-pt-4w" />
            ) : null}
            {pagesItems.length ? (
              <SearchResultsList title="Autres pages" data={pagesItems} className="fr-pt-4w" />
            ) : null}
            {glossaryItems.length ? (
              <SearchResultsList title="Glossaire" data={glossaryItems} className="fr-pt-4w">
                <Link href="/glossaire" iconLeft="fr-icon-arrow-right-line">
                  Consulter tout le glossaire
                </Link>
              </SearchResultsList>
            ) : null}
          </>
        ) : searchResults && searchResults.length === 0 ? (
          <h1 className="fr-text--regular">
            <strong>Aucun résultat</strong> pour&nbsp;: <strong>«{keyword}»</strong>
          </h1>
        ) : (
          <h1 className="fr-text--regular">Chargement...</h1>
        )}
      </SimpleContentPage>
    );
  }
  return (
    <SimpleContentPage>
      <div className="fr-text-center">
        <h1>Aucun résultat</h1>
        <p>Aucune recherche n’a pu être effectuée car vous n’avez pas saisi de terme de recherche.</p>
      </div>
    </SimpleContentPage>
  );
};

export default Search;
