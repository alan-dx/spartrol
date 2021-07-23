import { NextApiRequest, NextApiResponse } from "next";

import { CreateUserService } from "../../../api_files/services/CreateUserService";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'POST') {
    try {
      const { email, id } = req.body

      const createUserService = new CreateUserService()

      const user = await createUserService.execute({email, id})

      res.status(201).json({user: user})
    } catch (error) {
      res.status(500).json({message: `There was an error on sign in process, ${error}`})
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).json('Method not allowed')
  }
}