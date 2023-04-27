import {
  Divider,
  MediaQuery,
  Menu,
  Navbar,
  NavLink,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import {
  IconArticle,
  IconCash,
  IconClipboardList,
  IconCoin,
  IconDeviceMobile,
  IconHierarchy,
  IconSettings,
  IconTool,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import AvatarNavbar from "../UserAvatar/AvatarNavbar";

const NavbarApp = () => {
  const navigate = useNavigate();

  const navigateTo = (resource: string) => {
    navigate(resource);
  };

  return (
    <MediaQuery
      smallerThan="sm"
      styles={{ display: "none", backgroundColor: "#1A1B1E" }}
    >
      <Navbar hiddenBreakpoint="xs" p="md" width={{ base: 240 }}>
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
                  title="Equipamentos"
                  icon={<IconDeviceMobile size="1rem" stroke={1.5} />}
                  onClick={() => navigateTo("equipamentos")}
                >
                  Equipamentos
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
            {<AvatarNavbar />}
          </Stack>
        </Navbar.Section>
      </Navbar>
    </MediaQuery>
  );
};

export default NavbarApp;
