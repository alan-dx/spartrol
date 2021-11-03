import { query as q } from 'faunadb'
import { FinancialStatementData } from '../../src/@types/FinancialStatementData'
import { Wallet } from '../../src/@types/Wallet'
import { fauna } from '../../src/services/faunadb'

interface IStatementRequest {
  id: string | string[];
  updated_data?: FinancialStatementData
}

type FaunaFinancialStatementData = {
  wallets?: Wallet[],
  day_spent?: number,
  month_target?: number,
  month_spent?: number
}

class UpdateStatementService {
  async execute({id, updated_data}: IStatementRequest) {

    if (!id) {
      throw new Error('User id not provided')
    }

    if (!updated_data) {
      throw new Error('Updated data not provided')
    }

    const { day_spent, month_spent, wallets, month_target } = updated_data
    
    const data: FaunaFinancialStatementData = {}

    // if (equity) data.equity = equity
    if (day_spent) data.day_spent = day_spent
    if (month_spent) data.month_spent = month_spent
    if (month_target) data.month_target = month_target
    if (wallets) data.wallets = wallets

    const oldStatement = await fauna.query<{ref: { id: string }}>(//Analisar possivel remoção dessa query
      //considerando o que foi feito no UptadeDayHistoric, passando a ref como query props
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