import { query as q } from 'faunadb'
import { fauna } from '../../src/services/faunadb'

interface ICreateCategoriesService {
  id: string;
  title: string;
  type: 'gain' | 'spent'
}

class CreateCategoriesService {
  async execute({id, title, type}: ICreateCategoriesService) {

    if (!title) {
      throw new Error("Category title not provided")
    }

    if (!type) {
      throw new Error("Category spent not provided")
    }

    if (!id) {
      throw new Error("User id not provided")
    }

    const category = await fauna.query(
      q.Create(
        q.Collection('categories'),
        {
          data: {
            userId: id,
            title,
            type
          }
        }
      )
    )

    return category
  }
}

export { CreateCategoriesService }