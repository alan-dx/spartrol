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
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'

export default function Home() {

  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false)
  const [isOpenGainModal, setIsGainModal] = useState(false)

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  //TO DO
  //CRIAR O WITHSSRAUTH E GUEST

  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}