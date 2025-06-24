import { createClient } from "@supabase/supabase-js";

const supabaseEnv = {
  projectURL: import.meta.env.VITE_SUPABASE_URL,
  apiKey: import.meta.env.VITE_SUPABASE_KEY,
};

export const supabaseClient = createClient(
  supabaseEnv.projectURL,
  supabaseEnv.apiKey
);
