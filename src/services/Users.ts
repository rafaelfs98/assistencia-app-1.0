import { supabase } from "./supabase/supabaseClient";
import { LoginForm } from "./Types";

export const insertUser = async (user: LoginForm) => {
  await supabase.from("users").insert({
    name: user.name,
    email: user.email,
  });
};
