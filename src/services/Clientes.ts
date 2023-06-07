import { supabase } from "./supabase/supabaseClient";
import { ClientesData } from "./Types/suiteOS";

export const upsertCliente = async (
  cliente: ClientesData,
  clienteId: number
) => {
  const responseCliente = await supabase
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

  return responseCliente;
};
export const deleteCliente = async (clienteId: string) => {
  await supabase.from("Client").delete().eq("id", clienteId);
};
