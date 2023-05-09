const routes = [
  {
    method: "GET",
    path: "/diagnostic-tree",
    handler: "diagnosticTreeController.find",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "PUT",
    path: "/diagnostic-tree",
    handler: "diagnosticTreeController.update",
    config: {
      policies: [],
    },
  },
];

export default routes;
