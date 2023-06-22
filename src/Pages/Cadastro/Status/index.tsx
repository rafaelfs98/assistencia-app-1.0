import { Button, Group, Table, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loader";
import { useSupabase } from "../../../hooks/useSupabase";
import { StatusData } from "../../../services/Types/suiteOS";
import StatusActions from "./StatusActions";
import { useEffect } from "react";

const Status: React.FC = () => {
  const navigate = useNavigate();
  document.title = "Status";

  const { data, isLoading } = useSupabase<StatusData>({
    uri: "/Status?order=id.asc",
  });

  const ths = (
    <tr>
      <th>Name</th>
      <th></th>
    </tr>
  );

  const rows = data?.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>
        <StatusActions StatusId={String(item?.id)} />
      </td>
    </tr>
  ));

  useEffect(() => {
    document.title = "Status";
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Group position="left">
        <Title order={3}>Status</Title>
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

export default Status;
