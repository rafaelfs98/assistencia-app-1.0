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
import { ClientesData } from "../../../services/Types/suiteOS";

import ClientesActions from "./ClientesActions";
import { useEffect } from "react";

const Clientes: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useSupabase<ClientesData>({
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

  useEffect(() => {
    document.title = "Clientes";
  }, []);

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

      <Table highlightOnHover mb={50} mx={"auto"}>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default Clientes;
