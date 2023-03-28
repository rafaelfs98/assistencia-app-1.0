import {
  Button,
  Menu,
  Popover,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Text } from "@mantine/core";

const ClientesActions: React.FC = () => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton>
          <IconDotsVertical />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconPencil size={14} />}>Edit</Menu.Item>
        <Menu.Item icon={<IconTrash size={14} />}>Delete</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ClientesActions;
