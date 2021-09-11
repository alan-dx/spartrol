import { Balance } from '../../components/Balance'
import { DayExpence } from '../../components/DayExpence'
import { Header } from '../../components/Header'
import { LargeButton } from '../../components/LargeButton'
import { Historic } from '../../components/Historic'

import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi'
import styles from './styles.module.scss'
import { AddSpentModal } from '../../components/Modal/AddSpentModal'
import { useMemo, useState } from 'react'
import { AddGainModal } from '../../components/Modal/AddGainModal'
import { Session } from 'next-auth'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { useStatement } from '../../services/hooks/useStatement'
import { useCategories } from '../../services/hooks/useCategories'
import { withSSRAuthContext } from '../../@types/withSSRAuthContext'
import { useMutation } from 'react-query'
import { api } from '../../services/api'

import { SpentGainStatementData } from '../../@types/SpentGainStatementData'
import { FinancialStatementData } from '../../@types/FinancialStatementData'
import { queryClient } from '../../services/queryClient'

interface HomeProps {
  session?: Session;
}

export default function Home({session}: HomeProps) {

  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false)
  const [isOpenGainModal, setIsOpenGainModal] = useState(false)

  const { data: statementData, isFetching, isLoading, error } = useStatement({id: session?.id as string})
  const { data: categoriesData } = useCategories(session?.id as string)

  const createSpentOrGain = useMutation(async (statement: FinancialStatementData) => {
    const response = await api.put(`statement/${session.id}`, {
      updated_data: statement
    })

    return response.data.data
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("statement")
    },
    onError: () => {
      alert("Houve um erro!")
    }
  })

  const handleCreateSpentOrGain = (statement: SpentGainStatementData) => {
    if (statement.type === "spent") {

      createSpentOrGain.mutateAsync({
        balance: statementData.balance - statement.value,
        day_spent: statementData.daySpent + statement.value,
        month_spent: statementData.monthSpent + statement.value
      })

    } else if (statement.type === "gain") {

      createSpentOrGain.mutateAsync({
        balance: statementData.balance + statement.value,
      })

    }
  }

  return (
    <>
      <AddSpentModal 
        categories={categoriesData?.spent || []} 
        isOpen={isOpenExpenseModal} 
        closeModal={() => setIsOpenExpenseModal(false)} 
        createSpent={handleCreateSpentOrGain}
      />
      <AddGainModal 
        categories={categoriesData?.gain || []} 
        isOpen={isOpenGainModal} 
        closeModal={() => setIsOpenGainModal(false)} 
        createGain={handleCreateSpentOrGain}
      />
      <Header />
      <main className={styles.main__container} >
        <div className={styles.main__container__wrapper}>
          <div className={styles.main__container__wrapper__info_box} >
            <Balance balance={statementData?.balance} />
            <DayExpence 
              daySpent={statementData?.daySpent} 
              monthSpent={useMemo(() => Number(statementData?.monthSpent), [statementData?.monthSpent])} 
              monthTarget={statementData?.monthTarget}
            />
          </div>
          <LargeButton onClick={() => setIsOpenExpenseModal(true)}>
            Adicionar despesa
            <FiMinusCircle size={20} color="#F03E35" />
          </LargeButton>
          <LargeButton onClick={() => setIsOpenGainModal(true)}>
            Adicionar ganho
            <FiPlusCircle size={20} color="#59D266" />
          </LargeButton>
          <Historic />
        </div>
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