import { Category } from './../../src/@types/category';
import {query as q} from 'faunadb'
import { fauna } from '../../src/services/faunadb'

interface IUpdateCategories {
  id: string;
  updated_data: Category;
}

class UpdateCategoriesService {
  async execute({id, updated_data}: IUpdateCategories) {

    if (!id) {
      throw new Error('User id not provided')
    }

    if (!updated_data) {
      throw new Error('Data not provided')
    }

    const category = await fauna.query(
      q.Update(
        q.Ref(q.Collection('categories'), updated_data.ref['@ref'].id),
        {
          data: updated_data.data
        }
      )
    )

    return category

  }
}

export {UpdateCategoriesService}