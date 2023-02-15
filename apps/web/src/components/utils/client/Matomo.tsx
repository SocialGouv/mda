"use client";

import { config } from "@common/config";
import { init } from "@socialgouv/matomo-next";
import { useEffect } from "react";

export type MatomoProps = Pick<typeof config, "env">;

export const Matomo = ({ env }: MatomoProps) => {
  useEffect(() => {
    env === "prod" && init(config.matomo);
  }, [env]);

  return <></>;
};
