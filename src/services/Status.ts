import { supabase } from "./supabase/supabaseClient";
import { StatusFormData } from "./Types";

export const insertStatus = async (Status: StatusFormData) => {
  await supabase.from("status").insert({
    name: Status.name,
  });
};

export const updateStatus = async (
  Status: StatusFormData,
  StatusId: string
) => {
  const { data } = await supabase
    .from("status")
    .update({
      name: Status.name,
    })
    .eq("id", StatusId);

  return data;
};
export const deleteStatus = async (Status: string) => {
  await supabase.from("status").delete().eq("id", Status);
};
