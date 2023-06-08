import Loading from "../../../Components/Layout/Loader";
import { useSupabase } from "../../../hooks/useSupabase";
import { PaymentMethodData } from "../../../services/Types/suiteOS";
import { useEffect } from "react";
const PaymentMethods: React.FC = () => {
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


      <Table highlightOnHover mb={50} mx={"auto"}>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default PaymentMethods;
