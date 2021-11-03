import React, { useEffect } from 'react'
import { Header } from "../../components/Header";
import { Session } from 'next-auth';

import styles from './styles.module.scss';

import { GainSpentSection } from '../../components/GainSpentSection';
import { TargetSpentSection } from '../../components/TargetSpentSection';
import { BalanceByCategorySection } from '../../components/BalanceByCategorySection';
import { PortfolioSection } from '../../components/PortfolioSection';

import historicTestData from './test.json';

import { useStatement } from '../../hooks/useStatement';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { withSSRAuthContext } from '../../@types/withSSRAuthContext';

interface MetricsProps {
  session?: Session;
}

export default function Metrics({ session }: MetricsProps) {

  const { data: statementData, isFetching, isLoading, error } = useStatement({id: session?.id as string})

  const historicData = historicTestData

  // useEffect(() => {
  //   alert("Mensagem do Dev: As funcionalidades desta página ainda estão em desenvolvimento, alguns dos dados aqui mostrados são apenas ilustrativos!")
  // }, [])

  return (
    <>
      <Header />
      <main className={styles.metrics__container}>
        <div className={styles.metrics__container__wrapper}>
          <i className={styles.metrics__container__wrapper__alert}>
            As funcionalidades desta página ainda estão em desenvolvimento, alguns dos dados aqui mostrados são apenas ilustrativos!
          </i>
          <GainSpentSection data={historicData.historic} />
          <TargetSpentSection monthSpent={statementData?.monthSpent} monthTarget={statementData?.monthTarget} />
          <BalanceByCategorySection data={historicData.historic} />
          <PortfolioSection data={statementData} />
        </div>
      </main>      
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx: withSSRAuthContext) => {

  const { session } = ctx

  // ensureAuth middleware not working when this request is made
  // await api.get(`statement/${session?.id}`).then(res => console.log(res.data)).catch(err => console.log(err.data))

  return {
    props: {
      session
    }
  }
})