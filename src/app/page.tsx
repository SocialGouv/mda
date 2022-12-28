import { config } from "@common/config";
import { type NextPage } from "next";

const HomePage: NextPage = () => {
  return <div>HOME PAGE HELLO {config.env}</div>;
};

export default HomePage;
