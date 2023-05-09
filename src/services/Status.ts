import { supabase } from "./supabase/supabaseClient";
import { StatusData } from "./Types/suiteOS";

export const upsertStatus = async (status: StatusData, statusId: number) => {
  const responseStatus = await supabase
    .from("status")
    .upsert({
      id: statusId ? statusId : undefined,
      name: status.name,
    })
    .select();

  return responseStatus;
};
export const deleteStatus = async (Status: string) => {
  await supabase.from("status").delete().eq("id", Status);
};
