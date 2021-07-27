import { ProgressBar } from '../ProgressBar'
import styles from './styles.module.scss'

interface DayExpenceProps {
  daySpent?: number;
  monthSpent?: number
}

export function DayExpence({daySpent, monthSpent}: DayExpenceProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="goal">Hoje, você gastou:</label>
      <strong id="goal" >
        {isNaN(daySpent) ? 'Carregando' : new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(daySpent)}
      </strong>
      <ProgressBar monthSpent={monthSpent} />
    </div>
  )
}