import React, { FC, PropsWithChildren } from "react";
import { Container } from "@mui/material";
import { Header } from "./Header";
import { HeaderProps } from "../types";

const Layout: FC<PropsWithChildren<HeaderProps>> = ({
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
