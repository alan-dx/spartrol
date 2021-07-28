import styles from './styles.module.scss'

interface ProgressBarProps {
  monthSpent: string;
}

export function ProgressBar({monthSpent}: ProgressBarProps) {
  return (
    <div className={styles.container} >
      <small>Gasto do mês</small>
      <div className={styles.lineBox}>
        <div className={styles.line} style={{width: "85%"}} />
        <div />
      </div>
      <div className={styles.goalsRange}>
        <small>R$ 0</small>
        <small className={styles.center}>
          {monthSpent ? monthSpent  : <div />}
        </small>
        <small>R$ 300,00</small>
      </div>
    </div>
  )
}