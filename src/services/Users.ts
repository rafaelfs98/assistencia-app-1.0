import { supabase } from "./supabase/supabaseClient";
import { LoginType } from "./Types/suiteOS";

export const insertUser = async (user: LoginType) => {
  await supabase.from("Users").insert({
    name: user.name,
    email: user.email,
  });
};
