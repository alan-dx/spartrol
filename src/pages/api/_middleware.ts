import { verify } from 'jsonwebtoken';
import { getToken } from 'next-auth/jwt';
import type { NextFetchEvent, NextRequest } from 'next/server';

const secret = process.env.SECRET

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // console.log(verify(req.cookies['next-auth.session-token'], 'd2_pLp4w-JDOQqZw4jO4dYl5'))
  // const token = await getToken({ req, secret })
  if(!req.cookies['next-auth.session-token']) {
    // return new Response('not Authenticated')
    //Validar o cookie
    //add no searchParams o id do usuário automaticamente
  }
}