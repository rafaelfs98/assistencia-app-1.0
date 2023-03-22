import { Divider, Navbar, NavLink } from "@mantine/core";
import {
  IconArticle,
  IconBarcode,
  IconChevronRight,
  IconGauge,
  IconUserCircle,
} from "@tabler/icons-react";
import { useState } from "react";
import UserAvatar from "../UserAvatar";

const Sidebar: React.FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 250 }}
      hidden={!opened}
    >
      <Navbar.Section>Rafael Dev</Navbar.Section>
      <Divider my="sm" />

      <Navbar.Section grow mt="md">
        <NavLink
          label="Cadastro"
          icon={<IconArticle size="1rem" stroke={1.5} />}
          rightSection={<IconChevronRight />}
        >
          <NavLink
            label="Cliente"
            icon={<IconUserCircle size="1rem" stroke={1.5} />}
            rightSection={<IconChevronRight />}
          />
        </NavLink>
        <NavLink
          label="Produto"
          icon={<IconBarcode size="1rem" stroke={1.5} />}
          rightSection={<IconChevronRight />}
        />
      </Navbar.Section>
      <Divider my="sm" />
      <Navbar.Section>{<UserAvatar />}</Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
