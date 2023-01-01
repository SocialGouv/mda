import { type Strapi } from "@strapi/strapi";

const App = {
  config: {
    locales: ["fr"],
    notifications: { release: false },
  },
  bootstrap(_app: Strapi) {
    return;
  },
};

export default App;
