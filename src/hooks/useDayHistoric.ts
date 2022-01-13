import { api as apiClient } from '../services/api';
import { useQuery } from 'react-query';

import { DayHistoric } from '../@types/DayHistoric';

type useDayHistoricParams = {
  id: string;
}

//CONTINUAR AQ
export async function getDayHistoric(id: string, ctx = undefined): Promise<DayHistoric> {
  
  const api = apiClient(ctx)

  const response = await api.get(`day_historic`, {
    params: {
      id,
      current_ts: new Date().getTime()
    }
  })

  const dayHistoric: DayHistoric = response.data.dayHistoric

  // const ts = dayHistoric.ts.toString().slice(0,-3)

  // //MOVER PARA O BACKEND
  // if (!isSameDay(new Date(Number(ts)), new Date())) {//new day, clear day historic
  //   dayHistoric.data.historic = []
  // }

  return dayHistoric
}

export function useDayHistoric({id}: useDayHistoricParams) {
  return useQuery('day_historic', () => getDayHistoric(id), {
    staleTime: 1000 * 60 * 10,//10 min
    // initialData
  })
}