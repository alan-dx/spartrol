import React from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';

import styles from './styles.module.scss';

import { FiLogOut } from 'react-icons/fi'

import routes from '../routes.json';
import { getNavbarIcon } from '../../../utils/getNavbarIcon';

export function TabNavbar() {

  const router = useRouter()

  return (
    <nav className={styles.tabnavbar__container}>
      <div className={styles.tabnavbar__container__wrapper} >
        <ul className={styles.tabnavbar__container__wrapper__list_links} >
          {
            routes.map(route => (
              <li 
                className={styles.tabnavbar__container__wrapper__list_links__link} 
                data-active={router.asPath === route.path ? true : false}
                onClick={() => router.push(route.path)}
              >
                <div className={styles.tabnavbar__container__wrapper__list_links__link__box} >
                  <i>
                    {getNavbarIcon(route.name)}
                  </i>
                  <span
                    className={styles.tabnavbar__container__wrapper__list_links__link__box__label}
                    data-active={router.asPath === route.path ? true : false}
                  >
                    {route.name}
                  </span>
                </div>
              </li>
            ))
          }
          <li 
            className={styles.tabnavbar__container__wrapper__list_links__link}
            onClick={() => signOut()}
          >
            <div className={styles.tabnavbar__container__wrapper__list_links__link__box} >
              <i>
                <FiLogOut />
              </i>
            </div>
          </li>
        </ul>
      </div>
    </nav>
 );
}