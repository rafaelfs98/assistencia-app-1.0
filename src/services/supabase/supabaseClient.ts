import { createClient } from "@supabase/supabase-js";
import { Database } from "../Types/supabase";

const supabaseUrl = "https://senbcwzimnbyqbwsfect.supabase.co";

console.log(supabaseUrl);
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlbmJjd3ppbW5ieXFid3NmZWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MzU0NDQsImV4cCI6MTk5NTUxMTQ0NH0.lASI5s6w6eVe8MXnpZ3iIOc0-wYxAIccUjxLGccW7Hw";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
