import { useQuery } from "@tanstack/react-query";

interface Zone {
  idZonaEmissao: number;
  nome: string;
  descricao?: string;
}

export function useZones() {
  return useQuery({
    queryKey: ["zones"],
    queryFn: async (): Promise<Zone[]> => {
      const response = await fetch("/api/v1/zona");
      if (!response.ok) {
        throw new Error("Failed to fetch zones");
      }
      return response.json() as Promise<Zone[]>;
    },
  });
}
