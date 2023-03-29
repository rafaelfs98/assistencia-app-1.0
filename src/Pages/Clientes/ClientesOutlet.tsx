import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { supabase } from "../../services/supabase/supabaseClient";
import { ClientesFormData } from "../../services/Types";

const ClientesOutlet = () => {
  const { clienteId } = useParams();

  const [cliente, setCliente] = useState<ClientesFormData[]>();

  useEffect(() => {
    supabase
      .from("clientes")
      .select()
      .eq("id", clienteId)
      .then((response) => setCliente(response?.data as any));
  }, []);

  if (cliente) {
    return (
      <Outlet
        context={{
          cliente,
        }}
      />
    );
  }
  return null;
};

export default ClientesOutlet;
