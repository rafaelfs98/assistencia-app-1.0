import useSWR from "swr";
import { supabase } from "../services/supabase/supabaseClient";

interface Query {
  table: string;
  order: string;
  ascending: boolean;
}

export function useSupabase<T>(query: Query): {
  data: T[] | undefined;
  isLoading: boolean;
  isError: Error | undefined;
  mutate: any;
} {
  const fetcher = async (): Promise<T[]> => {
    const { data, error } = await supabase
      .from(query.table)
      .select()
      .order(query.order, { ascending: query.ascending });

    if (error) throw new Error(error.message);

    return data ?? [];
  };

  const { data, error, mutate } = useSWR<T[]>(JSON.stringify(query), fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
