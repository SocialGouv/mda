import { type Strapi as BaseStrapi } from "@strapi/strapi";

type LifecycleProps = { strapi: BaseStrapi };
interface PreInit {
  bootstrap(props: LifecycleProps): Promise<void> | void;
  register(props: LifecycleProps): Promise<void> | void;
}

const StrapiInit: PreInit = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi: _ }) {
    console.log("================= Pre init register");
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi: _ }) {
    console.log("================= Pre init bootstrap");
  },
};

export default StrapiInit;
