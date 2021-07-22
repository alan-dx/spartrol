import { NextApiRequest, NextApiResponse } from "next";

import { ensureAuth } from "../../../../api/middleware/ensureAuth";
import { ListStatementService } from "../../../../api/services/ListStatementService";
import { UpdateStatementService } from "../../../../api/services/UpdateStatementService";

export default ensureAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'GET') {

    const { id } = req.query
    const listStatementService = new ListStatementService()
    
    const statement = await listStatementService.execute({id})
    
    return res.status(200).json({statement})
  } else if (req.method == 'PUT') {
    const { updated_data } = req.body

    const { id } = req.query

    const uptadeStatementServuce = new UpdateStatementService()

    const statement = await uptadeStatementServuce.execute({id, updated_data})

    return res.status(201).json(statement)
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).json('Method not allowed')
  }
})