import { supabase } from "./supabase/supabaseClient";
import { EquipamentosData, ServicosData } from "./Types/suiteOS";

export const insertEquipamento = async (equipamento: EquipamentosData) => {
  await supabase.from("equipamentos").insert({
    marca: equipamento.marca,
    modelo: equipamento.modelo,
    cor: equipamento.cor,
    serie: equipamento.serie,
    clienteId: equipamento.clienteId,
  });
};

export const updateEquipamento = async (
  equipamento: EquipamentosData,
  equipamentoId: string
) => {
  await supabase
    .from("equipamentos")
    .update({
      marca: equipamento.marca,
      modelo: equipamento.modelo,
      cor: equipamento.cor,
      serie: equipamento.serie,
      clienteId: equipamento.clienteId,
    })
    .eq("id", equipamentoId);
};
export const deleteEquipamento = async (equipamentoId: string) => {
  await supabase.from("equipamentos").delete().eq("id", equipamentoId);
};
