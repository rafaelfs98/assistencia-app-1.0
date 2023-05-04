import { supabase } from "./supabase/supabaseClient";
import { ServicosData } from "./Types";

export const insertServicos = async (servico: ServicosData) => {
  await supabase.from("servicos").insert({
    name: servico.name,
    valor: servico.valor,
  });
};

export const updateServicos = async (
  servico: ServicosData,
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
