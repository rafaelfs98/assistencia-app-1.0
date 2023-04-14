import useSWR from "swr";
import { supabase } from "../services/supabase/supabaseClient";

interface Query {
  uri: string;
}

export function useSupabase<T>({ uri }: Query) {
  const fetcher = async (url: string) => {
    const { data, error } = await supabase.from(url).select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const { data, error, mutate } = useSWR<T[]>(uri, fetcher);

  const isLoading = !error && !data;

  return { data, isLoading, isError: error, mutate };
}
