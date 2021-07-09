import styles from './styles.module.scss'
import { FiMoreVertical } from 'react-icons/fi'

export function Balance() {
  return (
    <div className={styles.container} >
      <div>
        <small>Saldo</small>
        <button>
          <FiMoreVertical color="#4F4F4F" size={18} />
        </button>
      </div>
      <p id="balance">R$2.200,<small>35</small></p>
      <time>21 de Junho</time>
    </div>
  )
}