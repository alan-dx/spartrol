import { Balance } from '../../components/Balance'
import { DayExpence } from '../../components/DayExpence'
import { Header } from '../../components/Header'
import { LargeButton } from '../../components/LargeButton'
import { Historic } from '../../components/Historic'

import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi'
import styles from './styles.module.scss'
import { AddSpentModal } from '../../components/Modal/AddSpentModal'
import { useState } from 'react'
import { AddGainModal } from '../../components/Modal/AddGainModal'
import { Session } from 'next-auth'
import { GetServerSidePropsContext } from 'next'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { useEffect } from 'react'
import { api } from '../../services/api'
import { getStatement, GetStatementResponse, useStatement } from '../../services/hooks/useStatement'
import { useCategories } from '../../services/hooks/useCategories'

interface HomeProps {
  session?: Session;
  statementInitialData: GetStatementResponse
}

export default function Home({session}: HomeProps) {

  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false)
  const [isOpenGainModal, setIsOpenGainModal] = useState(false)

  const { data: statementeData, isFetching, isLoading, error } = useStatement({id: session?.id as string})
  const { data: categoriesData } = useCategories(session?.id as string)//MOVER PARA UM CONTEXTO

  // async function apiTest() {23
  //   const response = await api.get('categories', {
  //     params: {
  //       id: session?.id
  //     }
  //   })

  //   console.log(response.data.categories.data)
  // }
  useEffect(() => {
    
    console.log('asdasdasdsddd', categoriesData)

  }, [categoriesData])

  return (
    <>
      <AddSpentModal isOpen={isOpenExpenseModal} closeModal={() => setIsOpenExpenseModal(false)} />
      <AddGainModal isOpen={isOpenGainModal} closeModal={() => setIsOpenGainModal(false)} />
      <Header />
      <main className={styles.container} >
        <Balance balance={statementeData?.balanceData} />
        <DayExpence daySpent={statementeData?.daySpent} monthSpent={statementeData?.monthSpent} />
        <LargeButton onClick={() => setIsOpenExpenseModal(true)}>
          Adicionar despesa
          <FiMinusCircle size={20} color="#F03E35" />
        </LargeButton>
        <LargeButton onClick={() => setIsOpenGainModal(true)}>
          Adicionar ganho
          <FiPlusCircle size={20} color="#59D266" />
        </LargeButton>
        <Historic />
      </main>
    </>
  )
}

interface withSSRAuthContext extends GetServerSidePropsContext {
  session?: Session
}

export const getServerSideProps = withSSRAuth(async (ctx: withSSRAuthContext) => {

  const { session } = ctx

  // ensureAuth middleware not working when this request is made
  // await api.get(`statement/${session?.id}`).then(res => console.log(res.data)).catch(err => console.log(err.data))

  return {
    props: {
      session
    }
  }
})