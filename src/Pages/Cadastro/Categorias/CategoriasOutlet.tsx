import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { supabase } from "../../../services/supabase/supabaseClient";
import { CategoriasFormData } from "../../../services/Types";

type CategoriaOutletContextType = {
  categoria: CategoriasFormData[];
};

const CategoriasOutlet = () => {
  const { categoriaId } = useParams<{ categoriaId: string }>();

  const [categoria, setCategoria] = useState<CategoriasFormData[]>();

  useEffect(() => {
    const fetchCliente = async () => {
      const { data, error } = await supabase
        .from("categorias")
        .select()
        .eq("id", categoriaId);

      if (error) {
        console.error("Erro ao buscar cliente:", error);
      } else {
        setCategoria(data as CategoriasFormData[]);
      }
    };

    fetchCliente();
  }, [categoriaId]);

  if (categoria) {
    const contextValue: CategoriaOutletContextType = {
      categoria,
    };

    return <Outlet context={contextValue} />;
  }

  return null;
};

export default CategoriasOutlet;
