import { Balance } from '../../components/Balance'
import { DayExpence } from '../../components/DayExpence'
import { Header } from '../../components/Header'
import { LargeButton } from '../../components/LargeButton'
import { Historic } from '../../components/Historic'

import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi'
import styles from './styles.module.scss'
import { AddExpenseModal } from '../../components/Modal/AddExpenseModal'
import { useState } from 'react'
import { AddGainModal } from '../../components/Modal/AddGainModal'
import { Session } from 'next-auth'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { useEffect } from 'react'
import { api } from '../../services/api'

interface HomeProps {
  session?: Session
}

export default function Home({session}: HomeProps) {

  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false)
  const [isOpenGainModal, setIsGainModal] = useState(false)

  useEffect(() => {
    // api.put(`/statement/${session.id}`, {
    //   updated_data: {
    //     day_spent: 12.32,
    //     month_spent: 14.98
    //   }
    // }).then(res => console.log(res.data))
  }, [])

  return (
    <>
      <AddExpenseModal isOpen={isOpenExpenseModal} closeModal={() => setIsOpenExpenseModal(false)} />
      <AddGainModal isOpen={isOpenGainModal} closeModal={() => setIsGainModal(false)} />
      <Header />
      <main className={styles.container} >
        <Balance />
        <DayExpence />
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