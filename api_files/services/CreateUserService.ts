import { query as q } from 'faunadb'
import { fauna } from '../../src/services/faunadb'

interface ICreateUserService {
  id: string,
  email: string;
}

export type User = {
  ref: {
    id: string
  },
  data: {
    email: string
  }
}

class CreateUserService {
  async execute({ id, email }: ICreateUserService) {
    
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
          { data: { email, id } }
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
              wallets: [],
              day_spent: 0,
              month_spent: 0,
              month_target: 250.00
            },
        }
        ),
        null
      )
    )

    await fauna.query(//Create day_history
      q.If(
        q.Not(
          q.Exists(
            q.Match(
              q.Index('day_historic_by_user_id'),
              q.Casefold(id)
            )
          )
        ),
        q.Create(
          q.Collection('day_historic'),
          {
            data: { 
              userId: id,
              historic: []
            },
        }
        ),
        null
      )
    )

    //create all fields on Fauna DB here

    return user
  }
}

export { CreateUserService }