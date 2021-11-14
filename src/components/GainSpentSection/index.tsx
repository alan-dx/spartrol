import React from 'react';

import { AreaChart } from '../Charts/AreaChart';
import { CounterCurrency } from '../CounterCurrency';
import { GainSpentSelectButton } from '../GainSpentSelectButton';
import { PeriodButton } from '../PeriodButton';

import styles from './styles.module.scss';

interface GainSpentSectionProps {
  data: any
}

export function GainSpentSection({ data }: GainSpentSectionProps) {

  const [mode, setMode] = React.useState<'gain' | 'spent'>('gain')

  function handleChangeMode(mode: 'gain' | 'spent') {
    setMode(mode)
  }

  const chartData = mode ==='gain' ? data.gain : data.spent
  const valueData = mode === 'gain' ? data.gain.reduce((total, current) => total + current.value, 0) : data.spent.reduce((total, current) => total + current.value, 0) 
  // const valueData = data.gain.reduce((total, current) => {
  //   console.log(current)
  //   return total + current.value
  // }, 0)

  return (
    <div className={styles.gain_spent_container} >
      <div className={styles.gain_spent_container__title_box} >
        <h3 className={styles.gain_spent_container__title_box__title}>Ganho/Despesa por período</h3>
        <PeriodButton />
      </div>
      <GainSpentSelectButton mode={mode} changeMode={handleChangeMode} />
      <div className={styles.gain_spent_container__value_box}>
        <CounterCurrency 
          from={0} 
          to={valueData} 
          element={<span data-mode={mode === "spent" ? "spent" : ""} 
          className={styles.gain_spent_container__value_box__value} />} 
          disableInitialAnimation 
        /> 
        <small className={styles.gain_spent_container__value_box__label}>{mode == 'gain' ? 'ganhos' : 'gastos'} no período</small>
      </div>
      <AreaChart data={chartData} />
    </div>
  )
}