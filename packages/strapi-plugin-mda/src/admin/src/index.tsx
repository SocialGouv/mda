import "../../global.d";

import { prefixPluginTranslations } from "@strapi/helper-plugin";
import { type FC } from "react";

import pluginPkg from "../../../package.json";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import pluginId from "./pluginId";
import { type PluginRegistConfig, type StrapiPlugin } from "./types";

const name = pluginPkg.strapi.name;

const plugin: StrapiPlugin = {
  register(app) {
    console.log("MDA === register", app);
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "mda-[request]" */ "./pages/App");

        return component as unknown as FC;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });
    const plugin: PluginRegistConfig = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app) {
    console.log("MDA === bootstrap", app);
  },
  async registerTrads(app) {
    console.log("MDA === registerTrads", app);
    const { locales } = app;

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
