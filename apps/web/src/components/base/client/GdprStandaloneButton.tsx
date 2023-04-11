"use client";

import { useGdprStore } from "@design-system/client";

export const GdprStandaloneButton = () => {
  const consentModalButtonProps = useGdprStore(state => state.consentModalButtonProps);
  return (
    <button
      {...consentModalButtonProps.nativeButtonProps}
      onClick={consentModalButtonProps.onClick}
      className="fr-footer__bottom-link"
    >
      Gestion des cookies
    </button>
  );
};
