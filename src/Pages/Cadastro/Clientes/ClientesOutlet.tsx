import { Outlet, useParams } from "react-router-dom";
import { useSupabase } from "../../../hooks/useSupabase";
import { ClientesData } from "../../../services/Types/suiteOS";

const ClientesOutlet = () => {
  const { clienteId } = useParams<{ clienteId: string }>();

  const { data: cliente, mutate: mutateCliente } = useSupabase<ClientesData>({
    uri: `/clientes?id=eq.${clienteId}`,
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
