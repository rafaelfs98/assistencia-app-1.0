import { supabase } from "./supabase/supabaseClient";
import { ClientesFormData, ServicosFormData } from "./Types";

export const insertServicos = async (servico: ServicosFormData) => {
  await supabase.from("servicos").insert({
    name: servico.name,
    valor: servico.valor,
  });
};

export const updateServicos = async (
  servico: ServicosFormData,
  servicoId: string
) => {
  await supabase
    .from("servicos")
    .update({
      name: servico.name,
      valor: servico.valor,
    })
    .eq("id", servicoId);
};
export const deleteServicos = async (servicoId: string) => {
  await supabase.from("servicos").delete().eq("id", servicoId);
};
