"use client";

import { FormButton } from "@design-system";
import { useGdprStore } from "@design-system/client";
import { type PropsWithChildren } from "react";

export const GDPRButton = ({ children }: PropsWithChildren) => {
  const consentModalButtonProps = useGdprStore(state => state.consentModalButtonProps);
  return <FormButton {...consentModalButtonProps.nativeButtonProps}>{children}</FormButton>;
};
