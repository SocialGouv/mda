"use client";

import { FormButton } from "@design-system";
import { type PropsWithChildren } from "react";

export const GDPRButton = ({ children }: PropsWithChildren) => {
  return <FormButton onClick={() => Orejime.show()}>{children}</FormButton>;
};
