import { Outlet, useParams } from "react-router-dom";
import { useSupabase } from "../../../hooks/useSupabase";
import { ClientesFormData } from "../../../services/Types";
import { useEffect } from "react";

const ClientesOutlet = () => {
  const { clienteId } = useParams<{ clienteId: string }>();

  const { data: cliente, mutate: mutateCliente } =
    useSupabase<ClientesFormData>({
      uri: `/clientes?id=eq.${clienteId}`,
    });

  useEffect(() => {
    if (cliente) {
      document.title = `${cliente?.map((item) => item.name)}`;
    }
  }, []);

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
