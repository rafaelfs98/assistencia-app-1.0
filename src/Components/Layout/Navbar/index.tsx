import {
  Burger,
  Divider,
  MediaQuery,
  Menu,
  Navbar,
  NavLink,
  useMantineTheme,
} from "@mantine/core";
import {
  IconAddressBook,
  IconArticle,
  IconCash,
  IconCategory,
  IconChevronRight,
  IconClipboardList,
  IconCoin,
  IconDevices,
  IconFile,
  IconHierarchy,
  IconListDetails,
  IconPlus,
  IconSettings,
  IconTag,
  IconTool,
  IconTrademark,
  IconUser,
  IconUserCircle,
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
    <Navbar
      py="sm"
      px="md"
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 250 }}
      hidden={!state.navBarVisible}
    >
      <div style={{ display: "flex", justifyContent: "end" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={state.navBarVisible}
            onClick={() => {
              setOpened((opened) => !opened);
            }}
            size="sm"
            color={theme.colors.gray[6]}
          />
        </MediaQuery>
      </div>

      <Navbar.Section p="xs">Suite OS</Navbar.Section>
      <Divider my="sm" />

      <Navbar.Section grow mt="md">
        <NavLink
          label="Cadastro"
          icon={<IconArticle size="1rem" stroke={1.5} />}
          rightSection={<IconChevronRight />}
        >
          <NavLink
            label="Clientes"
            icon={<IconUsers size="1rem" stroke={1.5} />}
            onClick={() => navigateTo("clientes")}
          />
          <NavLink
            label="Categorias"
            icon={<IconCategory size="1rem" stroke={1.5} />}
          />
          <NavLink
            label="Equipamentos"
            icon={<IconDevices size="1rem" stroke={1.5} />}
          />
          <NavLink
            label="Fornecedores"
            icon={<IconAddressBook size="1rem" stroke={1.5} />}
          />
          <NavLink label="Marcas" icon={<IconTag size="1rem" stroke={1.5} />} />
          <NavLink
            label="Servicos"
            icon={<IconTool size="1rem" stroke={1.5} />}
          />
          <NavLink
            label="Status"
            icon={<IconHierarchy size="1rem" stroke={1.5} />}
          />
          <NavLink
            label="Formas de Pagamentos"
            icon={<IconCash size="1rem" stroke={1.5} />}
          />
        </NavLink>
        <NavLink
          label="Ordem de Sevicos"
          icon={<IconClipboardList size="1rem" stroke={1.5} />}
          rightSection={<IconChevronRight />}
        >
          <NavLink
            label="Criar uma O.S"
            icon={<IconPlus size="1rem" stroke={1.5} />}
          />
          <NavLink
            label="Listar Todas O.S"
            icon={<IconListDetails size="1rem" stroke={1.5} />}
          />
          <NavLink
            label="Abrir uma O.S"
            icon={<IconFile size="1rem" stroke={1.5} />}
          />
        </NavLink>
        <NavLink
          label="Orcamento"
          icon={<IconCoin size="1rem" stroke={1.5} />}
        />
      </Navbar.Section>
      <Navbar.Section>
        <Menu shadow="md" width={200} position="left-end">
          <Menu.Target>
            <NavLink
              label="Gerencial"
              icon={<IconSettings size="1rem" stroke={1.5} />}
            />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconTrademark size={14} />}>Empresa</Menu.Item>
            <Menu.Item icon={<IconUser size={14} />}>Perfil</Menu.Item>
            <Menu.Item icon={<IconSettings size={14} />}>
              Configuracao de Relatorio
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Divider my="sm" />
        {<UserAvatar />}
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarApp;
