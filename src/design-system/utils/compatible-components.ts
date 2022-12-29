import type { ReactNode } from "react";

export type AuthorizedChildType = {
  type: {
    name: string;
  };
};

/** @deprecated */
// TODO: remove
export const compatibleComponents = (component: string, items: string[], array: ReactNode[]) => {
  array.forEach(child => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access -- deprecated
    if (!(child as Any).type || !(child as Any).type?.name || !items.includes((child as Any).type?.name)) {
      console.error(child);
      throw new Error(
        `Un enfant direct du composant ${component} n'est pas compatible. Seuls les composants ${items.join(
          ", ",
        )} sont acceptés.`,
      );
    }
  });
};
