import React from 'react';
import styles from './styles.module.scss';

import { useRouter } from 'next/router';

import routes from '../../routes.json';
import { getNavbarIcon } from '../../../../utils/getNavbarIcon';
import { ro } from 'date-fns/locale';

export function Navigation() {

  const router = useRouter()

  return (
    <div className={styles.navigation__container} >
        <ul className={styles.navigation__container__links_list}>
          {routes.map(route => (
            <li 
              className={styles.navigation__container__links_list__link}
              data-active={router.asPath.replace(/[#]/i, '') === route.path ? true : false}
              onClick={() => router.push(route.path)}
              key={route.path}
            >
              <i>
                {getNavbarIcon(route.name)}
              </i>
              <a 
                className={styles.navigation__container__links_list__link__label}
              >
                {route.name}
              </a>
            </li>
          ))}
        </ul>
    </div>
 );
}