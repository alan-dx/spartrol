import { ProgressBar } from '../ProgressBar'
import styles from './styles.module.scss'
import { HomePieChart } from '../Charts/HomePieChart'
import { CounterCurrency } from '../CounterCurrency'

interface DayExpenceProps {
  daySpent: number;
  monthSpent: number;
  monthTarget: number;
  windowSize: {
    width: number,
    height: number,
  }
}

export function DayExpence({daySpent, monthSpent, monthTarget, windowSize}: DayExpenceProps) {

  // const daySpentFormated = daySpent ? new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(daySpent).replace(/\s/g, '') : new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(0.00).replace(/\s/g, '')

  return (
    <div className={styles.container}>
      <div className={styles.container__day_spent_info}>
        <span>Hoje, você gastou:</span>
        {
          daySpent ?
          (<CounterCurrency from={0} to={daySpent} element={<strong />} />) :
          (<strong>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(0.00)}</strong>)
        }
        {/* <strong>
          {daySpentFormated}
        </strong> */}
      </div>
      {
        windowSize.width < 768 
        ?
          <ProgressBar monthSpent={monthSpent} monthTarget={monthTarget} /> 
        :
          <HomePieChart monthSpent={monthSpent} monthTarget={monthTarget} />
      }
    </div>
  )
}