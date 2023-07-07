import { supabase } from "./supabase/supabaseClient";
import { ServicosData } from "./Types/suiteOS";

export const upsertServicos = async (
  servico: ServicosData,
  servicoId: number
) => {
  const { data, error } = await supabase
    .from("Service")
    .upsert({
      id: servicoId ? servicoId : undefined,
      name: servico.name,
      valor: servico.valor,
    })
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as ServicosData[];
};
export const deleteServicos = async (servicoId: string) => {
  const responseDelete = supabase.from("Service").delete().eq("id", servicoId);

  return responseDelete;
};
