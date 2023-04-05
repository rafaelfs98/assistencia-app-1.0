import { supabase } from "./supabase/supabaseClient";
import { CategoriasFormData } from "./Types";

export const insertCategoria = async (categoria: CategoriasFormData) => {
  await supabase.from("categorias").insert({
    name: categoria.name,
  });
};

export const updateCategoria = async (
  categoria: CategoriasFormData,
  categoriaId: string
) => {
  await supabase
    .from("categorias")
    .update({
      name: categoria.name,
    })
    .eq("id", categoriaId);
};
export const deleteCategoria = async (categoria: string) => {
  await supabase.from("categorias").delete().eq("id", categoria);
};
