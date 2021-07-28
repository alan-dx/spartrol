import { ProgressBar } from '../ProgressBar'
import styles from './styles.module.scss'

interface DayExpenceProps {
  daySpent?: string;
  monthSpent?: string;
}

export function DayExpence({daySpent, monthSpent}: DayExpenceProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="strong">Hoje, você gastou:</label>
      <strong >
        {daySpent ? daySpent : <div />}
      </strong>
      <ProgressBar monthSpent={monthSpent} />
    </div>
  )
}