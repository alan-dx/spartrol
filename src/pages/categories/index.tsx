import { Session } from 'next-auth'
import { withSSRAuthContext } from '../../@types/withSSRAuthContext';
import styles from './styles.module.scss'

import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';


import { Header } from "../../components/Header";
import { getCategories, useCategories } from "../../hooks/useCategories";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { AddCategory } from '../../components/AddCategory';
import { ListCategories } from '../../components/ListCategories';
import {FiMinusCircle, FiPlusCircle} from 'react-icons/fi'
import { useMutation } from 'react-query';
import { api } from '../../services/api';

import { queryClient as queryClientCache } from '../../services/queryClient';

interface CategoriesProps {
  session: Session;
}

type CreateCategoryFormData = {
  title?: string;
  type?: "spent" | "gain";
}

export default function Categories({session}: CategoriesProps) {

  const { data } = useCategories({id: session?.id as string})

  const createCategory = useMutation(async (category: CreateCategoryFormData) => {
    const response = await api.post("/categories", {
      id: session?.id,
      title: category.title,
      type: category.type
    })
    return response.data.category
  }, {
    onSuccess: async () => {
      await queryClientCache.invalidateQueries("categories")
    },
    onError: () => {
      alert("Deu erro")
    }
  })

  const handleCreateCategory = async (category: CreateCategoryFormData) => {
    await createCategory.mutateAsync(category)
  }

  return (
    <>
      <Header />
      <main className={styles.main__container}>
        <div className={styles.main__container__wrapper}>
          <AddCategory handleCreateCategory={handleCreateCategory} />
          <ListCategories icon={<FiPlusCircle size={20} color="#59D266" />} title="Ganhos" data={data?.gain} />
          <ListCategories icon={<FiMinusCircle size={20} color="#F03E35" />} title="Despesas" data={data?.spent} />
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx: withSSRAuthContext) => {
  const { session } = ctx

  const queryClient = new QueryClient()

  if (ctx.req.url === '/categories') {//On req.url there is a difference when the user navigates from another page and accesses it for the first time
    //this condition prevents unnecessary request to this routes. This way the requests below will 
    //not be performed when the user changes pages, for example, only when render at first time.
    //This was a way I found to prevent requests from being made unnecessarily, 
    //as the data will possibly already be cached
    //Even if the data is not cached, requests will be made on the client side
    await queryClient.prefetchQuery('categories', () => getCategories(session?.id), {
      staleTime: 1000 * 60 * 10
    })

    console.log('make requests at /categories')

  }

  // const initialCategoriesData = await getCategories(session?.id)

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    }
  }
})