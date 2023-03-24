import { Divider, Menu, Navbar, NavLink } from "@mantine/core";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../UserAvatar";

const NavbarApp: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 250 }}
      hidden={opened}
    >
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
            onClick={() => navigate("/clientes")}
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
