import {
  Burger,
  Button,
  Divider,
  MediaQuery,
  Menu,
  Navbar,
  NavLink,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { ButtonGroup } from "@mantine/core/lib/Button/ButtonGroup/ButtonGroup";
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

      <Navbar.Section p="xs">
        <UnstyledButton
          onClick={() => {
            navigateTo("/inicial");
            localStorage.clear();
          }}
        >
          Suite OS
        </UnstyledButton>
      </Navbar.Section>
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
            label="Servicos"
            icon={<IconTool size="1rem" stroke={1.5} />}
          />
          <NavLink
            label="Status"
            icon={<IconHierarchy size="1rem" stroke={1.5} />}
            onClick={() => navigateTo("status")}
          />
          <NavLink
            label="Formas de Pagamentos"
            icon={<IconCash size="1rem" stroke={1.5} />}
          />
        </NavLink>
        <NavLink
          label="Ordem de Sevicos"
          icon={<IconClipboardList size="1rem" stroke={1.5} />}
        />

        <NavLink
          label="Orcamento"
          icon={<IconCoin size="1rem" stroke={1.5} />}
        />
      </Navbar.Section>
      <Navbar.Section>
        <Divider my="sm" />
        {<UserAvatar />}
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarApp;
