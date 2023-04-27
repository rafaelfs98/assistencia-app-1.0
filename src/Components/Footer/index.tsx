import {
  Divider,
  Group,
  MediaQuery,
  Menu,
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
import "./footer.css";
import AvatarFooter from "../Layout/UserAvatar/AvatarFooter";

const FooterApp = () => {
  const navigate = useNavigate();

  const navigateTo = (resource: string) => {
    navigate(resource);
  };

  return (
    <MediaQuery largerThan="sm" styles={{ display: "none" }}>
      <footer className="fixed-footer">
        <Group position="apart">
          <Group>
            <UnstyledButton>Suite os</UnstyledButton>
          </Group>

          <Group position="apart">
            <UnstyledButton ml="md">
              <IconClipboardList size="1.5rem" stroke={1.5} />
            </UnstyledButton>
            <UnstyledButton ml="md">
              <IconCoin size="1.5rem" stroke={1.5} />
            </UnstyledButton>

            <Menu shadow="md" width={150} position="top">
              <Menu.Target>
                <UnstyledButton ml="md">
                  {" "}
                  <IconArticle size="1.5rem" stroke={1.5} />
                </UnstyledButton>
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
          </Group>

          <Group>
            <Divider orientation="vertical" />
            <AvatarFooter />
          </Group>
        </Group>
      </footer>
    </MediaQuery>
  );
};

export default FooterApp;
