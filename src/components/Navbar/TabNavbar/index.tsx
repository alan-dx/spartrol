import React from 'react';
import { motion } from 'framer-motion';
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
              <motion.li 
                className={styles.tabnavbar__container__wrapper__list_links__link} 
                data-active={router.asPath === route.path ? true : false}
                onClick={() => router.push(route.path)}
                key={route.path}
                whileTap={{
                  scale: 0.93
                }}
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
              </motion.li>
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