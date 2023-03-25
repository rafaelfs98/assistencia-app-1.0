import { Button, Code, Group, Loader, Table, Text } from "@mantine/core";
import { IconArticle, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

type ClientesData = {
  email: string;
  endereco: string;
  nome: string;
  telefone: string;
};

const Clientes = () => {
  const navigate = useNavigate();

  const clienteString = localStorage.getItem("clientes");

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
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Endereço</th>
          </tr>
        </thead>
      </Table>

      <Text>{clienteString}</Text>
    </>
  );
};

export default Clientes;
