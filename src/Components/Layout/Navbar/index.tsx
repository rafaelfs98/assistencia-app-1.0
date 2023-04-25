import {
  Divider,
  MediaQuery,
  Menu,
  Navbar,
  NavLink,
  Stack,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
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
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarContext, { NavbarTypes } from "../../../Context/Navbarcontext";
import UserAvatar from "../UserAvatar";

const NavbarApp = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState<boolean>();
  const [state, dispatch] = useContext(NavbarContext);

  const NavbarOpened = useCallback(() => {
    dispatch({
      payload: opened as boolean,
      type: NavbarTypes.SET_NAVBAR_VISIBLE,
    });
  }, []);

  useEffect(() => {
    NavbarOpened();
  }, [opened]);

  const navigateTo = (resource: string) => {
    navigate(resource);
    setOpened(!opened);
  };

  return (
    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      <Navbar hiddenBreakpoint="xs" p="md" width={{ base: 80 }}>
        <Navbar.Section p="xs">
          <UnstyledButton>Suite os</UnstyledButton>
        </Navbar.Section>
        <Divider my="sm" />
        <Navbar.Section grow>
          <Stack justify="center" spacing={0}>
            <NavLink
              title="Ordem de Servicos"
              label="Ordem de Sevicos"
              icon={<IconClipboardList size="1.5rem" stroke={1.5} />}
            />

            <NavLink
              title="Orcamento"
              label="Orcamento"
              icon={<IconCoin size="1.5rem" stroke={1.5} />}
            />
          </Stack>
        </Navbar.Section>
        <Navbar.Section>
          <Stack justify="center" spacing={0}>
            <Menu shadow="md" width={150} position="left-end">
              <Menu.Target>
                <NavLink
                  title="Gerencial"
                  label="Gerencial"
                  icon={<IconArticle size="1.5rem" stroke={1.5} />}
                />
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
            <Divider my="sm" />
            {<UserAvatar />}
          </Stack>
        </Navbar.Section>
      </Navbar>
    </MediaQuery>
  );
};

export default NavbarApp;
