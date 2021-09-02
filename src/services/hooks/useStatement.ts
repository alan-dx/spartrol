import { useQuery } from "react-query";
import { api } from "../api";

export type GetStatementResponse = {
  balanceData: {
    currency: string;
    cents: string;
  };
  daySpent: string;
  monthSpent: string;
  userId: string;
}

type UseStatementParams = {
  id: string;
  initialData?: GetStatementResponse
}

export async function getStatement(id: string): Promise<GetStatementResponse> {
  const response = await api.get(`statement/${id}`)//next dynamic routing

  const { balance, day_spent, month_spent, userId } = response.data.statement.data

  const [currency, cents] = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(balance).split(',')

  
  const formattedData: GetStatementResponse = {
    balanceData: {
      currency: currency.replace(/\s/g, ''),
      cents
    },
    daySpent: new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(day_spent).replace(/\s/g, ''),
    monthSpent: month_spent,
    // monthSpent: new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(month_spent).replace(/\s/g, ''),
    userId
  }

  return formattedData
}

export function useStatement({id, initialData}: UseStatementParams) {
  return useQuery('statement', () => getStatement(id), {
    staleTime: 1000 * 60 * 10//10 min
  })
}