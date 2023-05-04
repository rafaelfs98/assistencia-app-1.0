import { supabase } from "./supabase/supabaseClient";
import { Login } from "./Types";

export const insertUser = async (user: Login) => {
  await supabase.from("users").insert({
    name: user.name,
    email: user.email,
  });
};
