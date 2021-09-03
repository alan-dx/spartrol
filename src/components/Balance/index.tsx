import styles from './styles.module.scss'
import { FiMoreVertical } from 'react-icons/fi'

interface BalanceProps {
  balance: {
    currency: string;
    cents: string;
  }
}

export function Balance({balance}: BalanceProps) {

  const date = new Date()

  return (
    <div className={styles.container} >
      <div>
        <small>Saldo</small>
        <button>
          <FiMoreVertical color="#4F4F4F" size={18} />
        </button>
      </div>
      {
        balance 
          ?
          <strong>{balance.currency},<small>{balance.cents}</small></strong> 
          :
          <strong>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(0.00).replace(/\s/g, '')}</strong>
      }
      <time>{new Intl.DateTimeFormat('pt-BR', 
      { 
        month: 'long', 
        day: '2-digit' 
      }).format(date)}</time>
    </div>
  )
}