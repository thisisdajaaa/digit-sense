import React, { FC, PropsWithChildren } from "react";
import { Container } from "@mui/material";
import { Header, HeaderProps } from "./Header";

type LayoutProps = HeaderProps;

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  pageTitle,
  children,
}) => {
  return (
    <main>
      <Header pageTitle={pageTitle} />

      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        {children}
      </Container>
    </main>
  );
};

export { Layout };
