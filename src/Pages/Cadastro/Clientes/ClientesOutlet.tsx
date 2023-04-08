import { Outlet, useParams } from "react-router-dom";
import { useSupabase } from "../../../hooks/useSupabase";
import { ClientesFormData } from "../../../services/Types";

const ClientesOutlet = () => {
  const { clienteId } = useParams<{ clienteId: string }>();

  const { data: cliente, mutate: mutateCliente } =
    useSupabase<ClientesFormData>({
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
