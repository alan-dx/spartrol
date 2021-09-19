import { query as q } from 'faunadb'
import { fauna } from '../../src/services/faunadb'

import { DayHistoric } from './../../src/@types/DayHistoric'

class ListDayHistoricService {
  async execute(id: string ) {

    const dayHistoric = await fauna.query<DayHistoric>(
      q.Get(
        q.Match(
          q.Index('day_historic_by_user_id'),
          q.Casefold(id)
        )
      )
    )

    return dayHistoric
  }
}

export { ListDayHistoricService }