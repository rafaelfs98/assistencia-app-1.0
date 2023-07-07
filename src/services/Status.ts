import { supabase } from "./supabase/supabaseClient";
import { StatusData } from "./Types/suiteOS";

export const upsertStatus = async (status: StatusData, statusId: number) => {
  const { data, error } = await supabase
    .from("Status")
    .upsert({
      id: statusId ? statusId : undefined,
      name: status.name,
    })
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as StatusData[];
};
export const deleteStatus = async (Status: string) => {
  await supabase.from("Status").delete().eq("id", Status);
};
