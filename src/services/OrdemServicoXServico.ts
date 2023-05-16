import { OrdemServicoXServico } from "./Types/suiteOS";
import { supabase } from "./supabase/supabaseClient";

export const insertOrdemServicoXServico = async (os: OrdemServicoXServico) => {
  console.log(os);
  const responseUpsert = await supabase
    .from("ordemservicoXservico")
    .insert({
      ordem_servico_id: os.ordem_servico_id,
      servico_id: os.servico_id,
    })
    .select();

  return responseUpsert;
};
