import {
  Burger,
  Divider,
  MediaQuery,
  Navbar,
  NavLink,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import {
  IconArticle,
  IconCash,
  IconChevronRight,
  IconClipboardList,
  IconCoin,
  IconHierarchy,
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
    <Navbar width={{ base: 80 }} p="md">
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
          <NavLink
            label="Clientes"
            icon={<IconUsers size="1rem" stroke={1.5} />}
            onClick={() => navigateTo("clientes")}
          />

          <NavLink
            label="Servicos"
            icon={<IconTool size="1rem" stroke={1.5} />}
            onClick={() => navigateTo("servicos")}
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
