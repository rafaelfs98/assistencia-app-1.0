import { AppShell } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarApp from "./Navbar";

import FooterApp from "./Footer";
import HeaderApp from "./Header";

export default function AppShellDemo() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = () => {
      const user =
        sessionStorage.getItem("user") ?? localStorage.getItem("user");

      if (!user) {
        navigate("login");
      }
    };

    isLoggedIn();
  }, []);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      layout="alt"
      header={<HeaderApp />}
      navbar={<NavbarApp />}
      footer={<FooterApp />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[2],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}
