import useSWR from "swr";
import { supabase } from "../services/supabase/supabaseClient";

interface Query {
  table: string;
  order?: string;
  ascending?: boolean;
  eq?: { value: string; id: string };
}

export function useSupabase<T>(query: Query) {
  const { data, error, mutate } = useSWR<T[]>(
    JSON.stringify(query),
    async () => {
      const { data, error } = await supabase
        .from(query.table)
        .select()
        .order(query.order ?? "", { ascending: query.ascending })
        .eq(query.eq?.value ?? "", query.eq?.id ?? "");

      if (error) {
        throw new Error(error.message);
      }

      return data ?? [];
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
