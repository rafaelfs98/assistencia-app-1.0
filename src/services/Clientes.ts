import { ClientesData } from "./Types/suiteOS";
import { supabase } from "./supabase/supabaseClient";

export const upsertCliente = async (
  cliente: ClientesData,
  clienteId: number
) => {
  const { data, error } = await supabase
    .from("Client")
    .upsert({
      id: clienteId ? clienteId : undefined,
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
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as ClientesData[];
};
export const deleteCliente = async (clienteId: string) => {
  await supabase.from("Client").delete().eq("id", clienteId);
};
