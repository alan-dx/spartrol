import { NextApiRequest, NextApiResponse } from "next";
import { ensureAuth } from "../../../api_files/middleware/ensureAuth";
import { ListDayHistoricService } from "../../../api_files/services/ListDayHistoricService";
import { UpdateDayHistoric } from "../../../api_files/services/UpdateDayHistoric";

export default ensureAuth(async (req: NextApiRequest, res: NextApiResponse) => {//controller
  if (req.method === "GET") {
    try {
      const { id, current_ts } = req.query
      
      const listDayHistoricService = new ListDayHistoricService()

      const dayHistoric = await listDayHistoricService.execute(id as string, Number(current_ts))

      return res.status(200).json({dayHistoric})

    } catch (error) {             
      return res.status(500).json({message: `There was an error on list day historic, error: ${error}`})      
    }
  } else if (req.method === 'POST') {
    try {
      const { id, transaction, old_historic } = req.body

      const updateDayHistoric = new UpdateDayHistoric()

      const newHistoric = await updateDayHistoric.execute({ id, transaction, old_historic })

      return res.status(201).json({newHistoric})
    } catch (error) {
      return res.status(500).json({message: `There was an error on add day_historic, error: ${error}`})
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET'])
    res.status(405).json('Method not allowed')
  }
})