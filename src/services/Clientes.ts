import { supabase } from "./supabase/supabaseClient";
import { ClientesData } from "./Types/suiteOS";

export const insertCliente = async (cliente: ClientesData) => {
  await supabase.from("clientes").insert({
    bairro: cliente.bairro,
    cep: cliente.cep,
    cidade: cliente.cidade,
    complemento: cliente.complemento,
    email: cliente.email,
    logradouro: cliente.logradouro,
    name: cliente.name,
    numero: cliente.numero,
    telefone: cliente.telefone,
  });
};

export const updateCliente = async (
  cliente: ClientesData,
  clienteId: string
) => {
  await supabase
    .from("clientes")
    .update({
      bairro: cliente.bairro,
      cep: cliente.cep,
      cidade: cliente.cidade,
      complemento: cliente.complemento,
      email: cliente.email,
      logradouro: cliente.logradouro,
      name: cliente.name,
      numero: cliente.numero,
      telefone: cliente.telefone,
    })
    .eq("id", clienteId);
};
export const deleteCliente = async (clienteId: string) => {
  await supabase.from("clientes").delete().eq("id", clienteId);
};
