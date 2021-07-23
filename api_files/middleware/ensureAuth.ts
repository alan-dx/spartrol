import { getSession } from 'next-auth/client';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const ensureAuth = (fn: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getSession({ req })

    if (!session) {
      return res.status(401).json({message: "Not Authenticated"})
    }

    return await fn(req, res)
  }
}