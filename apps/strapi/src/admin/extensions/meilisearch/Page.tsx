// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import React from "react";

import { MeilisearchSettings } from "./components/MeilisearchSettings";

window.React = React;

const Page = () => {
  return <MeilisearchSettings />;
};

export default Page;
