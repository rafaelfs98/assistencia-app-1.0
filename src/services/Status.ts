import { supabase } from "./supabase/supabaseClient";
import { StatusData } from "./Types/suiteOS";

export const insertStatus = async (Status: StatusData) => {
  await supabase.from("status").insert({
    name: Status.name,
  });
};

export const updateStatus = async (Status: StatusData, StatusId: string) => {
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
