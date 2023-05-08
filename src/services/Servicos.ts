import { supabase } from "./supabase/supabaseClient";
import { ServicosData } from "./Types/suiteOS";

export const upsertServicos = async (
  servico: ServicosData,
  servicoId: string
) => {
  const responseUpsert = await supabase
    .from("servicos")
    .upsert({
      id: Number(servicoId) || undefined,
      name: servico.name,
      valor: servico.valor,
    })
    .select();

  return responseUpsert;
};
export const deleteServicos = async (servicoId: string) => {
  const responseDelete = supabase.from("servicos").delete().eq("id", servicoId);

  return responseDelete;
};
