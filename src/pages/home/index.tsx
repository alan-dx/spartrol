import React from 'react';

import { Balance } from '../../components/Balance'
import { DayExpence } from '../../components/DayExpence'
import { Header } from '../../components/Header'
import { LargeButton } from '../../components/LargeButton'
import { HistoricMemoized } from '../../components/Historic'

import styles from './styles.module.scss'
import { AddSpentModal } from '../../components/Modal/AddSpentModal'
import { useMemo, useState } from 'react'
import { AddGainModal } from '../../components/Modal/AddGainModal'
import { Session } from 'next-auth'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { getStatement, GetStatementResponse, useStatement } from '../../hooks/useStatement'
import { useCategories, getCategories } from '../../hooks/useCategories'
import { getDayHistoric, useDayHistoric } from '../../hooks/useDayHistoric';
import { useMutation } from 'react-query'
import { api } from '../../services/api'

import { queryClient } from '../../services/queryClient';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { ManageWalletModal } from '../../components/Modal/ManangeWalletModal';
import { AnimateSharedLayout } from 'framer-motion';

import { FinancialStatementData } from '../../@types/FinancialStatementData';
import { TransactionData } from '../../@types/TransactionData';
import { Wallet } from '../../@types/Wallet';
import { Category } from '../../@types/category';
import { Categories } from '../../@types/Categories';
import { withSSRAuthContext } from '../../@types/withSSRAuthContext'
import { DayHistoric } from '../../@types/DayHistoric';


interface HomeProps {
  session?: Session;
  initialStatementData: GetStatementResponse;
  initialDayHistoricData: DayHistoric;
  initialCategoriesData: Categories
}

export default function Home({
  session,
  initialStatementData,
  initialDayHistoricData,
  initialCategoriesData
}: HomeProps) {

  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false)
  const [isOpenGainModal, setIsOpenGainModal] = useState(false)
  const [isManageWalletModal, setIsManageWalletModal] = useState(false)

  const windowSize = useWindowDimensions()

  const { data: statementData, isFetching, isLoading, error } = useStatement({id: session?.id as string, initialData: initialStatementData})
  const { data: categoriesData } = useCategories({id: session?.id as string, initialData: initialCategoriesData})
  const { data: dayHistoricData } = useDayHistoric({id: session?.id as string, initialData: initialDayHistoricData})

  const updateFinancialStatement = useMutation(async (statement: FinancialStatementData) => {

    await api.put(`statement/${session.id}`, {
      updated_data: statement
    })

  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("statement")
      if (isOpenExpenseModal) setIsOpenExpenseModal(false)
      if (isOpenGainModal) setIsOpenGainModal(false)
      if (isManageWalletModal) setIsManageWalletModal(false)
    },
    onError: () => {
      alert("Houve um erro ao atualizar os dados!")
    }
  })

  const addTransactionOnHistoric = useMutation(async (transaction: TransactionData) => {
    await api.post('day_historic', {
      id: session?.id,
      transaction,
      old_historic: dayHistoricData
    })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('day_historic')
      queryClient.invalidateQueries('metrics')
    },
    onError: () => {
      alert("Houve um erro ao atualizar o histórico!")
    }
  })

  const updateCategories = useMutation(async (updated_data: Category) => {

    await api.put(`categories`, {
      updated_data,
      id: session?.id
    })

  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories')
    },
    onError: () => {
      alert("Houve um erro ao atualizar os dados das categorias!")
    }
  })

  const handleCreateTransaction = async (transaction: TransactionData) => {

    let updatedWallets = [...statementData.wallets]

    if (transaction.type === "spent") {//create spent transaction

      updatedWallets.forEach( wallet => {

        if (wallet.id === transaction.wallet_id) {
          wallet.value = wallet.value - transaction.value
        }
        
      })

      await updateFinancialStatement.mutateAsync({
        day_spent: statementData.daySpent + transaction.value,
        month_spent: statementData.monthSpent + transaction.value,
        wallets: updatedWallets,
      })

      let updatedCategory = [...categoriesData.spent].find(category => category.ref['@ref'].id === transaction.category_ref)
      updatedCategory.data.month_financial = updatedCategory.data.month_financial ? updatedCategory.data.month_financial + transaction.value : transaction.value
      await updateCategories.mutateAsync(updatedCategory)

    } else if (transaction.type === "gain") {//create gain transaction

      updatedWallets.forEach( wallet => {

        if (wallet.id === transaction.wallet_id) {
          wallet.value = wallet.value + transaction.value
        }
        
      })
      
      // It is necessary to send day_spent and month_spent to avoid the day_spent bug (keep the data from the previous day)
      await updateFinancialStatement.mutateAsync({
        day_spent: statementData.daySpent,
        month_spent: statementData.monthSpent,
        wallets: updatedWallets,
      })

      let updatedCategory = [...categoriesData.gain].find(category => category.ref['@ref'].id === transaction.category_ref)
      updatedCategory.data.month_financial = updatedCategory.data.month_financial ? updatedCategory.data.month_financial + transaction.value : transaction.value
      await updateCategories.mutateAsync(updatedCategory)

    }

    //Add transaction in the history of the day
    await addTransactionOnHistoric.mutateAsync(transaction)

  }

  const handleUpdateWallets = async (wallet_data: Wallet) => {
    //Reutilizar a uptadeFinancialStatemetn
    
    let wallets_updated = [...statementData.wallets]
    const isWalletAlreadyExists = statementData.wallets.findIndex(wallet => wallet.id === wallet_data.id )

    if (isWalletAlreadyExists !== -1) {
      wallets_updated[isWalletAlreadyExists] = wallet_data
    } else {
      wallets_updated = [...statementData.wallets, wallet_data]
    }

    await updateFinancialStatement.mutateAsync({wallets: wallets_updated})
  }

  return (
    <AnimateSharedLayout type="crossfade" >
      <AddSpentModal 
        categories={categoriesData?.spent} 
        isOpen={isOpenExpenseModal} 
        closeModal={() => setIsOpenExpenseModal(false)} 
        createSpent={handleCreateTransaction}
        wallets={statementData?.wallets}
        layoutId="add_spent_modal"
      />
      <AddGainModal 
        categories={categoriesData?.gain} 
        wallets={statementData?.wallets || []}
        isOpen={isOpenGainModal} 
        closeModal={() => setIsOpenGainModal(false)} 
        createGain={handleCreateTransaction}
        layoutId="add_gain_modal"
      />
      <ManageWalletModal 
        isOpen={isManageWalletModal}
        closeModal={() => setIsManageWalletModal(false)}
        updateWallet={handleUpdateWallets}
        wallets={statementData?.wallets}
        layoutId="manange_wallet_modal"
      />
      <Header />
      <main className={styles.main__container} >
        <div className={styles.main__container__wrapper}>
          <div className={styles.main__container__wrapper__info_box} >
            <Balance isLoading={isLoading} balance={statementData?.equity} wallets={statementData?.wallets} />
            <DayExpence 
              daySpent={statementData?.daySpent} 
              monthSpent={useMemo(() => Number(statementData?.monthSpent), [statementData?.monthSpent])} 
              monthTarget={statementData?.monthTarget}
              windowSize={windowSize}
            />
          </div>
          <div className={styles.main__container__wrapper__buttons_box} >
            <LargeButton layout layoutId="manange_wallet_modal" disabled={isLoading} onClick={() => setIsManageWalletModal(true)}>
              {/* <FiCreditCard size={20} color="#59D266" /> */}
              <span className={styles.main__container__wrapper__buttons_box__button_text}>{windowSize.width > 768 && 'Gerenciar'} carteira</span>
              <img className={styles.main__container__wrapper__buttons_box__button_icon} src="/icons/wallet_icon_manage.svg" alt="manage portfolio" />
            </LargeButton>
            <LargeButton layout layoutId="add_gain_modal" disabled={statementData?.wallets.length === 0 || isLoading} onClick={() => setIsOpenGainModal(true)}>
              {/* <FiPlusCircle size={20} color="#59D266" /> */}
              <span className={styles.main__container__wrapper__buttons_box__button_text}>{windowSize.width > 768 && 'Adicionar'} ganho</span>
              <img className={styles.main__container__wrapper__buttons_box__button_icon} src="/icons/money_icon_add.svg" alt="manage portfolio" />
            </LargeButton>
            <LargeButton layout layoutId="add_spent_modal" disabled={statementData?.wallets.length === 0 || isLoading} onClick={() => setIsOpenExpenseModal(true)}>
              {/* <FiMinusCircle size={20} color="#F03E35" /> */}
              <span className={styles.main__container__wrapper__buttons_box__button_text}>{windowSize.width > 768 && 'Adicionar'} despesa </span>
              <img className={styles.main__container__wrapper__buttons_box__button_icon} src="/icons/money_icon_minus.svg" alt="manage portfolio" />
            </LargeButton>
            <LargeButton layout disabled={statementData?.wallets.length === 0 || isLoading} onClick={() => setIsOpenGainModal(true)}>
              <span className={styles.main__container__wrapper__buttons_box__button_text}>Metas {windowSize.width > 768 && 'mensais'}</span>
              <img className={styles.main__container__wrapper__buttons_box__button_icon} src="/icons/money_icon_target.svg" alt="manage portfolio" />
            </LargeButton>
          </div>
          <HistoricMemoized data={dayHistoricData?.data.historic} categories={categoriesData} />
        </div>
      </main>
    </AnimateSharedLayout>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx: withSSRAuthContext) => {

  const { session } = ctx

  // ensureAuth middleware not working when this request is made
  const initialStatementData = await getStatement(session?.id)
  const initialDayHistoricData = await getDayHistoric(session?.id)
  const initialCategoriesData = await getCategories(session?.id)
  //FAZER PARA CATEGORIES

  return {
    props: {
      session,
      initialStatementData,
      initialDayHistoricData,
      initialCategoriesData
    }
  }
})