import { supabase } from "./supabase/supabaseClient";
import { LoginType } from "./Types";

export const insertUser = async (user: LoginType) => {
  await supabase.from("users").insert({
    name: user.name,
    email: user.email,
  });
};
