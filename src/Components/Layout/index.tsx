import { AppShell, useMantineTheme } from "@mantine/core";
import { Outlet } from "react-router-dom";
import HeaderApp from "./Header";
import NavbarApp from "./Sidebar";

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
      navbarOffsetBreakpoint="sm"
      navbar={<NavbarApp />}
      header={<HeaderApp />}
      layout="alt"
    >
      <Outlet />
    </AppShell>
  );
}
