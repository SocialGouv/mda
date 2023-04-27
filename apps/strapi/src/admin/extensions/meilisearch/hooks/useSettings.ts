import { request } from "@strapi/helper-plugin";
import { useEffect, useState } from "react";

import { useAlert } from "./useAlert";

export const useSettings = () => {
  const [settings, setSettings] = useState({
    typoTolerance: {},
  });
  const [value, setValue] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(true);
  const { handleNotification } = useAlert();

  const refetchSettings = () => setRefetchIndex(prevRefetchIndex => !prevRefetchIndex);

  const updateSettings = async () => {
    const { error } = await request(`/meilisearch/index/settings`, {
      method: "PUT",
      params: { settings: value },
    });
    if (error) {
      handleNotification({
        type: "warning",
        message: error.message,
        link: error.link,
      });
    } else {
      refetchSettings();
      handleNotification({
        type: "success",
        message: "Settings sucessfully updated!",
        blockTransition: false,
      });
    }
  };

  const fetchSettings = async () => {
    let val;
    try {
      const response = await request(`/meilisearch/index/settings`, {
        method: "GET",
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setSettings(response.settings);
      val = response.settings;
    } catch (e) {
      handleNotification({
        type: "info",
        message: "Nous n'avons pas trouvé de configuration",
      });
      val = settings;
    }
    setValue(JSON.stringify(val, null, 2));
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchIndex]);

  return {
    settings,
    updateSettings,
    value,
    setValue,
  };
};
