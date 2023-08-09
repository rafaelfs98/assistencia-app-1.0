import axios from "axios";
import { supabase } from "./supabase/supabaseClient";
import { UserInfo } from "./Types/suiteOS";

export const upsertUser = async (user: UserInfo, userId: number) => {
  const { data, error } = await supabase
    .from("Users")
    .upsert({
      id: userId ? userId : undefined,
      name: user.name,
      email: user.email,
      senha: user.password,
      usuario: user.usuario,
      role_id: user.roleId,
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

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND}/login`, {
      email,
      password,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    return { error: "Erro ao fazer login" };
  }
};
