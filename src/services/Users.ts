import { supabase } from "./supabase/supabaseClient";
import { UserInfo } from "./Types/suiteOS";

export const upsertUser = async (user: UserInfo, userId: number) => {
  const responseUser = await supabase
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

  return responseUser;
};
export const deleteStatus = async (userId: string) => {
  await supabase.from("Users").delete().eq("id", userId);
};
