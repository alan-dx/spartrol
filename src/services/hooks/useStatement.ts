import { useQuery } from "react-query";
import { api } from "../api";

type GetStatementResponse = {
  ref: {
    id: string
  },
  balance: number;
  day_spent: number;
  month_spent: number;
  userId: string;
}

export async function getStatement(id: string): Promise<GetStatementResponse> {
  const response = await api.get(`statement/${id}`)

  //TALVEZ FORMATAR OS DADOS AQ PARA MELHORAR O DESEMOPENHO
  //LEMBRE-SE FORMATA TUDO NA HORA DA BUSCA
  return response.data.statement.data
}

export function useStatement(id: any) {
  return useQuery('statement', () => getStatement(id), {
    staleTime: 1000 * 60 * 10//10 min
  })
}