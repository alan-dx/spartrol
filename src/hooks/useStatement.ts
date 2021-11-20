import { useQuery } from "react-query";
import { api } from "../services/api";

import { Wallet } from "../@types/Wallet";

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
  const response = await api.get(`statement/${id}`, {
    params: {
      current_ts: new Date().getTime()
    }
  })//next dynamic routing

  const { wallets, day_spent, month_spent, month_target, userId } = response.data.statement.data//financial_statement

  const sum_wallets = wallets.reduce((accumulator, value) => accumulator + value.value, 0)
  
  const formattedData: GetStatementResponse = {
    equity: sum_wallets,
    wallets,
    daySpent: Number(day_spent),
    monthSpent: Number(month_spent),
    monthTarget: Number(month_target),
    userId,
    
  }
  // const ts = response.data.statement.ts.toString().slice(0,-3)
  
  // if (new Date().getDate() > new Date(Number(ts)).getDate()) {//new day, clear daySpent
  //   formattedData.daySpent = 0
  // }

  return formattedData
}

export function useStatement({id, initialData}: UseStatementParams) {
  return useQuery('statement', () => getStatement(id), {
    staleTime: 1000 * 60 * 10,//10 min
    initialData
  })
}