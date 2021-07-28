import { query as q } from 'faunadb'
import { fauna } from '../../src/services/faunadb'

class ListUserCategories {
  async execute(id: string) {

    const categories = await fauna.query(
      q.Map(
        q.Paginate(
          q.Match(
            q.Index('categories_by_user_id'),
            q.Casefold(id)
          ), 
        ),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )

    return categories
  }
}

export {ListUserCategories}