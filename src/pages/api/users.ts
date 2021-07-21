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

      res.status(201).json({user: user})
    } catch (error) {
      res.status(500).json({message: 'There was an error in the login process'})
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).json('Method not allowed')
  }
}