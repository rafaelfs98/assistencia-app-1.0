import { Button, Group, Table } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { StatusFormData } from "../../../services/Types";
import StatussActions from "./StatusActions";
import { useSupabase } from "../../../hooks/useSupabase";
import Loading from "../../../Components/Layout/Loader";

const Statuss: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useSupabase<StatusFormData>({
    uri: "/status?order=id.asc",
  });

  const ths = (
    <tr>
      <th>Status</th>
      <th></th>
    </tr>
  );

  const rows = data?.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>
        <StatussActions StatusId={String(item?.id)} />
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

export default Statuss;
