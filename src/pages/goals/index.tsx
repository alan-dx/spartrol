import React from 'react';
import dynamic from 'next/dynamic';
import { withSSRAuthContext } from '../../@types/withSSRAuthContext';
// import { Navbar } from '../../components/Navbar';
import { withSSRAuth } from '../../utils/withSSRAuth';

import styles from './styles.module.scss';

const Navbar = dynamic(() => import('../../components/Navbar'), {
  ssr: false
})

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

export const getServerSideProps = withSSRAuth(async (ctx: withSSRAuthContext) => {

  const { session } = ctx

  return {
    props: {
      session
    }
  }
})