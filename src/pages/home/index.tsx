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
import { withSSRAuth } from '../../utils/withSSRAuth'
import { useEffect } from 'react'
import { useStatement } from '../../services/hooks/useStatement'
import { useCategories } from '../../services/hooks/useCategories'
import { withSSRAuthContext } from '../../@types/withSSRAuthContext'

interface HomeProps {
  session?: Session;
}

export default function Home({session}: HomeProps) {

  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false)
  const [isOpenGainModal, setIsOpenGainModal] = useState(false)

  const { data: statementeData, isFetching, isLoading, error } = useStatement({id: session?.id as string})
  const { data: categoriesData } = useCategories(session?.id as string)

  return (
    <>
      <AddSpentModal categories={categoriesData?.spent} isOpen={isOpenExpenseModal} closeModal={() => setIsOpenExpenseModal(false)} />
      <AddGainModal categories={categoriesData?.gain} isOpen={isOpenGainModal} closeModal={() => setIsOpenGainModal(false)} />
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