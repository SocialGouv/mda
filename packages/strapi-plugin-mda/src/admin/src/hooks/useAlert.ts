import { useNotification } from "@strapi/helper-plugin";

import pluginId from "../pluginId";

interface HandleNotificationParams {
  blockTransition?: boolean;
  link?: string;
  message: string;
  type?: string;
}

export const useAlert = () => {
  const toggleNotification = useNotification();

  const handleNotification = ({ type = "info", message, link, blockTransition = true }: HandleNotificationParams) => {
    toggleNotification({
      type,
      message: {
        id: `notification.${pluginId}.message`,
        defaultMessage: message,
      },
      link,
      blockTransition,
      onClose: () => localStorage.setItem("STRAPI_UPDATE_NOTIF", "true"),
    });
  };

  return {
    handleNotification,
  };
};
