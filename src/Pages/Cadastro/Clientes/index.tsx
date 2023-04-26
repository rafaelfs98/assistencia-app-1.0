import {
  AspectRatio,
  Button,
  Center,
  Container,
  Group,
  Table,
  Title,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Layout/Loader";
import { useSupabase } from "../../../hooks/useSupabase";
import { ClientesFormData } from "../../../services/Types";

import ClientesActions from "./ClientesActions";

const Clientes: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useSupabase<ClientesFormData>({
    uri: `/clientes?order=id.asc`,
  });

  const ths = (
    <tr>
      <th>Nome</th>
      <th>Telefone</th>
      <th></th>
    </tr>
  );

  const rows = data?.map((item, index) => (
    <tr key={index}>
      <td onClick={() => navigate(`${item?.id}/view`)}>{item.name}</td>
      <td>{item.telefone}</td>

      <td>
        <ClientesActions clienteId={String(item?.id)} />
      </td>
    </tr>
  ));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Group position="left">
        <Title order={3}>Clientes</Title>
      </Group>

      <Group
        position="right"
        mr={10}
        style={{ display: "flex", justifyContent: "end" }}
      >
        <Button onClick={() => navigate("create")}>
          <IconPlus size="1rem" />
        </Button>
      </Group>

      <Table highlightOnHover>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default Clientes;
