import { JSONInput, Loader } from "@strapi/design-system";
import { Box } from "@strapi/design-system/Box";
import { Button } from "@strapi/design-system/Button";
import { ContentLayout, HeaderLayout } from "@strapi/design-system/Layout";
import { useState } from "react";

import { useSettings } from "../hooks/useSettings";

export const MeilisearchSettings = () => {
  const { updateSettings, value, setValue } = useSettings();
  const [error, setError] = useState(false);

  const onSave = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateSettings();
  };

  const onChange = (val: string) => {
    try {
      JSON.parse(val);
      setError(false);
      setValue(val);
    } catch (e) {
      setError(true);
    }
  };

  return (
    <Box height="100vh">
      <Box background="neutral100">
        <HeaderLayout
          title="Configuration du moteur de recherche"
          primaryAction={
            <Button disabled={error} loading={false} onClick={onSave}>
              Sauvegarder
            </Button>
          }
        />
      </Box>
      <ContentLayout>
        {typeof value === "string" ? (
          <JSONInput
            hint={
              <>
                Plus d'informations sur{" "}
                <a href="https://www.meilisearch.com/docs/learn/configuration/settings" target="_blank">
                  la documentation meilisearch ici
                </a>
              </>
            }
            value={value}
            error={error ? "JSON input invalide" : null}
            onChange={onChange}
          ></JSONInput>
        ) : (
          <Loader />
        )}
      </ContentLayout>
    </Box>
  );
};

export default MeilisearchSettings;
