import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../../package.json";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import pluginId from "./pluginId";

const name = pluginPkg.strapi.name;

const plugin = {
  register(app: any) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "mda-[request]" */ "./pages/App");

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {
    //
  },
  async registerTrads(app: any) {
    const { locales } = app as { locales: string[] };

    const importedTrads = await Promise.all(
      locales.map(async locale => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          return {
            data: prefixPluginTranslations(data, pluginId),
            locale,
          };
        } catch {
          return {
            data: {},
            locale,
          };
        }
      }),
    );

    return Promise.resolve(importedTrads);
  },
};

export default plugin;
