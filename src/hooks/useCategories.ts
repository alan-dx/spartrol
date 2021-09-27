import { useQuery } from 'react-query';
import { Categories } from '../@types/Categories';
import { Category } from '../@types/category';
import { api } from '../services/api';

export async function getCategories(id: string): Promise<Categories> {

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
      categories.gain.push({
        data: item.data,
        ref: item.ref
      })
    } else if (item.data.type == 'spent') {
      categories.spent.push({
        data: item.data,
        ref: item.ref
      })
    }

  })

  return categories
}

export function useCategories(id: string) {
  return useQuery('categories', () => getCategories(id), {
    staleTime: 1000 * 60 * 10
  })
}