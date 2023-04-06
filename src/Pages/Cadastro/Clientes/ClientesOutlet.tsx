import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSupabase } from "../../../hooks/useSupabase";
import { supabase } from "../../../services/supabase/supabaseClient";
import { ClientesFormData } from "../../../services/Types";

type ClienteOutletContextType = {
  cliente: ClientesFormData[];
};

const ClientesOutlet = () => {
  const { clienteId } = useParams<{ clienteId: string }>();

  const { data: cliente, mutate: mutateCliente } =
    useSupabase<ClientesFormData>({
      table: "clientes",
      order: "id",
      ascending: true,
      eq: { value: "id", id: clienteId as string },
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
