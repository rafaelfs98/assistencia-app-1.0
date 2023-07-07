import { supabase } from "./supabase/supabaseClient";
import { OrdemServicoType } from "./Types/suiteOS";

export const upsertOrdemServicos = async (
  os: OrdemServicoType,
  osId: number
) => {
  const { data, error } = await supabase
    .from("ServiceOrder")
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

  if (error) {
    throw Error(error?.message);
  }

  console.log(data);

  return data as OrdemServicoType[];
};

export const deleteOrdemServicos = async (osId: string) => {
  const responseDelete = supabase
    .from("ServiceOrder")
    .delete()
    .eq("documento", osId);

  return responseDelete;
};
