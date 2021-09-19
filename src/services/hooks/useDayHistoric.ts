import { api } from './../api';
import { useQuery } from 'react-query';
import { DayHistoric } from '../../@types/DayHistoric';
//CONTINUAR AQ
export async function getDayHistoric(id: string): Promise<DayHistoric> {
  const response = await api.get(`day_historic`, {
    params: {
      id
    }
  })

  const dayHistoric: DayHistoric = response.data.dayHistoric

  const ts = dayHistoric.ts.toString().slice(0,-3)

  if (new Date().getDate() > new Date(Number(ts)).getDate()) {//new day, clear day historic
    dayHistoric.data.historic = []
  }

  return dayHistoric
}

export function useDayHistoric(id: string) {
  return useQuery('day_historic', () => getDayHistoric(id), {
    staleTime: 1000 * 60 * 10//10 min
  })
}