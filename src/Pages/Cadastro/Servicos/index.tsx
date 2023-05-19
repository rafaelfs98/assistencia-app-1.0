import { Button, Group, Table, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ServicosData } from "../../../services/Types/suiteOS";
import { useSupabase } from "../../../hooks/useSupabase";
import Loading from "../../../Components/Layout/Loader";
import ServicosActions from "./ServicosActions";
import { useEffect } from "react";

const Servicos: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useSupabase<ServicosData>({
    uri: "/servicos?order=id.asc",
  });

  const ths = (
    <tr>
      <th>Nome</th>
      <th>Valor</th>
      <th></th>
    </tr>
  );

  useEffect(() => {
    document.title = "Servicos";
  }, []);

  const rows = data?.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{`R$ ${item.valor.toFixed(2).replace(".", ",")}`}</td>
      <td>
        <ServicosActions servicoId={item.id} />
      </td>
    </tr>
  ));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Group position="left">
        <Title order={3}>Servicos</Title>
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

export default Servicos;
