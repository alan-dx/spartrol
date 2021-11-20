import React from 'react';
import { motion, useAnimation } from 'framer-motion';

import styles from './styles.module.scss'
import { CounterCurrency } from '../CounterCurrency';

interface ProgressBarProps {
  monthSpent: number;
  monthTarget: number;
}

export function ProgressBar({monthSpent, monthTarget}: ProgressBarProps) {

  const monthTargetFormatted = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(monthTarget)

  const monthSpentFormatted = monthSpent ? new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(monthSpent).replace(/\s/g, '') : new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(0.0).replace(/\s/g, '')

  return (
    <div className={styles.container} >
      <small>Gasto do mês</small>
      <div className={styles.lineBox}>
        {/* tornar o crescimento da barra dinâmico */}
        {
          monthSpent ? (
            <motion.div
              className={styles.line}
              // style={{width: `${(monthSpent/monthTarget)*100}%`}}
              initial={{
                width: 0
              }}
              animate={{
                width: `${(monthSpent/monthTarget)*100}%`,
                transition: {
                  duration: 0.8
                }
              }}
            />) : 
          (<div className={styles.line} />)
        }
        <div />
      </div>
      <div className={styles.goalsRange}>
        <small>R$ 0</small>
        {
          monthSpent ? 
          <CounterCurrency from={0} to={monthSpent} element={<small className={styles.center} />} /> : 
          <small className={styles.center}>
            {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(0).replace(/\s/g, '')}
          </small>
        }
        <small>{monthTargetFormatted}</small>
      </div>
    </div>
  )
}