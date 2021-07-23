import { NextApiRequest, NextApiResponse } from "next";

import { query as q } from 'faunadb'
import { fauna } from '../../services/faunadb'

export type User = {
  ref: {
    id: string
  },
  data: {
    email: string
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'POST') {
    try {
      const { email, id } = req.body

      const user = await fauna.query<User>(//Create user
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(email)
              )
            )
          ),
          q.Create(
            q.Collection('users'),
            { data: { email, id }}
          ),
          q.Get(
            q.Match(
              q.Index('user_by_email'),
              q.Casefold(email))
          )
        )
      )

      await fauna.query(//Create financial statement
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index('financial_statement_by_user_id'),
                q.Casefold(id)
              )
            )
          ),
          q.Create(
            q.Collection('financial_statement'),
            {
              data: { 
              userId: id,
              balance: 0,
              day_spent: 0,
              month_spent: 0,
            }}
          ),
          null
        )
      )

      res.status(201).json({user: user})
    } catch (error) {
      res.status(500).json({message: 'There was an error on sign in process'})
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).json('Method not allowed')
  }
}