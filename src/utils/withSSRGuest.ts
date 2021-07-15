import { getSession } from 'next-auth/client';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export function withSSRGuest(fn: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {

    const session = await getSession(ctx)

    if (session) {
      return {
        redirect: {
          destination: '/home',
          permanent: false
        }
      }
    }
    
    return fn(ctx)

  }
}