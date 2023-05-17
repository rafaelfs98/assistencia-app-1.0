import { ServicoToOrdemServico } from "./Types/suiteOS";
import { supabase } from "./supabase/supabaseClient";

export const insertServicoToOrdemServico = async (
  os: ServicoToOrdemServico
) => {
  const responseUpsert = await supabase
    .from("servicoToOrdemServico")
    .insert({
      ordem_servico_id: os.ordem_servico_id,
      servico_id: os.servico_id,
    })
    .select();

  return responseUpsert;
};
export const deleteServicoToOrdemServicos = async (servicoId: string) => {
  const responseDelete = supabase
    .from("servicoToOrdemServico")
    .delete()
    .eq("id", servicoId);

  return responseDelete;
};
