"use client";

import { FormButton } from "@design-system";
import { type PropsWithChildren } from "react";

export const GDPRButton = ({ children }: PropsWithChildren) => {
  return <FormButton onClick={() => tarteaucitron.userInterface.openPanel()}>{children}</FormButton>;
};
