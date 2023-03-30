import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import { supabase } from "../../services/supabase/supabaseClient";

const Login = () => (
  <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    theme="dark"
    providers={["google"]}
  />
);

export default Login;
