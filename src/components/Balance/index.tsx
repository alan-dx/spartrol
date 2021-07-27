import styles from './styles.module.scss'
import { FiMoreVertical } from 'react-icons/fi'

interface BalanceProps {
  balance: number
}

export function Balance({balance}: BalanceProps) {
  return (
    <div className={styles.container} >
      <div>
        <small>Saldo</small>
        <button>
          <FiMoreVertical color="#4F4F4F" size={18} />
        </button>
      </div>
      <strong>R${balance}<small>35</small></strong>
      <time>21 de Junho</time>
    </div>
  )
}