"use client";

import { config } from "@common/config";
import { ButtonAsLink, FormButton } from "@design-system";
import { push } from "@socialgouv/matomo-next";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import styles from "./ActionsButtons.module.css";

export const ActionsButtons = ({ className }: { className?: string }) => {
  const currentPathName = usePathname() ?? "";
  const pageUrl = new URL(currentPathName, config.siteUrl).toString();
  return (
    <ul className={clsx("fr-no-print", styles.list, className)}>
      <li>
        <FormButton
          onClick={() => {
            window.print();
            push(["trackEvent", "Page Action", "Page Printed", pageUrl]);
          }}
          iconOnly="fr-icon-printer-line"
          title="Imprimer la page"
          variant="tertiary-no-border"
          isRounded
        >
          Imprimer la page
        </FormButton>
      </li>
      <li>
        <ButtonAsLink
          href={`mailto:?subject=&body=Bonjour, je pense que cette page pourrait t'intéresser : ${pageUrl}`}
          iconOnly="fr-icon-mail-line"
          title="Partager cette url"
          variant="tertiary-no-border"
          isRounded
          onClick={() => {
            push(["trackEvent", "Page Action", "Page Shared", pageUrl]);
          }}
        >
          Partager cette url
        </ButtonAsLink>
      </li>
    </ul>
  );
};
