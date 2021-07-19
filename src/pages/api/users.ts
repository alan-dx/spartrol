import { NextApiRequest, NextApiResponse } from "next";

import { query as q } from 'faunadb'
import { fauna } from '../../services/faunadb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'POST') {
    try {
      const { email } = req.body

      const response = await fauna.query(
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
            { data: { email }}
          ),
          q.Get(
            q.Match(
              q.Index('user_by_email'),
              q.Casefold(email))
          )
        )
      )

      res.status(201).json({user: response})
    } catch (error) {
      res.status(500).json({message: 'There was an error in the login process'})
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).json('Method not allowed')
  }
}