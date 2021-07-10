import { ProgressBar } from '../ProgressBar'
import styles from './styles.module.scss'

export function DayExpence() {
  return (
    <div className={styles.container}>
      <label htmlFor="goal">Hoje, você gastou:</label>
      <strong id="goal" >R$ 256,01</strong>
      <ProgressBar />
    </div>
  )
}