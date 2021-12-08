import React from 'react';

import styles from './styles.module.scss'
import { FiBarChart2, FiEye, FiEyeOff } from 'react-icons/fi'

import { Wallet } from '../../@types/Wallet'

import { CounterCurrency } from '../CounterCurrency'
import { LoadingDots } from '../LoadingDots'
import { useRouter } from 'next/router';

interface BalanceProps {
  balance: number;
  wallets: Wallet[];
  isLoading: boolean
}

export function Balance({balance, wallets = [], isLoading}: BalanceProps) {

  const [showBalance, setShowBalance] = React.useState(true)

  const router = useRouter()

  function handleHiddenBalance() {
    setShowBalance(previousState => !previousState)
  }

  return (
    <div className={styles.container} >
      <div className={styles.container__title_box}>
        <h1 className={styles.container__title_box__title}>Patrimônio</h1>
        <button 
          className={styles.container__title_box__hidden_button}
          onClick={handleHiddenBalance}
        >
          {
            showBalance 
            ? <FiEyeOff size={18} color="#FFFFFF" />
            : <FiEye size={18} color="#FFFFFF" />
          }
        </button>
      </div>
      <div className={styles.container__equity_box}>
        {
          balance 
          ? <CounterCurrency 
              from={0} 
              to={balance} 
              element={
                <strong 
                  className={styles.container__equity_box__value} 
                  data-hidden={showBalance}
                />
              }   
            />
          : <strong 
            className={styles.container__equity_box__value}
          >
            {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(0).replace(/\s/g, '')}
          </strong>
        }
        <button 
          className={styles.container__equity_box__chart_button}
          onClick={() => router.push('/metrics')}
        >
          <FiBarChart2 size={20} color="#4F4F4F" />
        </button>
      </div>
      <div className={styles.container__wallets_scroll}>
        {
          !isLoading ?
            wallets.length !== 0 ? 
              wallets?.map((wallet) => (
                <div key={wallet.id} className={styles.container__wallets_scroll__wallet_box}>
                  <div className={styles.container__wallets_scroll__wallet_box__wallet} >
                    <h6 className={styles.container__wallets_scroll__wallet_box__wallet__value}>
                      {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(wallet.value).replace('R$', '')}
                    </h6>
                    <small className={styles.container__wallets_scroll__wallet_box__wallet__title}>
                      {wallet.title.length > 6 ? wallet.title.slice(0,3)+'..' : wallet.title}
                    </small>
                  </div>
                </div>
              )) :
            <strong className={styles.container__wallets_scroll__warn}>No momento, não há valores cadastrados em sua carteira!</strong>
          :
          <div className={styles.container__wallets_scroll__dots_box} >
            <LoadingDots />
          </div>
        }
      </div>
    </div>
  )
}