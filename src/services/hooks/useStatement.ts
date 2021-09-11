import { useQuery } from "react-query";
import { api } from "../api";

export type GetStatementResponse = {
  balance: number;
  daySpent: number;
  monthSpent: number;
  monthTarget: number;
  userId: string;
  updatedAt?: number
}

type UseStatementParams = {
  id: string;
  initialData?: GetStatementResponse
}

export async function getStatement(id: string): Promise<GetStatementResponse> {
  const response = await api.get(`statement/${id}`)//next dynamic routing

  const { balance, day_spent, month_spent, month_target, userId, updated_at } = response.data.statement.data//financial_statement

  // const [currency, cents] = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(balance).split(',')
  
  const formattedData: GetStatementResponse = {
    balance: Number(balance),
    daySpent: Number(day_spent),
    monthSpent: Number(month_spent),
    monthTarget: Number(month_target),
    userId,
    updatedAt: updated_at
  }

  if (new Date().getDate() > new Date(updated_at).getDate()) {//new day, clear daySpent
    formattedData.daySpent = 0
  }

  return formattedData
}

export function useStatement({id, initialData}: UseStatementParams) {
  return useQuery('statement', () => getStatement(id), {
    staleTime: 1000 * 60 * 10//10 min
  })
}