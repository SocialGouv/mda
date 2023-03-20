"use client";

import { SearchResultsList } from "@components/base/SearchResultsList";
import { mapMeilisearchHit, type SearchHit, searchStrapi } from "@services/strapi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams?.get("keyword");
  const [searchResults, setSearchResults] = useState<SearchHit[]>([]);

  const search = (keyword: string) => {
    searchStrapi(keyword)
      .then(hits => {
        setSearchResults(hits.map(mapMeilisearchHit).filter((hit): hit is SearchHit => !!hit));
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (keyword) {
      return search(keyword);
    }
  }, [keyword, searchResults]);

  const glossaryItems = searchResults.filter(item => item.type === "glossaire-item");
  const practicalGuideItems = searchResults.filter(item => item.type === "fiches-pratiques");
  const pagesItems = searchResults.filter(item => item.type === "page");

  if (keyword) {
    return (
      <>
        {searchResults?.length !== 0 ? (
          <>
            <h1 className="fr-text--regular">
              <strong>
                {searchResults.length} résultat{searchResults.length > 1 && "s"}
              </strong>{" "}
              pour&nbsp;: <strong>«{keyword}»</strong>
            </h1>
            {glossaryItems.length ? <SearchResultsList title="Glossaire" data={glossaryItems} /> : null}
            {practicalGuideItems.length ? (
              <SearchResultsList title="Fiches pratiques" data={practicalGuideItems} className="fr-pt-4w" />
            ) : null}
            {pagesItems.length ? (
              <SearchResultsList title="Autres pages" data={pagesItems} className="fr-pt-4w" />
            ) : null}
          </>
        ) : (
          <h1 className="fr-text--regular">
            <strong>Aucun résultat</strong> pour&nbsp;: <strong>«{keyword}»</strong>
          </h1>
        )}
      </>
    );
  }
  return (
    <div className="fr-text-center">
      <h1>Aucun résultat</h1>
      <p>Aucune recherche n’a pu être effectuée car vous n’avez pas saisi de terme de recherche.</p>
    </div>
  );
};

export default SearchResults;
