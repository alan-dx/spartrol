import React from 'react';

import { BarChart } from '../Charts/BarChart';
import { GainSpentSelectButton } from '../GainSpentSelectButton';
import { PeriodButton } from '../PeriodButton';

import styles from './styles.module.scss';


interface BalanceByCategorySectionProps {
  data: any
}

export function BalanceByCategorySection({data}: BalanceByCategorySectionProps) {

  const [mode, setMode] = React.useState<'gain' | 'spent'>('gain')

  function handleChangeMode(mode: 'gain' | 'spent') {
    setMode(mode)
  }

  const chartData = mode ==='gain' ? data.gain : data.spent

  return (
    <div className={styles.balance_by_category_container}>
      <div className={styles.balance_by_category_container__title_box}>
        <h3 className={styles.balance_by_category_container__title_box__title}>Balanço por categoria</h3>
        <PeriodButton />
      </div>
      <GainSpentSelectButton mode={mode} changeMode={handleChangeMode} />
      <div className={styles.balance_by_category_container__chart_box}>
        <BarChart data={chartData} />
      </div>
    </div>
  )
}