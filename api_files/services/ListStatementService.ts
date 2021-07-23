import { query as q } from 'faunadb'
import { fauna } from '../../src/services/faunadb'

interface IStatementRequest {
  id: string | string[]
}

class ListStatementService {
  async execute({id}: IStatementRequest) {

    const statement = await fauna.query(
      q.Get(
        q.Match(
          q.Index('financial_statement_by_user_id'),
          q.Casefold(id[0])
        )
      )
    )

    return statement
  }
}

export { ListStatementService }