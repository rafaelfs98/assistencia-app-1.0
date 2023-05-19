import { Menu, UnstyledButton } from "@mantine/core";
import {
  IconCheck,
  IconCoin,
  IconDotsVertical,
  IconPencil,
  IconPrinter,
  IconTrash,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteOrdemServicos } from "../../services/OrdemServicos";

type OsProps = {
  osId: string;
};

const OrderServiceActions: React.FC<OsProps> = ({ osId }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Deseja excluir este serviço?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteOrdemServicos(osId);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
      alert("Ocorreu um erro ao excluir o serviço.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton>
            <IconDotsVertical />
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            onClick={() => navigate(`${osId}/update`)}
            icon={<IconPencil size={14} />}
          >
            Editar
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate(`${osId}/encerrar`)}
            icon={<IconCheck size={16} />}
          >
            Encerrar
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate(`${osId}/pagamento`)}
            icon={<IconCoin size={16} />}
          >
            Pagamento
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate(`${osId}/update`)}
            icon={<IconPrinter size={14} />}
          >
            Imprimir
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
    </div>
  );
};

export default OrderServiceActions;
