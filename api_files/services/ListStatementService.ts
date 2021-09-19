import { query as q } from 'faunadb'
import { fauna } from '../../src/services/faunadb'

class ListStatementService {
  async execute(id: string ) {

    const statement = await fauna.query(
      q.Get(
        q.Match(
          q.Index('financial_statement_by_user_id'),
          q.Casefold(id)
        )
      )
    )
    
    return statement
  }
}

export { ListStatementService }