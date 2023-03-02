import { ActionsButtons } from "@components/base/client/ActionsButtons";
import { SimpleContentPage } from "@components/base/SimpleContentPage";
import { fetchStrapi } from "@services/strapi";
import clsx from "clsx";

// TODO: handle iterate over pagination in fetch
const Glossary = async () => {
  const items = await fetchStrapi("glossaire-items", { sort: "title", pagination: { limit: 100 } });

  return (
    <SimpleContentPage>
      <ActionsButtons />
      <h1>Glossaire</h1>
      <dl className="fr-mt-6w">
        {(items.data ?? []).map((item, index) => (
          <div key={index} className={clsx(index > 0 && "fr-mt-2w")}>
            {item.attributes.url ? (
              <>
                <dt className="fr-text--bold fr-text--lg fr-mb-0" id={`glossaire-item-${item.id}`}>
                  <a
                    href={item.attributes.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${item.attributes.title}, ouvrir dans une nouvelle fenêtre`}
                  >
                    {item.attributes.title}
                  </a>
                </dt>

                <dd className="fr-m-0">{item.attributes.description}</dd>
              </>
            ) : (
              <>
                <dt className="fr-text--bold fr-text--lg fr-mb-0" id={`glossaire-item-${item.id}`}>
                  {item.attributes.title}
                </dt>
                <dd className="fr-m-0">{item.attributes.description}</dd>
              </>
            )}
          </div>
        ))}
      </dl>
    </SimpleContentPage>
  );
};

export default Glossary;
