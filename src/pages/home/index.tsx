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
import { useStatement } from '../../services/hooks/useStatement'

interface HomeProps {
  session?: Session
}

export default function Home({session}: HomeProps) {

  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false)
  const [isOpenGainModal, setIsGainModal] = useState(false)

  const { data, isFetching, isLoading, error } = useStatement(session?.id)

  useEffect(() => {
    alert(data?.balance)
  }, [data])

  return (
    <>
      <AddSpentModal isOpen={isOpenExpenseModal} closeModal={() => setIsOpenExpenseModal(false)} />
      <AddGainModal isOpen={isOpenGainModal} closeModal={() => setIsGainModal(false)} />
      <Header />
      <main className={styles.container} >
        <Balance balance={data?.balance} />
        <DayExpence daySpent={data?.day_spent} monthSpent={data?.month_spent} />
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

  return {
    props: {
      session
    }
  }
})