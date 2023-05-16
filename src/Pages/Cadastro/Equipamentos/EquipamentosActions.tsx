import { Menu, UnstyledButton } from "@mantine/core";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEquipamento } from "../../../services/Equipamentos";

type EquipamentosProps = {
  equipamentoId: string;
};

const EquipamentosActions: React.FC<EquipamentosProps> = ({
  equipamentoId,
}) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Deseja excluir este equipemanto?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteEquipamento(equipamentoId);
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
            onClick={() => navigate(`${equipamentoId}/update`)}
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
    </div>
  );
};

export default EquipamentosActions;
