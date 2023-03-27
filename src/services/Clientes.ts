import { supabase } from "./supabase/supabaseClient";
import { ClientesFormData } from "./Types";

export const insertClientes = async (clientes: ClientesFormData) => {
  await supabase.from("clientes").insert({
    name: clientes.nome,
    email: clientes.email,
    endereco: clientes.endereco,
  });
};
