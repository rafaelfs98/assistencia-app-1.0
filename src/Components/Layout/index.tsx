import { AppShell, useMantineTheme } from "@mantine/core";
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderApp from "./Header";
import NavbarApp from "./Navbar";

export default function AppShellDemo() {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      layout="alt"
      fixed
      navbarOffsetBreakpoint="sm"
      navbar={<NavbarApp />}
      header={<HeaderApp />}
    >
      <Outlet />
    </AppShell>
  );
}
