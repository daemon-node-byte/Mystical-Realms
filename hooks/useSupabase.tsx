import type { Database } from "@/types/database.types";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const useSupabaseClient = (): SupabaseClient<Database> => {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_KEY
  ) {
    throw new Error(
      "Supabase URL and key must be provided in the environment variables.",
    );
  }
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  return supabase;
};
