import { Button, Group, Table, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Layout/Loader";
import { useSupabase } from "../../../hooks/useSupabase";
import { EquipamentosData } from "../../../services/Types/suiteOS";

import { useEffect } from "react";
import ClientesActions from "../Clientes/ClientesActions";

const Equipamentos: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useSupabase<EquipamentosData>({
    uri: `/equipamentos?order=id.asc`,
  });

  const ths = (
    <tr>
      <th>Equipamento</th>
      <th>Cliente</th>
      <th></th>
    </tr>
  );

  const rows = data?.map((item, index) => (
    <tr key={index}>
      <td onClick={() => navigate(`${item?.id}/view`)}>
        {item.modelo + "," + item.marca}
      </td>
      <td>{item.cliente_name}</td>

      <td>
        <ClientesActions clienteId={String(item?.id)} />
      </td>
    </tr>
  ));

  useEffect(() => {
    document.title = "Equipamentos";
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Group position="left">
        <Title order={3}>Equipamentos</Title>
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

export default Equipamentos;
