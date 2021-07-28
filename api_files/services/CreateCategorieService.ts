import { query as q } from 'faunadb'
import { fauna } from '../../src/services/faunadb'

interface ICreateCategoriesService {
  id: string;
  title: string;
  type: 'gain' | 'spent'
}

class CreateCategoriesService {
  async execute({id, title, type}: ICreateCategoriesService) {

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