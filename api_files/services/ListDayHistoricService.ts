import { isSameDay } from 'date-fns'
import { query as q } from 'faunadb'
import { fauna } from '../../src/services/faunadb'

import { DayHistoric } from './../../src/@types/DayHistoric'

class ListDayHistoricService {
  async execute(id: string, current_ts: number ) {

    const dayHistoric = await fauna.query<DayHistoric>(
      q.Get(
        q.Match(
          q.Index('day_historic_by_user_id'),
          q.Casefold(id)
        )
      )
    )

    const ts = dayHistoric.ts.toString().slice(0,-3)
          
    if (!isSameDay(new Date(Number(ts)), new Date(current_ts))) {//new day, clear day historic
      dayHistoric.data.historic = []
    }

    return dayHistoric
  }
}

export { ListDayHistoricService }