import { Menu, UnstyledButton } from "@mantine/core";
import { IconDotsVertical, IconPencil } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

type UserActionsProps = {
  userId: string;
};

const UserActions: React.FC<UserActionsProps> = ({ userId }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton>
            <IconDotsVertical />
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            onClick={() => navigate(`${userId}/update`)}
            icon={<IconPencil size={14} />}
          >
            Editar
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default UserActions;
