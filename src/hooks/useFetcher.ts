import useSWR, { SWRConfiguration } from "swr";

interface Query {
  uri: string;
}

export function useFetcher<T>(query: Query, config?: SWRConfiguration<T[]>) {
  const fetcher = async (url: string) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}${url}`);

    if (!response.ok) {
      throw new Error("Falha ao obter os dados da API.");
    }

    try {
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Falha ao analisar os dados da API.");
    }
  };

  const { data, error, mutate } = useSWR<T[]>(query.uri, fetcher, config);

  const isLoading = !error && !data;

  return { data, isLoading, isError: error, mutate };
}
