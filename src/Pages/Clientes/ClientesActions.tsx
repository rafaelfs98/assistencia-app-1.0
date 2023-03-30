import { Menu, UnstyledButton } from "@mantine/core";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";

import { useNavigate } from "react-router-dom";
import { deleteCliente } from "../../services/Clientes";

type ClientesActionsProps = {
  clienteId: string;
};

const ClientesActions: React.FC<ClientesActionsProps> = ({ clienteId }) => {
  const navigate = useNavigate();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton>
          <IconDotsVertical />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() => navigate(`${clienteId}/update`)}
          icon={<IconPencil size={14} />}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            if (!confirm("deseja excluir este cliente?")) {
              return;
            }
            deleteCliente(clienteId).then(() => window.location.reload());
          }}
          icon={<IconTrash size={14} />}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ClientesActions;
