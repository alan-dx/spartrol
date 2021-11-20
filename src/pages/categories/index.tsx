import { Session } from 'next-auth'
import { withSSRAuthContext } from '../../@types/withSSRAuthContext';
import styles from './styles.module.scss'

import { Header } from "../../components/Header";
import { getCategories, useCategories } from "../../hooks/useCategories";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { AddCategory } from '../../components/AddCategory';
import { ListCategories } from '../../components/ListCategories';
import {FiMinusCircle, FiPlusCircle} from 'react-icons/fi'
import { useMutation } from 'react-query';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { Categories as CategoriesType } from '../../@types/Categories';

interface CategoriesProps {
  session: Session;
  initialCategoriesData: CategoriesType
}

type CreateCategoryFormData = {
  title?: string;
  type?: "spent" | "gain";
}

export default function Categories({session, initialCategoriesData}: CategoriesProps) {

  const { data } = useCategories({id: session?.id as string, initialData: initialCategoriesData})

  const createCategory = useMutation(async (category: CreateCategoryFormData) => {
    const response = await api.post("/categories", {
      id: session?.id,
      title: category.title,
      type: category.type
    })
    return response.data.category
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories")
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

  const initialCategoriesData = await getCategories(session?.id)

  return {
    props: {
      session,
      initialCategoriesData
    }
  }
})