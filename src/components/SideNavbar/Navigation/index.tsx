import React from 'react';

import styles from './styles.module.scss';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { 
  FiHome,
  FiPieChart,
  FiAward,
} from 'react-icons/fi';

export function Navigation() {

  const router = useRouter()

  return (
    <nav className={styles.navigation__container} >
        <ul className={styles.navigation__container__links_list}>
          <li 
            className={styles.navigation__container__links_list__link}
            data-active={router.asPath === '/home' ? true : false}
          >
            <Link href="/home">
              <>
                <i>
                  <FiHome size={23} color="#2D8282" />
                </i>
                <span 
                  className={styles.navigation__container__links_list__link__label}
                >
                  Home
                </span>
              </>
            </Link>
          </li>
          <li 
            className={styles.navigation__container__links_list__link}
            data-active={router.asPath === '/metrics' ? true : false}
            onClick={() => router.push('/metrics')}
          >
              <>
                <i>
                  <FiPieChart size={23} color="#2D8282"  />
                </i>
                <span 
                  className={styles.navigation__container__links_list__link__label}
                >
                  Relatórios
                </span>
              </>
          </li>
          <li 
            className={styles.navigation__container__links_list__link}
          >
            <Link href="/goals">
              <>
                <i>
                  <FiAward size={23} color="#2D8282"  />
                </i>
                <span 
                  className={styles.navigation__container__links_list__link__label}
                >
                  Objetivos
                </span>
              </>
            </Link>
          </li>
        </ul>
    </nav>
 );
}