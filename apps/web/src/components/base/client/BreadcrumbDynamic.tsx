"use client";

import { Breadcrumb, BreadcrumbItem, ClientContainer } from "@design-system/client";
import { usePathname } from "next/navigation";

import styles from "./BreadcrumbDynamic.module.css";

export const BreadcrumbDynamic = () => {
  const currentPathName = usePathname();
  if (currentPathName === "/") return null;

  const filteredPath = currentPathName?.split("/").filter(el => el !== "");

  const breadcrumbs = filteredPath?.map((path, index) => {
    const href = "/" + filteredPath.slice(0, index + 1).join("/");
    return {
      href,
      label: (path.charAt(0).toUpperCase() + path.slice(1)).replace(/-/g, " "),
      isCurrent: index === filteredPath.length - 1,
    };
  });

  return (
    <ClientContainer className={styles.section}>
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
