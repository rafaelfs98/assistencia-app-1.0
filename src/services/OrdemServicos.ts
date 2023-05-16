import { supabase } from "./supabase/supabaseClient";
import { OrdemServicoType, OrdemServicoXServico } from "./Types/suiteOS";

export const upsertOrdemServicos = async (
  os: OrdemServicoType,
  osId: number
) => {
  const responseUpsert = await supabase
    .from("ordem_servico")
    .upsert({
      acessorios: os.acessorios,
      data_entrada: os.data_entrada,
      data_saida: os.data_saida,
      defeito: os.defeito,
      documento: osId ? osId : undefined,
      equipamento_id: Number(os.equipamento_id),
      observacao: os.observacao,
      solucao: os.solucao,
      status: os.status,
    })
    .select();

  return responseUpsert;
};

export const deleteOrdemServicos = async (osId: string) => {
  const responseDelete = supabase
    .from("ordem_servico")
    .delete()
    .eq("documento", osId);

  return responseDelete;
};
