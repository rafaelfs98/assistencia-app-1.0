import { AppShell, Box, Container } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase/supabaseClient";
import NavbarApp from "./Navbar";

import HeaderApp from "./Header";
import FooterApp from "./Footer";

export default function AppShellDemo() {
  const navigate = useNavigate();

  useEffect(() => {
    const getLoggedInUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("login");
      }
    };

    getLoggedInUser();
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
