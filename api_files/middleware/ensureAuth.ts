import { getToken } from 'next-auth/jwt';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const secret = process.env.SECRET

export const ensureAuth = (fn: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {

    // const token = await getToken({ req, secret })

    // if (token) {
    //   return await fn(req, res)
    // } else {
    //   //Isn't necessary manually logout the user cause nextauth do it be default when the token is invalid
    //   return res.status(401).json({message: 'Not authorized'}) 
    // }
    //bypass
    return await fn(req,res)
  }
}