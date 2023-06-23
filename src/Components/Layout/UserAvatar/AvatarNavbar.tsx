import {
  Avatar,
  Box,
  Center,
  Divider,
  Group,
  Menu,
  SegmentedControl,
  Text,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { LoginType } from "../../../services/Types/suiteOS";

import {
  IconMoon,
  IconPower,
  IconSun,
  IconTrademark,
  IconUser,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const AvatarNavbar = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [usuario, setUsuario] = useState<LoginType>();
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

  return (
    <Menu shadow="md" width={200} position="top-end">
      <Menu.Target>
        <UnstyledButton ml={5} style={{ display: "block" }}>
          <Group>
            <Avatar color="cyan" radius="xl">
              {usuario?.name?.substring(0, 2)}
            </Avatar>
            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {usuario?.name}
              </Text>

              <Text color="dimmed" size="xs">
                {usuario?.email}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>
          <Group position="center" my="xl">
            <SegmentedControl
              value={colorScheme}
              onChange={(value: "light" | "dark") => toggleColorScheme(value)}
              data={[
                {
                  value: "light",
                  label: (
                    <Center>
                      <IconSun size="1rem" stroke={1.5} />
                      <Box ml={10}>Light</Box>
                    </Center>
                  ),
                },
                {
                  value: "dark",
                  label: (
                    <Center>
                      <IconMoon size="1rem" stroke={1.5} />
                      <Box ml={10}>Dark</Box>
                    </Center>
                  ),
                },
              ]}
            />
          </Group>
        </Menu.Item>
        <Menu.Item icon={<IconTrademark size={14} />}>Empresa</Menu.Item>
        <Menu.Item icon={<IconUser size={14} />}>Perfil</Menu.Item>
        <Divider my="sm" />
        <Menu.Item
          onClick={async () => {
            sessionStorage.removeItem("user");
            localStorage.removeItem("user");

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

export default AvatarNavbar;
