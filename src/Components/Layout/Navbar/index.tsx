import {
  Divider,
  Image,
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
  IconDeviceMobile,
  IconHierarchy,
  IconLayoutDashboard,
  IconTool,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import AvatarNavbar from "../UserAvatar/AvatarNavbar";

const NavbarApp = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const handleThemeChange = () => {
    const logoSrc =
      theme.colorScheme === "dark" ? "./SuiteOSBack.png" : "./SuiteOSBack.png";

    return logoSrc;
  };

  const navigateTo = (resource: string) => {
    navigate(resource);
  };

  return (
    <MediaQuery
      className="loading__media_query"
      smallerThan="sm"
      styles={{ display: "none" }}
    >
      <Navbar
        hiddenBreakpoint="xs"
        p="md"
        width={{ base: 240 }}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[3],
        })}
      >
        <Navbar.Section p="xs">
          <UnstyledButton onClick={() => navigateTo("/")}>
            <Image
              width={200}
              height={80}
              fit="contain"
              src={handleThemeChange()}
            />
          </UnstyledButton>
        </Navbar.Section>
        <Divider my="sm" />
        <Navbar.Section grow>
          <Stack justify="center" spacing={0}>
            <NavLink
              title="Dashboard"
              label="Dashboard"
              icon={<IconLayoutDashboard size="1.5rem" stroke={1.5} />}
              variant="filled"
              active
            />

            <NavLink
              title="Ordem de Servicos"
              label="Ordem de Sevicos"
              icon={<IconClipboardList size="1.5rem" stroke={1.5} />}
              onClick={() => navigateTo("os")}
              variant="subtle"
              color="dark"
              active
            />

            <NavLink
              title="Orcamento"
              label="Orcamento"
              icon={<IconCoin size="1.5rem" stroke={1.5} />}
              variant="subtle"
              color="dark"
              active
            />
          </Stack>
        </Navbar.Section>
        <Navbar.Section>
          <Stack justify="center" spacing={0}>
            <Menu shadow="md" width={150} position="left-end">
              <Menu.Target>
                <NavLink
                  title="Cadastros"
                  label="Cadastros"
                  icon={<IconArticle size="1.5rem" stroke={1.5} />}
                  variant="subtle"
                  color="dark"
                  active
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
                  onClick={() => navigateTo("paymentmethods")}
                >
                  Formas de Pagamentos
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
