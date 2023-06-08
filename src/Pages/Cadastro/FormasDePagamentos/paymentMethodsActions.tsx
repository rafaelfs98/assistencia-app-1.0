import { Menu, UnstyledButton } from "@mantine/core";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePaymentMethods } from "../../../services/PaymentMethods";

const PaymentMethodActions: React.FC<any> = ({ paymentMethodId }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Deseja excluir esta Forma de Pagamento?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deletePaymentMethods(paymentMethodId);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
      alert("Ocorreu um erro ao excluir o Metodo de Pagamento.");
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
            onClick={() => navigate(`${paymentMethodId}/update`)}
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

export default PaymentMethodActions;
