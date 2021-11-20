import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export const ensureAuth = (fn: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    //SOLVE LATER
      //it's necessary check the token because for some reason when user refresh the browser getSession returns null at first time.
      //this way it is guaranteed that getSession() will not unduly return null.
      // if (req.cookies['next-auth.csrf-token']) {

      //   const session = await getSession({req})

      //   if (!session) {
      //     return res.status(401).json({message: "Not Authenticated"})
      //   }

      //   return await fn(req, res)
      // }
      // return res.end()
    //SOLVE LATER
    return await fn(req, res)
  }
}