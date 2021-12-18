import React from 'react';
import styles from './styles.module.scss';

import { useRouter } from 'next/router';

import routes from '../../routes.json';
import { getNavbarIcon } from '../../../../utils/getNavbarIcon';

export function Navigation() {

  const router = useRouter()

  return (
    <nav className={styles.navigation__container} >
        <ul className={styles.navigation__container__links_list}>
          {routes.map(route => (
            <li 
              className={styles.navigation__container__links_list__link}
              data-active={router.asPath === route.path ? true : false}
              onClick={() => router.push(route.path)}
              key={route.path}
            >
              <i>
                {getNavbarIcon(route.name)}
              </i>
              <span 
                className={styles.navigation__container__links_list__link__label}
              >
                {route.name}
              </span>
            </li>
          ))}
        </ul>
    </nav>
 );
}