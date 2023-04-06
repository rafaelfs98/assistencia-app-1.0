import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { supabase } from "../../../services/supabase/supabaseClient";
import { CategoriasFormData } from "../../../services/Types";
import useSWR from "swr";
import { useSupabase } from "../../../hooks/useSupabase";

const CategoriasOutlet = () => {
  const { categoriaId } = useParams<{ categoriaId: string }>();

  const { data: categoria, mutate: mutateCategoria } =
    useSupabase<CategoriasFormData>({
      table: "categorias",
      order: "id",
      ascending: true,
    });

  if (categoria) {
    return (
      <Outlet
        context={{
          categoria,
          mutateCategoria,
        }}
      />
    );
  }

  return null;
};

export default CategoriasOutlet;
