import React from 'react';
import { Navbar } from '../../components/Navbar';

import styles from './styles.module.scss';

export default function Goals() {
  return (
    <div className={styles.goals__container } >
      <Navbar />
      <div className={styles.goals__container__main} >
        <div className={styles.goals__container__main__wrapper}  >
          <img src="images/under_construction.svg" alt="Em construção" />
          <h1>Em breve!</h1>
          <span>Essa página ainda esta em construção</span>
        </div>
      </div>
    </div>
 );
}