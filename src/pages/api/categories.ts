import { NextApiRequest, NextApiResponse } from "next";
import { CreateCategoriesService } from "../../../api_files/services/CreateCategorieService";
import { ListUserCategories } from "../../../api_files/services/ListUserCategories";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { id } = req.query
      console.log('xxxxx', req.query)
      const listUserCategories = new ListUserCategories()

      const categories = await listUserCategories.execute(id as string)

      return res.status(200).json({categories})
    } catch (error) {
      return res.status(500).json({message: `There was an error on list statement, error: ${error}`})      
    }
  } else if (req.method === 'POST') {
    try {
      const { id, title, type } = req.body

      const createCategorieService = new CreateCategoriesService()

      const category = await createCategorieService.execute({ id, title, type})

      return res.status(201).json({category})
    } catch (error) {
      return res.status(500).json({message: `There was an error on create categories, error: ${error}`})
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).json('Method not allowed')
  }
}