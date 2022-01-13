import { NextApiRequest, NextApiResponse } from "next";
import { ensureAuth } from "../../../api_files/middleware/ensureAuth";
import { ListMetricsDataService } from "../../../api_files/services/ListMetricsDataService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { id, current_ts } = req.query
      let period = 7

      const listMetricsDataService = new ListMetricsDataService()

      const metrics_by_period = await listMetricsDataService.execute(
        id as string, 
        period, 
        Number(current_ts)
      )

      return res.status(200).json({metrics_by_period}) 

    } catch (error) {
      return res.status(500).json({message: `There was an error metrics endpoint, ${error}`})
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).json('Method not allowed')
  }
}