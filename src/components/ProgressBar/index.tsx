import styles from './styles.module.scss'

export function ProgressBar() {
  return (
    <div className={styles.container} >
      <small>Meta mensal</small>
      <div className={styles.lineBox}>
        <div className={styles.line} style={{width: "85%"}} />
        <div />
      </div>
      <div className={styles.goalsRange}>
        <small>R$ 0</small>
        <small className={styles.center}>R$ 256,01</small>
        <small>R$ 300,00</small>
      </div>
    </div>
  )
}