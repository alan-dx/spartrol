import React from 'react';
import { useSession } from 'next-auth/client';
import { signOut } from 'next-auth/client';

import styles from './styles.module.scss';

import { 
  FiLogOut,
  FiMenu
} from 'react-icons/fi';

import { Navigation } from './Navigation';
import { SidebarContext } from '../../../contexts/SidebarContext';

export function SideNavbar() {

  const {isOpen, toogleSideBar} = React.useContext(SidebarContext)
  const [session] = useSession()

  const name = session?.user.name.split(' ')

  function getDayMessage() {
    const hours = new Date().getHours() 

    if (hours < 12) {
      return 'Bom dia'
    } else if (hours >= 12 && hours <= 17) {
      return 'Boa tarde'
    } else if (hours >= 17 && hours <= 24) {
      return 'Boa noite'
    }

  }
  
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
            src={session?.user.image} 
            alt="User"
          />
          <div
            className={styles.navbar__container__logout_box__profile__text_box}
          >
            <span
              className={styles.navbar__container__logout_box__profile__text_box__name}
            >
              {name[0] + ' ' + name[1]}
            </span>
            <small
              className={styles.navbar__container__logout_box__profile__text_box__day}
            >
              {getDayMessage()}
            </small>
          </div>
        </div>
        <button 
          className={styles.navbar__container__logout_box__button} 
          onClick={() => signOut()}
        >
          <FiLogOut size={20} color="#2D8282" />
        </button>
      </div>

    </div>
 );
}