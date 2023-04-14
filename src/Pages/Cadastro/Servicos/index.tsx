import { Button, Group, Table } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ServicosFormData, StatusFormData } from "../../../services/Types";
import { useSupabase } from "../../../hooks/useSupabase";
import Loading from "../../../Components/Layout/Loader";
import ServicosActions from "./ServicosActions";

const Servicos: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useSupabase<ServicosFormData>({
    uri: "/servicos?order=id.asc",
  });

  const ths = (
    <tr>
      <th>Servicos</th>
      <th>Valor</th>
      <th></th>
    </tr>
  );

  const rows = data?.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{item.valor}</td>
      <td>
        <ServicosActions StatusId={String(item?.id)} />
      </td>
    </tr>
  ));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Group position="right" mb="xl" mr="lg">
        <Button onClick={() => navigate("create")}>
          <IconPlus size="1rem" />
        </Button>
      </Group>

      <Table highlightOnHover mx={"auto"}>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default Servicos;
