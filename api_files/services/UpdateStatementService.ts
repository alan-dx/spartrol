import { query as q } from 'faunadb'
import { FinancialStatementData } from '../../src/@types/FinancialStatementData'
import { fauna } from '../../src/services/faunadb'

interface IStatementRequest {
  id: string | string[];
  updated_data?: FinancialStatementData
}

class UpdateStatementService {
  async execute({id, updated_data}: IStatementRequest) {

    if (!id) {
      throw new Error('User id not provided')
    }

    if (!updated_data) {
      throw new Error('Updated data not provided')
    }

    const { balance, day_spent, month_spent } = updated_data
    
    const data: FinancialStatementData = {}

    if (balance) data.balance = balance
    if (day_spent) data.day_spent = day_spent
    if (month_spent) (data.month_spent) = month_spent

    const oldStatement = await fauna.query<{ref: { id: string }}>(//Analisar possivel remoção dessa query
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