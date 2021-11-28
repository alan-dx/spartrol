import styles from './styles.module.scss'
import { FiChevronDown } from 'react-icons/fi'

export function PeriodButton() {
  return (
    <button className={styles.period_button_container}>
      <small>
        7 dias
      </small>
      <FiChevronDown size={12} />
    </button>
  )
}