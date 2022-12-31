"use client";

import { config } from "@common/config";
import { init } from "@socialgouv/matomo-next";
import { useEffect } from "react";

export const Matomo = () => {
  useEffect(() => {
    config.env === "prod" && init(config.matomo);
  }, []);

  return <></>;
};
