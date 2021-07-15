import { getSession } from 'next-auth/client';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export function withSSRAuth(fn: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {

    const session = await getSession(ctx)

    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    const passContext = {...ctx, session}

    return await fn(passContext)

  }
}