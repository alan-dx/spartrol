import React from 'react';
import styles from './styles.module.scss';

interface GainSpentSelectButtonProps {
  mode: 'gain' | 'spent';
  changeMode: (mode: 'gain' | 'spent') => void;
}

export function GainSpentSelectButton({ mode, changeMode }: GainSpentSelectButtonProps) {

  return (
    <div className={styles.gain_spent_select_button_container} >
      <button
        data-select={mode === 'gain' ? mode : ''}
        onClick={() => changeMode("gain")}
        className={styles.gain_spent_select_button_container__button}
      >
        Ganhos
      </button>
      <button
        data-select={mode === 'spent' ? mode : ''}
        onClick={() => changeMode("spent")}
        className={styles.gain_spent_select_button_container__button}
      >
        Despesas
      </button>
    </div>
  )
}