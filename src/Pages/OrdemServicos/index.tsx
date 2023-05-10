import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../../hooks/useSupabase";
import { OrdemServicoType } from "../../services/Types/suiteOS";
import OrdemServicoActions from "./OrdemServicoActions";
import Loading from "../../Components/Layout/Loader";
import { Button, Group, Table, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const OrdemServicos: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useSupabase<OrdemServicoType>({
    uri: "/ordem_servico?order=documento.asc",
  });

  const ths = (
    <tr>
      <th>Ordem de Servico</th>
      <th>Status</th>
      <th></th>
    </tr>
  );

  useEffect(() => {
    document.title = "Servicos";
  }, []);

  const rows = data?.map((item, index) => (
    <tr key={index}>
      <td>{item.documento}</td>
      <td>{item.status}</td>
      <td>
        <OrdemServicoActions osId={String(item.documento)} />
      </td>
    </tr>
  ));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Group position="left">
        <Title order={3}>Ordem Servico</Title>
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

export default OrdemServicos;
