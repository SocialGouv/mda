import type { PropsWithChildren } from "react";

import { Container } from "../layout/Container";

export const Notice = ({ children }: PropsWithChildren) => {
  return (
    <div className="fr-notice fr-notice--info">
      <Container>
        <div className="fr-notice__body">
          <div className="fr-notice__title">{children}</div>
        </div>
      </Container>
    </div>
  );
};
