"use client";

import { ButtonAsLink, FormButton } from "@design-system";
import { push } from "@socialgouv/matomo-next";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import styles from "./ActionsButtons.module.css";

export const ActionsButtons = ({ className }: { className?: string }) => {
  const currentPathName = usePathname() ?? "";
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}${currentPathName}`;
  console.log(pageUrl);
  return (
    <ul className={clsx("fr-no-print", styles.list, className)}>
      <li>
        <FormButton
          onClick={() => {
            window.print();
            push(["trackEvent", "Print page", "Click on print button"]);
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
            push(["trackEvent", "Share page", "Click on share button"]);
          }}
        >
          Partager cette url
        </ButtonAsLink>
      </li>
    </ul>
  );
};
