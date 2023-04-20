import { AppShell, useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase/supabaseClient";
import HeaderApp from "./Header";
import NavbarApp from "./Navbar";

export default function AppShellDemo() {
  const theme = useMantineTheme();
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
      navbar={<NavbarApp />}
      header={<HeaderApp />}
    >
      <Outlet />
    </AppShell>
  );
}
