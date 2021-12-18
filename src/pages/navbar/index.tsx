import React from 'react';

import { SideNavbar } from '../../components/Navbar/SideNavbar';

import styles from './style.module.scss';

export default function Navbar() {

  return (
    <>
      <div className={styles.container} >
        <SideNavbar />
        <div className={styles.container__wrapper} >
          <span>Nova navbar</span>
          <div className={styles.container__wrapper__info_box}>
            <div className={styles.container__wrapper__info_box__box} >
              Teste
            </div>
            <div className={styles.container__wrapper__info_box__box} >
              Teste
            </div>
          </div>
        </div>
      </div>
    </>
 );
}