import { QueryCache, useQuery } from 'react-query';
import { api as apiClient } from './../services/api';

import { TransactionData } from './../@types/TransactionData';
import { MetricsData } from '../@types/MetricsData';

type GetMetricsResponse = {
  metrics_by_period: Array<TransactionData[]>
}

type UseMetricsParams = {
  id: string;
}

export async function getMetricsData(id: string):Promise<MetricsData> {

  const metricsData: MetricsData = {
    gain_spent: {
      gain: [],
      spent: []
    },
    categories: {
      gain: [],
      spent: []
    }
  }

  const api = apiClient()

  const response = await api.get<GetMetricsResponse>(`metrics`, {
    params: {
      id,
      current_ts: new Date().getTime()
    }
  })

  // console.log('==>', response.data.metrics_by_period)

  response.data.metrics_by_period.forEach(metrics_of_day => {
    
    let sumGainValues = 0
    let sumSpentValues = 0

    let sumGainCategories = new Map()//it's easier to iterate over Map objects
    let sumSpentCategories = new Map()

    metrics_of_day.forEach(metric => {
      if (metric.type === 'gain') {
        sumGainValues += metric.value

        sumGainCategories.set(
          metric.category_ref, 
          sumGainCategories.has(metric.category_ref) ? sumGainCategories.get(metric.category_ref) + metric.value : metric.value
        )
      } else {
        sumSpentValues += metric.value

        sumSpentCategories.set(
          metric.category_ref, 
          sumSpentCategories.has(metric.category_ref) ? sumSpentCategories.get(metric.category_ref) + metric.value : metric.value
        )
      }

    })

    metricsData.gain_spent.gain.push(sumGainValues)
    metricsData.gain_spent.spent.push(sumSpentValues)
    
    //transform a map into a 2D key-value Array because Map object cannot be serialized as JSON and it's cause a error when SSR (Error serializing)
    //metricsData.categories.spent.push(sumSpentCategories)  //uncomment to see the error
    metricsData.categories.gain.push(Array.from(sumGainCategories))
    metricsData.categories.spent.push(Array.from(sumSpentCategories))
    
  }) 

  return metricsData
}

export function useMetricsData({id}: UseMetricsParams) {
  return useQuery('metrics', () => {
    return getMetricsData(id)
  }, {
    staleTime: 1000 * 60 * 10,
    // initialData
  })

}