import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { supabase } from "../../../services/supabase/supabaseClient";
import { ClientesFormData } from "../../../services/Types";

type ClienteOutletContextType = {
  cliente: ClientesFormData[];
};

const ClientesOutlet = () => {
  const { clienteId } = useParams<{ clienteId: string }>();

  const [cliente, setCliente] = useState<ClientesFormData[]>();

  useEffect(() => {
    const fetchCliente = async () => {
      const { data, error } = await supabase
        .from("clientes")
        .select()
        .eq("id", clienteId);

      if (error) {
        console.error("Erro ao buscar cliente:", error);
      } else {
        setCliente(data as ClientesFormData[]);
      }
    };

    fetchCliente();
  }, [clienteId]);

  if (cliente) {
    const contextValue: ClienteOutletContextType = {
      cliente,
    };

    return <Outlet context={contextValue} />;
  }

  return null;
};

export default ClientesOutlet;
