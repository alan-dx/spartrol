import { NextApiRequest, NextApiResponse } from "next";

import { ensureAuth } from "../../../../api_files/middleware/ensureAuth";
import { ListStatementService } from "../../../../api_files/services/ListStatementService";
import { UpdateStatementService } from "../../../../api_files/services/UpdateStatementService";

export default ensureAuth(async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method == 'GET') {
    
    try {
      const { id, current_ts } = req.query
      const listStatementService = new ListStatementService()
      
      const statement = await listStatementService.execute(id[0], Number(current_ts))
      
      return res.status(200).json({statement})
    } catch (error) {
      return res.status(500).json({message: `There was an error on list statement, error: ${error}`})      
    }

  } else if (req.method == 'PUT') {

    try {
      const { updated_data } = req.body
      const { id } = req.query

      const updateStatementService = new UpdateStatementService()
  
      const statement = await updateStatementService.execute({id, updated_data})
  
      return res.status(201).json(statement)
    } catch (error) {
      return res.status(500).json({message: `There was an error on update statement, error: ${error}`})     
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).json('Method not allowed')
  }
})