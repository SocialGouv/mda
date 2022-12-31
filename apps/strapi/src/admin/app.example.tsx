import { type Strapi } from "@strapi/strapi";

const App = {
  config: {
    locales: ["fr"],
  },
  bootstrap(app: Strapi) {
    console.log("================= APP BOOTSTRAP", app);
  },
};

export default App;
