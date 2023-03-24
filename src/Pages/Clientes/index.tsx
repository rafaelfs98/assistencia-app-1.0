import { Button, Group, Loader, Table } from "@mantine/core";
import { IconArticle, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Clientes = () => {
  const navigate = useNavigate();

  return (
    <>
      <Group position="right">
        <Button onClick={() => navigate("create")}>
          <IconPlus size="1rem" />
        </Button>
      </Group>

      <Table>
        <thead>
          <tr>
            <th>Element position</th>
            <th>Element name</th>
            <th>Symbol</th>
            <th>Atomic mass</th>
          </tr>
        </thead>
      </Table>
    </>
  );
};

export default Clientes;
