import { AppShell } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase/supabaseClient";
import NavbarApp from "./Navbar";

import FooterApp from "../Footer";
import HeaderApp from "./Header";

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
    >
      <Outlet />
    </AppShell>
  );
}
