import React from 'react';

import { MiniPieChart } from '../Charts/MiniPieChart';
import { CounterCurrency } from '../CounterCurrency';

import styles from './styles.module.scss';

interface TargetSpentSection {
  monthSpent: number;
  monthTarget: number;
}

export function TargetSpentSection({
  monthSpent = 0,
  monthTarget = 1
}: TargetSpentSection) {
  return (
    <div className={styles.target_spent_container}>
      <MiniPieChart monthSpent={monthSpent} monthTarget={monthTarget} />
      <div className={styles.target_spent_container__info_box}>
        <small className={styles.target_spent_container__info_box__title}>
          Meta de gasto mensal
        </small>
        <div className={styles.target_spent_container__info_box__value_box}>
          <CounterCurrency 
            from={0} 
            to={monthSpent} 
            element={<span className={styles.target_spent_container__info_box__value_box__text} />} 
          />{" "}
          <span className={styles.target_spent_container__info_box__value_box__text}>
            /{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(monthTarget).replace("R$", "")}
          </span>
        </div>
      </div>
    </div>
  )
}