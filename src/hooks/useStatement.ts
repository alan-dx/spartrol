import { useQuery } from "react-query";
import { Wallet } from "../@types/Wallet";
import { api } from "../services/api";

export type GetStatementResponse = {
  equity: number;
  wallets: Wallet[];
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

  const { wallets, day_spent, month_spent, month_target, userId } = response.data.statement.data//financial_statement

  const ts = response.data.statement.ts.toString().slice(0,-3)

  // console.log('patrimono', balance)

  const sum_wallets = wallets.reduce((accumulator, value) => accumulator + value.value, 0)
  
  const formattedData: GetStatementResponse = {
    equity: sum_wallets,//change key: balance for equity
    wallets,
    daySpent: Number(day_spent),
    monthSpent: Number(month_spent),
    monthTarget: Number(month_target),
    userId,

  }

  if (new Date().getDate() > new Date(Number(ts)).getDate()) {//new day, clear daySpent
    formattedData.daySpent = 0
  }

  return formattedData
}

export function useStatement({id, initialData}: UseStatementParams) {
  return useQuery('statement', () => getStatement(id), {
    staleTime: 1000 * 60 * 10//10 min
  })
}