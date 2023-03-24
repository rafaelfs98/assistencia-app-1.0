import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  NavLink,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarSectionsApp from "./Navbar";

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState<boolean>(false);

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
      navbar={
        <Navbar
          py="sm"
          px="md"
          hiddenBreakpoint="sm"
          width={{ sm: 200, lg: 250 }}
          hidden={!opened}
        >
          <div style={{ display: "flex", justifyContent: "end" }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>
          </div>

          <NavbarSectionsApp />
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}
