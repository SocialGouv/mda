"use client";

import { type config } from "@common/config";
import { init } from "@socialgouv/matomo-next";
import { useEffect } from "react";

export type MatomoProps = Pick<typeof config, "env" | "matomo">;

export const Matomo = ({ env, matomo }: MatomoProps) => {
  useEffect(() => {
    env === "prod" && init(matomo);
  }, [env, matomo]);

  return <></>;
};
