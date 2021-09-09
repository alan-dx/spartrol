import styles from './styles.module.scss'

interface ProgressBarProps {
  monthSpent: number;
  monthTarget: number;
}

export function ProgressBar({monthSpent, monthTarget}: ProgressBarProps) {

  const monthTargetFormatted = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(monthTarget).replace(/\s/g, '')

  const monthSpentFormatted = monthSpent ? new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(monthSpent).replace(/\s/g, '') : new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(0.0).replace(/\s/g, '')

  return (
    <div className={styles.container} >
      <small>Gasto do mês</small>
      <div className={styles.lineBox}>
        {/* tornar o crescimento da barra dinâmico */}
        <div className={styles.line} style={{width: `${(monthSpent/monthTarget)*100}%`}} />
        <div />
      </div>
      <div className={styles.goalsRange}>
        <small>R$0</small>
        <small className={styles.center}>
          {monthSpent ? monthSpentFormatted  : <div />}
        </small>
        <small>{monthTargetFormatted}</small>
      </div>
    </div>
  )
}