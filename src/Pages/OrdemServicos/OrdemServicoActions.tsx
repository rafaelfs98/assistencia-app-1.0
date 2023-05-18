import { useNavigate } from "react-router-dom";
import { deleteOrdemServicos } from "../../services/OrdemServicos";
import { Menu, UnstyledButton } from "@mantine/core";
import {
  IconCheck,
  IconDotsVertical,
  IconPdf,
  IconPencil,
  IconPin,
  IconPrinter,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

type OsProps = {
  osId: string;
};

const OrdemServicosActions: React.FC<OsProps> = ({ osId }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Deseja excluir este servico?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteOrdemServicos(osId);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
      alert("Ocorreu um erro ao excluir o servico.");
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
            onClick={() => navigate(`${osId}/fechar`)}
            icon={<IconCheck size={16} />}
          >
            Encerrar
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

export default OrdemServicosActions;
