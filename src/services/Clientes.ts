import { supabase } from "./supabase/supabaseClient";
import { ClientesFormData } from "./Types";

export const insertClientes = async (clientes: ClientesFormData) => {
  await supabase.from("clientes").insert({
    bairro: clientes.bairro,
    cep: clientes.cep,
    cidade: clientes.cidade,
    complemento: clientes.complemento,
    email: clientes.email,
    logradouro: clientes.logradouro,
    name: clientes.name,
    numero: clientes.numero,
    telefone: clientes.telefone,
  });
};
