import { useQuery } from 'react-query';
import { Categories } from '../@types/Categories';
import { Category } from '../@types/category';
import { api as apiClient } from '../services/api';

type useCategoriesParams = {
  id: string;
}

export async function getCategories(id: string, ctx = undefined): Promise<Categories> {
  const api = apiClient(ctx)
  const response = await api.get('categories', {
    params: {
      id
    }
  })

  const categories: Categories = {
    gain: [],
    spent: []
  }

  response.data.categories.data.forEach((item: Category) => {

    if (item.data.type == 'gain') {
      categories.gain.push(item)
    } else if (item.data.type == 'spent') {
      categories.spent.push(item)
    }

  })

  return categories
}

export function useCategories({id}: useCategoriesParams) {
  return useQuery('categories', () => getCategories(id), {
    staleTime: 1000 * 60 * 10,
    // initialData
  })
}