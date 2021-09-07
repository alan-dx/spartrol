import { Session } from 'next-auth'
import { withSSRAuthContext } from '../../@types/withSSRAuthContext';
import styles from './styles.module.scss'

import { Header } from "../../components/Header";
import { useCategories } from "../../services/hooks/useCategories";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { AddCategory } from '../../components/AddCategory';

interface CategoriesProps {
  session: Session
}

export default function Categories({session}: CategoriesProps) {

  const { data } = useCategories(session?.id as string)

  return (
    <>
      <Header />
      <main className={styles.main__container}>
        <div className={styles.main__container__wrapper}>
          <AddCategory />
          {/* <ul>
            {data?.gain.map(item => (<li key={item.ref.id}>{item.data.title}</li>) )}
          </ul> */}
        </div>
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