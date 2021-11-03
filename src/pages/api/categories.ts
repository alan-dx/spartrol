import { NextApiRequest, NextApiResponse } from "next";

import { CreateCategoriesService } from "../../../api_files/services/CreateCategorieService";
import { ListUserCategories } from "../../../api_files/services/ListUserCategories";
import { UpdateCategoriesService } from "../../../api_files/services/UpdateCategoriesService";

export default async (req: NextApiRequest, res: NextApiResponse) => {//controller
  if (req.method === 'GET') {
    try {
      const { id } = req.query
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

      const category = await createCategorieService.execute({ id, title, type })

      return res.status(201).json({category})
    } catch (error) {
      return res.status(500).json({message: `There was an error on create categories, error: ${error}`})
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, updated_data } = req.body

      console.log(id, updated_data)

      const updateCategoriesService = new UpdateCategoriesService()

      const category = await updateCategoriesService.execute({
        id,
        updated_data
      })

      return res.status(200).json(category)
    } catch (error) {
      return res.status(500).json({message: `There was an error on update categories, error: ${error}`})
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).json('Method not allowed')
  }
}