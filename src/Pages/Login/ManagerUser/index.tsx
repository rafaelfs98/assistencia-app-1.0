import { Button, Group, Table, Title } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Loader";
import { useSupabase } from "../../../hooks/useSupabase";
import { UserInfo } from "../../../services/Types/suiteOS";
import { IconPlus } from "@tabler/icons-react";
import UserActions from "./userActions";

const ManagerUser = () => {
  const navigate = useNavigate();

  document.title = "Usuarios";

  const { data: users, isLoading } = useSupabase<UserInfo>({
    uri: "/Users?order=id.asc",
  });

  const columns = (
    <tr>
      <th>Nome</th>
      <th>Usuario</th>
      <th>Email</th>
      <th></th>
    </tr>
  );

  const rows = users?.map((user, index) => (
    <tr key={index}>
      <td>{user.name}</td>
      <td>{user.usuario}</td>
      <td>{user.email}</td>
      <td>
        <UserActions userId={String(user?.id)} />
      </td>
    </tr>
  ));

  useEffect(() => {
    document.title = "Usuarios";
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Group position="left">
        <Title order={3}>Usuarios</Title>
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
        <thead>{columns}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default ManagerUser;
