import styles from './styles.module.scss'
import { FiMoreVertical } from 'react-icons/fi'

interface BalanceProps {
  balance: number;
}

export function Balance({balance}: BalanceProps) {

  const date = new Date()

  return (
    <div className={styles.container} >
      <div>
        <small>Patrimônio</small>
        <button>
          <FiMoreVertical color="#4F4F4F" size={18} />
        </button>
      </div>
      {
        balance 
          ?
          <strong>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(balance).replace(/\s/g, '')}</strong> 
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