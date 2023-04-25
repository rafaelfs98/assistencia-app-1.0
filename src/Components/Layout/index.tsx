import {
  AppShell,
  Divider,
  Footer,
  Group,
  MediaQuery,
  Menu,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useId, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase/supabaseClient";
import HeaderApp from "./Header";
import NavbarApp from "./Navbar";
import UserAvatar from "./UserAvatar";

import {
  IconArticle,
  IconCash,
  IconClipboardList,
  IconCoin,
  IconHierarchy,
  IconSettings,
  IconTool,
  IconUsers,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, setOpened] = useState<String>();

  const navigateTo = (resource: string) => {
    navigate(resource);
  };

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
      navbar={<NavbarApp />}
      footer={
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <footer>
            <Group position="apart">
              <Group>
                <UnstyledButton>Suite os</UnstyledButton>
              </Group>

              <Group position="apart">
                <UnstyledButton ml="md">
                  <IconClipboardList size="1.5rem" stroke={1.5} />
                </UnstyledButton>
                <UnstyledButton ml="md">
                  <IconCoin size="1.5rem" stroke={1.5} />
                </UnstyledButton>

                <Menu shadow="md" width={150} position="top-start">
                  <Menu.Target>
                    <UnstyledButton ml="md">
                      {" "}
                      <IconArticle size="1.5rem" stroke={1.5} />
                    </UnstyledButton>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Cadastros</Menu.Label>

                    <Menu.Item
                      title="Clientes"
                      icon={<IconUsers size="1rem" stroke={1.5} />}
                      onClick={() => navigateTo("clientes")}
                    >
                      Clientes
                    </Menu.Item>
                    <Menu.Item
                      title="Servicos"
                      icon={<IconTool size="1rem" stroke={1.5} />}
                      onClick={() => navigateTo("servicos")}
                    >
                      Servicos
                    </Menu.Item>
                    <Menu.Item
                      title="Status"
                      icon={<IconHierarchy size="1rem" stroke={1.5} />}
                      onClick={() => navigateTo("status")}
                    >
                      Status
                    </Menu.Item>
                    <Menu.Item
                      title="Formas de Pagamentos"
                      icon={<IconCash size="1.5rem" stroke={1.5} />}
                    >
                      Formas de Pagamentos
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Label>Gerencial</Menu.Label>
                    <Menu.Item icon={<IconSettings size={14} />}>
                      Configuracao de Relatorio
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>

              <Group>
                <Divider orientation="vertical" />
                <UserAvatar />
              </Group>
            </Group>
          </footer>
        </MediaQuery>
      }
    >
      <Outlet />
    </AppShell>
  );
}
