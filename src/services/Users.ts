import { supabase } from "./supabase/supabaseClient";
import { UserInfo } from "./Types/suiteOS";

export const upsertUser = async (user: UserInfo, userId: number) => {
  const { data, error } = await supabase
    .from("Users")
    .upsert({
      id: userId ? userId : undefined,
      name: user.name,
      email: user.email,
      senha: user.senha,
      usuario: user.usuario,
      role_id: user.role_id,
      empresa_id: 1,
    })
    .select();

  if (error) {
    throw Error(error?.message);
  }

  return data as UserInfo[];
};
export const deleteStatus = async (userId: string) => {
  await supabase.from("Users").delete().eq("id", userId);
};
