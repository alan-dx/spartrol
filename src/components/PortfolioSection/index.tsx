import React from 'react';
import { Wallet } from '../../@types/Wallet';

import { DonutChart } from '../Charts/DonutChart';
import { CounterCurrency } from '../CounterCurrency';

import styles from './styles.module.scss';

interface PortfolioSectionProps {
  data: {
    equity: number;
    wallets: Wallet[]
  }
}

export function PortfolioSection({ data }: PortfolioSectionProps) {

  return (
    <div className={styles.gain_spent_container} >
      <div className={styles.gain_spent_container__title_box} >
        <h3 className={styles.gain_spent_container__title_box__title}>Composição do patrimônio</h3>
      </div>
      <div className={styles.gain_spent_container__value_box}>
        <span className={styles.gain_spent_container__value_box__value}>
          {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(data?.equity)}
        </span>
        <small className={styles.gain_spent_container__value_box__label}>patrimônio total</small>
      </div>
      <DonutChart data={data?.wallets} />
    </div>
  )
}