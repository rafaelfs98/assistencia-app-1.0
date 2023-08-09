import { Outlet, useParams } from "react-router-dom";
import { useSupabase } from "../../../hooks/useSupabase";
import { ClientesData } from "../../../services/Types/suiteOS";
import { useFetcher } from "../../../hooks/useFetcher";

const ClientesOutlet = () => {
  const { clienteId } = useParams<{ clienteId: string }>();

  const { data: cliente, mutate: mutateCliente } = useFetcher<ClientesData>({
    uri: `/cliente/${clienteId}`,
  });

  if (cliente) {
    return (
      <Outlet
        context={{
          cliente,
          mutateCliente,
        }}
      />
    );
  }

  return null;
};

export default ClientesOutlet;
