import { Balance } from '../../components/Balance'
import { DayExpence } from '../../components/DayExpence'
import { Header } from '../../components/Header'
import { LargeButton } from '../../components/LargeButton'
import { Historic } from '../../components/Historic'

import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi'
import styles from './styles.module.scss'
import { AddSpentModal } from '../../components/Modal/AddSpentModal'
import { useEffect, useMemo, useState } from 'react'
import { AddGainModal } from '../../components/Modal/AddGainModal'
import { Session } from 'next-auth'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { useStatement } from '../../services/hooks/useStatement'
import { useCategories } from '../../services/hooks/useCategories'
import { withSSRAuthContext } from '../../@types/withSSRAuthContext'
import { useMutation } from 'react-query'
import { api } from '../../services/api'

import { TransactionData } from '../../@types/TransactionData'
import { FinancialStatementData } from '../../@types/FinancialStatementData'
import { queryClient } from '../../services/queryClient'
import { useDayHistoric } from '../../services/hooks/useDayHistoric'

interface HomeProps {
  session?: Session;
}

export default function Home({session}: HomeProps) {

  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false)
  const [isOpenGainModal, setIsOpenGainModal] = useState(false)

  const { data: statementData, isFetching, isLoading, error } = useStatement({id: session?.id as string})
  const { data: categoriesData } = useCategories(session?.id as string)
  const { data: dayHistoricData } = useDayHistoric(session?.id as string)

  const updateFinancialStatement = useMutation(async (statement: FinancialStatementData) => {
    const response = await api.put(`statement/${session.id}`, {
      updated_data: statement
    })

    return response.data.data
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("statement")
      if (isOpenExpenseModal) setIsOpenExpenseModal(false)
      if (isOpenGainModal) setIsOpenGainModal(false)
    },
    onError: () => {
      alert("Houve um erro!")
    }
  })

  const addTransactionOnHistoric = useMutation(async (transaction: TransactionData) => {
    const response = await api.post('day_historic', {
      id: session?.id,
      transaction,
      old_historic: dayHistoricData
    })
    console.log('Atualizado', response.data)
    response.data.newHistoric
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('day_historic')
    }
  })

  // const addTransactionOnHistoric = useMutation( async () => {return})

  const handleCreateTransaction = (transaction: TransactionData) => {
    
    if (transaction.type === "spent") {

      updateFinancialStatement.mutateAsync({
        balance: statementData.balance - transaction.value,
        day_spent: statementData.daySpent + transaction.value,
        month_spent: statementData.monthSpent + transaction.value
      })

    } else if (transaction.type === "gain") {

      updateFinancialStatement.mutateAsync({
        balance: statementData.balance + transaction.value,
      })

    }

    //ADD no HISTORICO
    addTransactionOnHistoric.mutateAsync(transaction)

  }

  const test = async () => {
    const response = await api.get(`day_historic`, {
      params: {
        id: session?.id
      }
    })

    console.log(response.data)
  }

  // useEffect(() => {
  //   api.get(`day_historic/${session.id}`)
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err))
  // }, [])

  return (
    <>
      <AddSpentModal 
        categories={categoriesData?.spent || []} 
        isOpen={isOpenExpenseModal} 
        closeModal={() => setIsOpenExpenseModal(false)} 
        createSpent={handleCreateTransaction}
      />
      <AddGainModal 
        categories={categoriesData?.gain || []} 
        isOpen={isOpenGainModal} 
        closeModal={() => setIsOpenGainModal(false)} 
        createGain={handleCreateTransaction}
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
          <Historic data={dayHistoricData?.data.historic} />
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