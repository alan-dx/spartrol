import { query as q } from 'faunadb'
import { fauna } from '../../src/services/faunadb'

type FinancialStatementData = {
  balance?: number,
  day_spent?: number,
  month_spent?: number,
}

interface IStatementRequest {
  id: string | string[];
  updated_data?: FinancialStatementData
}

class UpdateStatementService {
  async execute({id, updated_data}: IStatementRequest) {

    const { balance, day_spent, month_spent } = updated_data
    
    const data: FinancialStatementData = {}

    if (balance) data.balance = balance
    if (day_spent) data.day_spent = day_spent
    if (month_spent) (data.month_spent) = month_spent

    const oldStatement = await fauna.query<{ref: { id: string }}>(
      q.Get(
        q.Match(
          q.Index('financial_statement_by_user_id'),
          q.Casefold(id[0])
        )
      )
    )

    const statement = await fauna.query(
      q.Update(
        q.Ref(q.Collection('financial_statement'), oldStatement.ref.id),
        {
          data
        }
      )
    )

    return statement
  }
}

export { UpdateStatementService }