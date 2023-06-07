import { supabase } from "./supabase/supabaseClient";
import { EquipamentosData } from "./Types/suiteOS";

export const upsertEquipamento = async (
  equipamento: EquipamentosData,
  equipamentoId: number
) => {
  const responseEquipamento = await supabase
    .from("Equipment")
    .upsert({
      id: equipamentoId ? equipamentoId : undefined,
      marca: equipamento.marca,
      modelo: equipamento.modelo,
      cor: equipamento.cor,
      serie: equipamento.serie,
      cliente_id: equipamento.cliente_id,
    })
    .select();

  return responseEquipamento;
};
export const deleteEquipamento = async (equipamentoId: string) => {
  await supabase.from("Equipment").delete().eq("id", equipamentoId);
};

export const getCliente = async (clienteId: string) => {
  const responseClinte = await supabase
    .from("Client")
    .select()
    .eq("id", clienteId);

  return responseClinte;
};
