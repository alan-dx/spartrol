import { useQuery } from 'react-query';
import { api } from './../api';

export async function getCategories(id: string): Promise<any> {
  const response = await api.get('categories', {
    params: {
      id
    }
  })

  return response.data.categories.data
}

export function useCategories(id: string) {
  return useQuery('categories', () => getCategories(id), {
    staleTime: 1000 * 60 * 10
  })
}