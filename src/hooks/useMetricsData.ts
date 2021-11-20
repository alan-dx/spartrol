import { useQuery } from 'react-query';
import { api } from './../services/api';

import { TransactionData } from './../@types/TransactionData';
import { MetricsData } from '../@types/MetricsData';

type GetMetricsResponse = {
  metrics_by_period: Array<TransactionData[]>
}

type UseMetricsParams = {
  id: string;
  initialData: MetricsData
}

export async function getMetricsData(id: string):Promise<MetricsData> {
  console.log('1111')
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

    let sumGainCategories = []
    let sumValueCategories = []

    metrics_of_day.forEach(metric => {
      if (metric.type === 'gain') {
        sumGainValues += metric.value
      } else {
        sumSpentValues += metric.value
      }

    })

    metricsData.gain_spent.gain.push(sumGainValues)
    metricsData.gain_spent.spent.push(sumSpentValues)
    
  })

  return metricsData
}

export function useMetricsData({id, initialData}: UseMetricsParams) {
  return useQuery('metrics', () => {
    console.log('222')
    return getMetricsData(id)
  }, {
    staleTime: 1000 * 60 * 10,
    initialData
  })

}