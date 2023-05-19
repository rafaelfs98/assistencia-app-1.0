import { RecebimentoData } from "./Types/suiteOS";
import { supabase } from "./supabase/supabaseClient";

export const insertRecebimento = async (os: RecebimentoData) => {
  const responseUpsert = await supabase
    .from("recebimento")
    .insert({
      forma_pagamento: os.forma_pagamento,
      ordem_servico_id: os.ordem_servico_id,
      valor_pago: os.valor_pago,
    })
    .select();

  return responseUpsert;
};
export const deleteRecebimento = async (id: string) => {
  const responseDelete = supabase.from("recebimento").delete().eq("id", id);

  return responseDelete;
};
