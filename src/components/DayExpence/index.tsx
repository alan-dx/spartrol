import useWindowDimensions from '../../hooks/useWindowDimensions'
import { ProgressBar } from '../ProgressBar'
import styles from './styles.module.scss'
import { useMemo } from 'react'
import { HomePieChart } from '../Charts/HomePieChart'

interface DayExpenceProps {
  daySpent?: string;
  monthSpent?: number;
}

export function DayExpence({daySpent, monthSpent}: DayExpenceProps) {

  // const windowSize = process.browser ? useWindowDimensions() : {width: 0, height: 0}
  const windowSize = useWindowDimensions()

  const monthSpentFormatted = useMemo(() => {//optei por formatar aq pois essa info tb é utilizada para calcular a %
    return monthSpent ? new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(monthSpent).replace(/\s/g, '') : new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(0.0).replace(/\s/g, '')
  }, [monthSpent])

  return (
    <div className={styles.container}>
      <div className={styles.container__day_spent_info}>
        <span>Hoje, você gastou:</span>
        <strong>
          {daySpent ? daySpent : new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(0.00).replace(/\s/g, '')}
        </strong>
      </div>
      {
        windowSize.width < 768 
        ?
          <ProgressBar monthSpent={monthSpentFormatted} /> 
        :
          <HomePieChart monthSpent={monthSpent} />
      }
    </div>
  )
}