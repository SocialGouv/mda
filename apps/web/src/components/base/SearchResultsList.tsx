import { Link } from "@design-system";
import { type SearchHit } from "@services/strapi";

export const SearchResultsList = ({
  children,
  data,
  title,
  className,
}: {
  children?: JSX.Element;
  className?: string;
  data: SearchHit[];
  title: string;
}) => (
  <div className={className}>
    <h2 className="fr-h3">
      {title} ({data.length})
    </h2>
    <ul className="fr-bordered-list">
      {data.map((hit: SearchHit) => (
        <li key={hit.id}>
          {hit.url ? (
            <Link href={hit.url} iconLeft="fr-icon-arrow-right-line">
              {hit.title}
            </Link>
          ) : (
            <>
              <h3>{hit.title}</h3>
              <p>{hit.description}</p>
            </>
          )}
        </li>
      ))}
      <li>{children}</li>
    </ul>
  </div>
);
