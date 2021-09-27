import { Balance } from '../../components/Balance'
import { DayExpence } from '../../components/DayExpence'
import { Header } from '../../components/Header'
import { LargeButton } from '../../components/LargeButton'
import { Historic } from '../../components/Historic'

import styles from './styles.module.scss'
import { AddSpentModal } from '../../components/Modal/AddSpentModal'
import { useEffect, useMemo, useState } from 'react'
import { AddGainModal } from '../../components/Modal/AddGainModal'
import { Session } from 'next-auth'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { useStatement } from '../../hooks/useStatement'
import { useCategories } from '../../hooks/useCategories'
import { withSSRAuthContext } from '../../@types/withSSRAuthContext'
import { useMutation } from 'react-query'
import { api } from '../../services/api'

import { TransactionData } from '../../@types/TransactionData'
import { FinancialStatementData } from '../../@types/FinancialStatementData'
import { queryClient } from '../../services/queryClient'
import { useDayHistoric } from '../../hooks/useDayHistoric'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { ManageWalletModal } from '../../components/Modal/ManangeWalletModal'
import { Wallet } from '../../@types/Wallet'

interface HomeProps {
  session?: Session;
}

export default function Home({session}: HomeProps) {

  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false)
  const [isOpenGainModal, setIsOpenGainModal] = useState(false)
  const [isManangeWalletModal, setIsManageWalletModal] = useState(false)

  const windowSize = useWindowDimensions()

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
      if (isManangeWalletModal) setIsManageWalletModal(false)
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

    let updated_wallets = [...statementData.wallets]

    if (transaction.type === "spent") {//create spent transaction

      updated_wallets.forEach( wallet => {

        if (wallet.id === transaction.wallet_id) {
          wallet.value = wallet.value - transaction.value
        }
        
      })

      updateFinancialStatement.mutateAsync({
        day_spent: statementData.daySpent + transaction.value,
        month_spent: statementData.monthSpent + transaction.value,
        wallets: updated_wallets,
      })

    } else if (transaction.type === "gain") {//create gain transaction

      updated_wallets.forEach( wallet => {

        if (wallet.id === transaction.wallet_id) {
          wallet.value = wallet.value + transaction.value
        }
        
      })

      updateFinancialStatement.mutateAsync({
        wallets: updated_wallets
      })

    }

    //Add transaction in the history of the day
    addTransactionOnHistoric.mutateAsync(transaction)

    //INCREMENTAR no month_target da categoria

  }

  const handleUpdateWallets = (wallet_data: Wallet) => {
    //Reutilizar a uptadeFinancialStatemetn
    
    let wallets_updated = {...statementData.wallets}
    const isWalletAlreadyExists = statementData.wallets.findIndex(wallet => wallet === wallet_data )

    if (isWalletAlreadyExists !== -1) {
      wallets_updated[isWalletAlreadyExists] = wallet_data
    } else {
      wallets_updated = [...statementData.wallets, wallet_data]
    }

    // const data = {...statementData}

    updateFinancialStatement.mutateAsync({wallets: wallets_updated})
  }

  return (
    <>
      <AddSpentModal 
        categories={categoriesData?.spent} 
        isOpen={isOpenExpenseModal} 
        closeModal={() => setIsOpenExpenseModal(false)} 
        createSpent={handleCreateTransaction}
        wallets={statementData?.wallets}
      />
      <AddGainModal 
        categories={categoriesData?.gain} 
        wallets={statementData?.wallets || []}
        isOpen={isOpenGainModal} 
        closeModal={() => setIsOpenGainModal(false)} 
        createGain={handleCreateTransaction}
      />
      <ManageWalletModal 
        isOpen={isManangeWalletModal}
        closeModal={() => setIsManageWalletModal(false)}
        updateWallet={handleUpdateWallets}
        wallets={statementData?.wallets}
      />
      <Header />
      <main className={styles.main__container} >
        <div className={styles.main__container__wrapper}>
          <div className={styles.main__container__wrapper__info_box} >
            <Balance balance={statementData?.equity} wallets={statementData?.wallets} />
            <DayExpence 
              daySpent={statementData?.daySpent} 
              monthSpent={useMemo(() => Number(statementData?.monthSpent), [statementData?.monthSpent])} 
              monthTarget={statementData?.monthTarget}
              windowSize={windowSize}
            />
          </div>
          <div className={styles.main__container__wrapper__buttons_box} >
            <LargeButton onClick={() => setIsManageWalletModal(true)}>
              {/* <FiCreditCard size={20} color="#59D266" /> */}
              {windowSize.width > 768 && 'Gerenciar carteiras'}
              <img className={styles.main__container__wrapper__buttons_box__button_icon} src="/icons/wallet_icon_manage.svg" alt="manage portfolio" />
            </LargeButton>
            <LargeButton disabled={statementData?.wallets.length === 0} onClick={() => setIsOpenGainModal(true)}>
              {/* <FiPlusCircle size={20} color="#59D266" /> */}
              { windowSize.width > 768 && 'Adicionar ganho'}
              <img className={styles.main__container__wrapper__buttons_box__button_icon} src="/icons/money_icon_add.svg" alt="manage portfolio" />
            </LargeButton>
            <LargeButton disabled={statementData?.wallets.length === 0} onClick={() => setIsOpenExpenseModal(true)}>
              {/* <FiMinusCircle size={20} color="#F03E35" /> */}
              { windowSize.width > 768 && 'Adicionar despesa'}
              <img className={styles.main__container__wrapper__buttons_box__button_icon} src="/icons/money_icon_minus.svg" alt="manage portfolio" />
            </LargeButton>
            <LargeButton disabled={statementData?.wallets.length === 0} onClick={() => setIsOpenGainModal(true)}>
              {
                windowSize.width > 768 && 'Meta mensal'
              }
              <img className={styles.main__container__wrapper__buttons_box__button_icon} src="/icons/money_icon_target.svg" alt="manage portfolio" />
            </LargeButton>
          </div>
          <Historic data={dayHistoricData?.data.historic} categories={categoriesData} />
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