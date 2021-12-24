import React from 'react';
import dynamic from 'next/dynamic'

import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { FiList } from 'react-icons/fi';

import { Balance } from '../../components/Balance'
import { DayExpence } from '../../components/DayExpence'
import { LargeButton } from '../../components/LargeButton'
import { HistoricMemoized } from '../../components/Historic'

import { AddSpentModal } from '../../components/Modal/AddSpentModal'
import { AddGainModal } from '../../components/Modal/AddGainModal'
import { ManageWalletModal } from '../../components/Modal/ManangeWalletModal';
import { ManageCategoriesModal } from '../../components/Modal/ManangeCategoriesModal';

import styles from './styles.module.scss';
import { useState } from 'react';
import { Session } from 'next-auth';
import { withSSRAuth } from '../../utils/withSSRAuth'
import { getStatement, GetStatementResponse, useStatement } from '../../hooks/useStatement'
import { useCategories, getCategories } from '../../hooks/useCategories'
import { getDayHistoric, useDayHistoric } from '../../hooks/useDayHistoric';
import { useMutation } from 'react-query'
import { api } from '../../services/api'

import { queryClient as queryClientCache } from '../../services/queryClient';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import { AnimateSharedLayout } from 'framer-motion';

import { FinancialStatementData } from '../../@types/FinancialStatementData';
import { TransactionData } from '../../@types/TransactionData';
import { Wallet } from '../../@types/Wallet';
import { Category } from '../../@types/category';
import { withSSRAuthContext } from '../../@types/withSSRAuthContext'
import { CreateCategoryFormData } from '../../@types/CreateCategoryFormData';

const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
})

interface HomeProps {
  session?: Session;
}

export default function Home({
  session,
}: HomeProps) {

  const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false)
  const [isOpenGainModal, setIsOpenGainModal] = useState(false)
  const [isManageWalletModal, setIsManageWalletModal] = useState(false)
  const [isOpenManangeCategoriesModal, setIsOpenManangeCategoriesModal] = useState(false)

  const windowSize = useWindowDimensions()

  const { data: statementData, isFetching, isLoading } = useStatement({id: session?.id as string})
  const { data: categoriesData } = useCategories({ id: session?.id as string })
  const { data: dayHistoricData } = useDayHistoric({id: session?.id as string})

  const updateFinancialStatement = useMutation(async (statement: FinancialStatementData) => {

    await api.put(`statement/${session.id}`, {
      updated_data: statement
    })

  }, {
    onSuccess: async () => {
      await queryClientCache.invalidateQueries("statement")
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
    onSuccess: async () => {
      await queryClientCache.invalidateQueries('day_historic')
      await queryClientCache.invalidateQueries('metrics')
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
    onSuccess: async () => {
      await queryClientCache.invalidateQueries('categories')
    },
    onError: () => {
      alert("Houve um erro ao atualizar os dados das categorias!")
    }
  })

  const createCategory = useMutation(async (category: CreateCategoryFormData) => {
    const response = await api.post("/categories", {
      id: session?.id,
      title: category.title,
      type: category.type
    })
    return response.data.category
  }, {
    onSuccess: async () => {
      await queryClientCache.invalidateQueries("categories")
    },
    onError: () => {
      alert("Deu erro")
    }
  })

  const handleCreateCategory = async (category: CreateCategoryFormData) => {
    await createCategory.mutateAsync(category)
  }

  const handleUpdateCategory = async (category: Category) => {
    await updateCategories.mutateAsync(category)
  }

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
      
      // It is necessary to send day_spent and month_spent to avoid the day_spent bug (keep data from the previous day)
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

  const monthSpentMemoized = React.useMemo(() => 
    Number(statementData?.monthSpent), [statementData?.monthSpent]
  )

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
      <ManageCategoriesModal
        isOpen={isOpenManangeCategoriesModal}
        closeModal={() => setIsOpenManangeCategoriesModal(false)}
        categories={categoriesData}
        createCategory={handleCreateCategory}
        updateCategories={handleUpdateCategory}
        layoutId="manange_categories_modal"
      />
      <div className={styles.container}>
        <Navbar />
        <main className={styles.container__main__container} >
          <div className={styles.container__main__container__wrapper}>
            <div className={styles.container__main__container__wrapper__info_box} >
              <Balance isLoading={isLoading} balance={statementData?.equity} wallets={statementData?.wallets} />
              <DayExpence 
                daySpent={statementData?.daySpent} 
                monthSpent={monthSpentMemoized} 
                monthTarget={statementData?.monthTarget}
                windowSize={windowSize}
              />
            </div>
            <div className={styles.container__main__container__wrapper__buttons_box} >
              <LargeButton layout layoutId="manange_wallet_modal" disabled={isLoading} onClick={() => setIsManageWalletModal(true)}>
                <span className={styles.container__main__container__wrapper__buttons_box__button_text}>{windowSize.width > 768 && 'Gerenciar'} carteiras</span>
                <img className={styles.container__main__container__wrapper__buttons_box__button_icon} src="/icons/wallet_icon_manage.svg" alt="manage portfolio" />
              </LargeButton>
              <LargeButton layout layoutId="add_gain_modal" disabled={statementData?.wallets.length === 0 || isLoading} onClick={() => setIsOpenGainModal(true)}>
                <span className={styles.container__main__container__wrapper__buttons_box__button_text}>{windowSize.width > 768 && 'Adicionar'} ganho</span>
                <img className={styles.container__main__container__wrapper__buttons_box__button_icon} src="/icons/money_icon_add.svg" alt="manage portfolio" />
              </LargeButton>
              <LargeButton layout layoutId="add_spent_modal" disabled={statementData?.wallets.length === 0 || isLoading} onClick={() => setIsOpenExpenseModal(true)}>
                <span className={styles.container__main__container__wrapper__buttons_box__button_text}>{windowSize.width > 768 && 'Adicionar'} despesa </span>
                <img className={styles.container__main__container__wrapper__buttons_box__button_icon} src="/icons/money_icon_minus.svg" alt="manage portfolio" />
              </LargeButton>
              <LargeButton layout layoutId="manange_categories_modal" disabled={statementData?.wallets.length === 0 || isLoading} onClick={() => setIsOpenManangeCategoriesModal(true)}>
                <span className={styles.container__main__container__wrapper__buttons_box__button_text}>{windowSize.width > 768 && 'Gerenciar'} categorias</span>
                <FiList size={35} color="#D8CF5D" />
              </LargeButton>
            </div>
            <HistoricMemoized data={dayHistoricData?.data.historic} categories={categoriesData} />
          </div>
        </main>
      </div>
    </AnimateSharedLayout>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx: withSSRAuthContext) => {

  const { session } = ctx

  const queryClient = new QueryClient()

  if (ctx.req.url === '/home') {//On req.url there is a difference when the user navigates from another page and accesses it for the first time
    //this condition prevents unnecessary request to this routes. This way the requests below will 
    //not be performed when the user changes pages, for example, only when render at first time.
    //This was a way I found to prevent requests from being made unnecessarily, 
    //as the data will possibly already be cached
    //Even if the data is not cached, requests will be made on the client side
    await queryClient.prefetchQuery('statement', () => getStatement(session?.id), {
      staleTime: 1000 * 60 * 10
    })
    await queryClient.prefetchQuery('categories', () => getCategories(session?.id), {
      staleTime: 1000 * 60 * 10
    })
    await queryClient.prefetchQuery('day_historic', () => getDayHistoric(session?.id), {
      staleTime: 1000 * 60 * 10
    })
    console.log('make requests at /home')
  }

  // ensureAuth middleware not working when this request is made
  // const initialStatementData = await getStatement(session?.id)
  // const initialDayHistoricData = await getDayHistoric(session?.id)
  // const initialCategoriesData = await getCategories(session?.id)

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    }
  }
})