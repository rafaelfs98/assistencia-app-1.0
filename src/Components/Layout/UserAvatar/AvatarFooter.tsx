import {
  Avatar,
  Box,
  Center,
  Divider,
  Group,
  Menu,
  SegmentedControl,
  Switch,
  Text,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { supabase } from "../../../services/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { UserInfo } from "../../../services/Types/suiteOS";

import {
  IconMoon,
  IconMoonStars,
  IconPower,
  IconSettings,
  IconSun,
  IconTrademark,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const AvatarFooter: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [usuario, setUsuario] = useState<UserInfo>();
  const navigate = useNavigate();

  const getUser = async () => {
    const userSessionStorage =
      sessionStorage.getItem("user") ?? localStorage.getItem("user");

    const userLoggedIn = JSON.parse(userSessionStorage as string);

    setUsuario(userLoggedIn);
  };

  useEffect(() => {
    getUser();
  }, []);

  const navigateTo = (resource: string) => {
    navigate(resource);
  };

  return (
    <Menu shadow="md" width={150} position="top">
      <Menu.Target>
        <UnstyledButton mr={10} ml={5} style={{ display: "block" }}>
          <Group>
            <Avatar color="cyan" radius="xl">
              {usuario?.name?.substring(0, 2)}
            </Avatar>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          <Group position="center">
            <Switch
              checked={colorScheme === "dark"}
              onChange={() => toggleColorScheme()}
              onLabel={
                <IconSun color={theme.white} size="1.25rem" stroke={1.5} />
              }
              offLabel={
                <IconMoonStars
                  color={theme.colors.gray[6]}
                  size="1.25rem"
                  stroke={1.5}
                />
              }
            />
          </Group>
        </Menu.Item>
        <Divider my="sm" />
        {usuario?.role_id === 1 && (
          <Menu.Item
            icon={<IconUsers size={14} />}
            onClick={() => navigateTo("users")}
          >
            Usuarios
          </Menu.Item>
        )}
        <Menu.Item icon={<IconTrademark size={14} />}>Empresa</Menu.Item>
        <Menu.Item icon={<IconUser size={14} />}>Perfil</Menu.Item>
        <Divider my="sm" />
        <Menu.Item
          onClick={async () => {
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");

            navigate("/login");
          }}
          icon={<IconPower size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AvatarFooter;
