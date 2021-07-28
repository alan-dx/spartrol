import { getSession } from 'next-auth/client';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const ensureAuth = (fn: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // This middleware doesn't work when the api request is made on the server side

    const session = await getSession({ req })

    if (!session) {
      return res.status(401).json({message: "Not Authenticated"})
    }

    return await fn(req, res)
  }
}