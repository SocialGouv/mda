"use client";

import { Breadcrumb, BreadcrumbItem, ClientContainer } from "@design-system/client";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./BreadcrumbDynamic.module.css";

export const BreadcrumbDynamic = () => {
  const currentPathName = usePathname();

  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => setPageTitle(document.title.replace(" | Maison de l'autisme", "")), [currentPathName]);

  if (currentPathName === "/") return null;

  const filteredPath = currentPathName?.split("/").filter(el => el !== "");

  const breadcrumbs = filteredPath?.map((path, index) => {
    const href = "/" + filteredPath.slice(0, index + 1).join("/");
    const getLabel = (label?: string) => {
      if (index === filteredPath.length - 1) {
        return label ? label : (path.charAt(0).toUpperCase() + path.slice(1)).replace(/-/g, " ");
      } else {
        return (path.charAt(0).toUpperCase() + path.slice(1)).replace(/-/g, " ");
      }
    };
    return {
      href,
      label: getLabel(pageTitle),
      isCurrent: index === filteredPath.length - 1,
    };
  });

  return (
    <ClientContainer className={clsx(styles.section, "fr-no-print")}>
      <Breadcrumb className={styles.sectionItem}>
        <BreadcrumbItem href="/" isCurrent={currentPathName === "/"}>
          Accueil
        </BreadcrumbItem>
        {breadcrumbs?.map(({ href, label, isCurrent }, index) => (
          <BreadcrumbItem href={href} isCurrent={isCurrent} key={index}>
            {label}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </ClientContainer>
  );
};
