const App = {
  config: {
    locales: ["fr"],
    notifications: { releases: false },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bootstrap(app: any) {
    const { pluginId } = app.getPlugin("meilisearch");
    app.addSettingsLink("global", {
      intlLabel: {
        id: `${pluginId}.Settings`,
        defaultMessage: "Meilisearch",
      },
      id: `${pluginId}-page`,
      to: `/settings/${pluginId}`,
      Component: async () => import(/* webpackChunkName: "meilisearch-settings" */ "./extensions/meilisearch/Page"),
    });
  },
};

export default App;
