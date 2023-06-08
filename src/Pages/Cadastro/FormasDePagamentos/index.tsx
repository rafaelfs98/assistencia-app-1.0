import { Button, Group, Table, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Layout/Loader";
import { useSupabase } from "../../../hooks/useSupabase";
import { PaymentMethodData } from "../../../services/Types/suiteOS";
import { useEffect } from "react";
const PaymentMethods: React.FC = () => {
  const navigate = useNavigate();
  document.title = "Forma de pagamento";

  const { data, isLoading } = useSupabase<PaymentMethodData>({
    uri: "/PaymentMethods?order=id.asc",
  });

  const ths = (
    <tr>
      <th>Forma de Pagamento</th>
      <th></th>
    </tr>
  );

  const rows = data?.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>
      </td>
    </tr>
  ));

  useEffect(() => {
    document.title = "Formas de Pagamentos";
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Group position="left">
        <Title order={3}>Formas de Pagamentos</Title>
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

export default PaymentMethods;
