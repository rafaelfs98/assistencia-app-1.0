import {
  Avatar,
  Divider,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { supabase } from "../../../services/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { LoginForm } from "../../../services/Types";

import {
  IconPower,
  IconSettings,
  IconTrademark,
  IconUser,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const UserAvatar: React.FC = () => {
  const [usuario, setUsuario] = useState<LoginForm[]>();
  const navigate = useNavigate();

  const logoutUser = () => {
    supabase.auth.signOut();

    navigate("/");
  };

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from("users")
        .select()
        .eq("email", user?.email)
        .then((response) => setUsuario(response?.data as any));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Menu shadow="md" width={200} position="top-end">
      <Menu.Target>
        <UnstyledButton style={{ display: "block" }}>
          <Group>
            <div>
              <Text>{usuario?.map((user) => user?.name)}</Text>
              <Text size="xs" color="dimmed">
                {usuario?.map((user) => user?.email)}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconTrademark size={14} />}>Empresa</Menu.Item>
        <Menu.Item icon={<IconUser size={14} />}>Perfil</Menu.Item>
        <Menu.Item icon={<IconSettings size={14} />}>
          Configuracao de Relatorio
        </Menu.Item>
        <Divider my="sm" />
        <Menu.Item
          onClick={async () => {
            await supabase.auth.signOut();

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

export default UserAvatar;
