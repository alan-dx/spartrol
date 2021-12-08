import React from 'react';
import styles from './styles.module.scss';
import { format, subDays, parseISO } from 'date-fns';

interface GainSpentSelectButtonProps {
  mode: 'gain' | 'spent';
  changeMode: (mode: 'gain' | 'spent') => void;
}

export function GainSpentSelectButton({ mode, changeMode }: GainSpentSelectButtonProps) {

  return (
    <div className={styles.gain_spent_select_button_container} >
      <div className={styles.gain_spent_select_button_container__buttons_box} >
        <button
          data-select={mode === 'gain' ? mode : ''}
          onClick={() => changeMode("gain")}
          className={styles.gain_spent_select_button_container__buttons_box__button}
        >
          Ganhos
        </button>
        <button
          data-select={mode === 'spent' ? mode : ''}
          onClick={() => changeMode("spent")}
          className={styles.gain_spent_select_button_container__buttons_box__button}
        >
          Despesas
        </button>
      </div>
      <small 
        className={styles.gain_spent_select_button_container__period_box}
      >
        {format(subDays(new Date(), 6), 'dd/MM')} - {format(new Date(), 'dd/MM')}
      </small>
    </div>
  )
}