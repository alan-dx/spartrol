import { fauna } from './../../src/services/faunadb';
import { query as q } from 'faunadb';

import { HistoricDayMetricsData } from '../../src/@types/HistoricDayMetricsData';

import { subDays, endOfDay } from 'date-fns';

class ListMetricsDataService {
  async execute(id: string, period: number, current_ts: number) {

    let metrics = []
    //6 5 4 3 2 1 0
    //0 1 2 3 4 5 6 7
    for (let count = period - 1; count >= 0; count --) {
      let ts: number;
      if (count > 0) {
        let date = endOfDay(subDays(new Date(current_ts), count))
        //timestamp could change his size at some time, so more easy just add '000' using string methods
        ts = Number(date.getTime().toString() + '000')
      } else {
        //timestamp could change his size at some time, so more easy just add '000' using string methods
        ts = Number(current_ts.toString() + '000')
      }
      
      //SOLVE: Instance not found here
      const eachDayMetric = await fauna.query<HistoricDayMetricsData>(
        q.At(
          ts,
          q.Select(
            "data",
            q.Get(
              q.Match(
                q.Index("day_historic_by_user_id"), 
                q.Casefold(id)
              ))
          )
        )
      )
      
      // console.log(eachDayMetric.historic, count)
      metrics.push(eachDayMetric.historic)//maior data > menor data
    }


    return metrics

  }
}

export {ListMetricsDataService}