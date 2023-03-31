import { Menu, UnstyledButton } from "@mantine/core";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { deleteCliente } from "../../services/Clientes";

type ClientesActionsProps = {
  clienteId: string;
};

const ClientesActions: React.FC<ClientesActionsProps> = ({ clienteId }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Deseja excluir este cliente?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteCliente(clienteId);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
      alert("Ocorreu um erro ao excluir o cliente.");
    }
  };

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
          Editar
        </Menu.Item>
        <Menu.Item
          onClick={handleDelete}
          icon={<IconTrash size={14} />}
          disabled={isDeleting}
        >
          {isDeleting ? "Excluindo..." : "Excluir"}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ClientesActions;
