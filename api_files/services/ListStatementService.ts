import { query as q } from 'faunadb';

import { fauna } from '../../src/services/faunadb';
import { isSameDay, isSameMonth } from 'date-fns';

type FinancialStatementData = {
  ts: number;
  data: {
    day_spent: number;
    month_spent: number
  }
}

class ListStatementService {
  async execute(id: string, current_ts: number) {

    const statement: FinancialStatementData = await fauna.query(
      q.Get(
        q.Match(
          q.Index('financial_statement_by_user_id'),
          q.Casefold(id)
        )
      )
    )

    const ts = statement.ts.toString().slice(0,-3)
    //1637101501891 !isSameDay(new Date(Number(ts)), new Date(current_ts))
    if (!isSameDay(new Date(Number(ts)), new Date(current_ts))) {//new day => clear day spent
      statement.data.day_spent = 0
    }

    if (!isSameMonth(new Date(Number(ts)), new Date(current_ts))) {//new month, clear month spent
      statement.data.month_spent = 0
    }

    return statement
  }
}

export { ListStatementService }