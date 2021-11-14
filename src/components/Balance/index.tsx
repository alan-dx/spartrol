import styles from './styles.module.scss'
import { FiBarChart2 } from 'react-icons/fi'
import { Wallet } from '../../@types/Wallet'
import { CounterCurrency } from '../CounterCurrency'
import { LoadingDots } from '../LoadingDots'

interface BalanceProps {
  balance: number;
  wallets: Wallet[];
  isLoading: boolean
}

export function Balance({balance, wallets = [], isLoading}: BalanceProps) {

  return (
    <div className={styles.container} >
      <h1 className={styles.container__title}>Patrimônio</h1>
      <div className={styles.container__equity_box}>
        {
          balance 
            ?
            <CounterCurrency from={0} to={balance} element={<strong className={styles.container__equity_box__value} />} />
            // <strong className={styles.container__equity_box__value}>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(balance).replace(/\s/g, '')}</strong> 
            :
            <strong className={styles.container__equity_box__value}>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(0).replace(/\s/g, '')}</strong>
        }
        <div className={styles.container__equity_box__chart_button}>
          <FiBarChart2 size={20} color="#4F4F4F" />
        </div>
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
                    <small className={styles.container__wallets_scroll__wallet_box__wallet__title}>{wallet.title.length > 6 ? wallet.title.slice(0,3)+'..' : wallet.title}</small>
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