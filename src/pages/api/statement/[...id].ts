import { NextApiRequest, NextApiResponse } from "next";

import { query as q } from 'faunadb'
import { fauna } from '../../../services/faunadb'
import { ensureAuth } from "../../../../api/middleware/ensureAuth";

export default ensureAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'GET') {

    const { id } = req.query

    const statement = await fauna.query(
      q.If(
        q.Not(
          q.Exists(
            q.Match(
              q.Index('financial_statement_by_user_id'),
              q.Casefold(id[0])
            )
          )
        ),
        q.Create(
          q.Collection('financial_statement'),
          { data: { 
            userId: id[0],
            balance: 0,
            day_spent: 0,
            history_day_balance: '13123asdsa1',
            month_spent: 0,
            history_month_balance: '12asd123213',
          }}
        ),
        q.Get(
          q.Match(
            q.Index('financial_statement_by_user_id'),
            q.Casefold(id[0]))
        )
      )
    )

    return res.status(200).json({statement})
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).json('Method not allowed')
  }
})