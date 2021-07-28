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

interface HomeProps {
  session?: Session;
  statementInitialData: GetStatementResponse
}

export default function Home({session}: HomeProps) {

  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false)
  const [isOpenGainModal, setIsGainModal] = useState(false)

  const { data, isFetching, isLoading, error } = useStatement({id: session.id as string})

  useEffect(() => {
    console.log('asdas', data)
  }, [data])

  return (
    <>
      <AddSpentModal isOpen={isOpenExpenseModal} closeModal={() => setIsOpenExpenseModal(false)} />
      <AddGainModal isOpen={isOpenGainModal} closeModal={() => setIsGainModal(false)} />
      <Header />
      <main className={styles.container} >
        <Balance balance={data?.balanceData} />
        <DayExpence daySpent={data?.daySpent} monthSpent={data?.monthSpent} />
        <LargeButton onClick={() => setIsOpenExpenseModal(true)}>
          Adicionar despesa
          <FiMinusCircle size={20} color="#F03E35" />
        </LargeButton>
        <LargeButton onClick={() => setIsGainModal(true)}>
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