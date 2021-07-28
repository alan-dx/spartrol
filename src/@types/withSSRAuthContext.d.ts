import { GetServerSidePropsContext } from 'next';

export interface withSSRAuthContext extends GetServerSidePropsContext {
  session?: Session
}