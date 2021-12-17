import React from 'react';

import styles from './styles.module.scss';

import { 
  FiUser,
  FiLogOut,
  FiMenu
} from 'react-icons/fi';

import { Navigation } from './Navigation';
import { SidebarContext } from '../../contexts/SidebarContext';

export function SideNavbar() {

  const {isOpen, toogleSideBar} = React.useContext(SidebarContext)
  
  return (
    <div 
      className={styles.navbar__container}
      data-open={isOpen ? true : false}
    >
      <button 
        className={styles.navbar__container__open_button} 
        onClick={() => toogleSideBar()}
      >
        <span 
          className={styles.navbar__container__open_button__label}
          data-open={isOpen ? true : false}
        >
          Spartrol
        </span>
        <i>
          <FiMenu size={20} color='#FFF' />
        </i>
      </button>

      <Navigation />

      <div className={styles.navbar__container__logout_box} >
        <div 
          className={styles.navbar__container__logout_box__profile} 
          data-open={isOpen ? true : false}
        >
          <img
            className={styles.navbar__container__logout_box__profile__photo}
            src="https://avatars.githubusercontent.com/u/53129847?v=4" 
            alt="User"
          />
          <div
            className={styles.navbar__container__logout_box__profile__text_box}
          >
            <span
              className={styles.navbar__container__logout_box__profile__text_box__name}
            >
              Alan Almeida
            </span>
            <small
              className={styles.navbar__container__logout_box__profile__text_box__day}
            >
              Bom Dia
            </small>
          </div>
        </div>
        <button className={styles.navbar__container__logout_box__button} >
          <FiLogOut size={20} color="#2D8282" />
        </button>
      </div>

    </div>
 );
}