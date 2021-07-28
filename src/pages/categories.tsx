import { Session } from 'next-auth'
import { useEffect } from 'react';
import { withSSRAuthContext } from '../@types/withSSRAuthContext';

import { Header } from "../components/Header";
import { useCategories } from "../services/hooks/useCategories";
import { withSSRAuth } from "../utils/withSSRAuth";

interface CategoriesProps {
  session: Session
}

export default function Categories({session}: CategoriesProps) {

  const { data } = useCategories(session?.id as string)

  return (
    <>
      <Header />
      <main>
        <h1>Categoriasa</h1>
        <ul>
          {data?.gain.map(item => (<li key={item.ref.id}>{item.data.title}</li>) )}
        </ul>
      </main>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx: withSSRAuthContext) => {
  const { session } = ctx

  return {
    props: {
      session
    }
  }
})