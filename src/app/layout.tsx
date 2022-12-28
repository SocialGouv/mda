import { BasicLayout } from "@components/layouts/BasicLayout";
import { type PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <BasicLayout>{children}</BasicLayout>
      </body>
    </html>
  );
};

export default RootLayout;
