import React from 'react'
import { Header } from "../../components/Header";
import { Session } from 'next-auth';

import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import styles from './styles.module.scss';

import { GainSpentSection } from '../../components/GainSpentSection';
import { TargetSpentSection } from '../../components/TargetSpentSection';
import { BalanceByCategorySection } from '../../components/BalanceByCategorySection';
import { PortfolioSection } from '../../components/PortfolioSection';

import historicTestData from './test.json';

import { getStatement, useStatement } from '../../hooks/useStatement';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { withSSRAuthContext } from '../../@types/withSSRAuthContext';
import { getMetricsData, useMetricsData } from '../../hooks/useMetricsData';
import { getCategories, useCategories } from '../../hooks/useCategories';


interface MetricsProps {
  session?: Session;
  // initialStatementData: GetStatementResponse;
  // initialMetricsData: MetricsData
}

export default function Metrics({ 
  session,
}: MetricsProps) {

  const { data: statementData, isFetching, isLoading, error } = useStatement({id: session?.id as string})
  const { data: metricsData } = useMetricsData({id: session?.id as string})
  const { data: categoriesData } = useCategories({id: session?.id as string})

  const historicData = historicTestData

  // useEffect(() => {
  //   alert("Mensagem do Dev: As funcionalidades desta página ainda estão em desenvolvimento, alguns dos dados aqui mostrados são apenas ilustrativos!")
  // }, [])

  return (
    <>
      <Header />
      <main className={styles.metrics__container}>
        <div className={styles.metrics__container__wrapper}>
          {/* <i className={styles.metrics__container__wrapper__alert}>
            As funcionalidades desta página ainda estão em desenvolvimento, alguns dos dados aqui mostrados são apenas ilustrativos!
          </i> */}
          <GainSpentSection data={metricsData?.gain_spent} />
          <TargetSpentSection monthSpent={statementData?.monthSpent} monthTarget={statementData?.monthTarget} />
          <BalanceByCategorySection data={metricsData?.categories} categories={categoriesData} />
          <PortfolioSection data={statementData} />
        </div>
      </main>      
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx: withSSRAuthContext) => {

  const { session } = ctx

  const queryClient = new QueryClient()
  
  //but this request below, at the condition, cause a error
  //error: Invalid interval at eachDayOfInterval
  await queryClient.prefetchQuery('metrics', () => getMetricsData(session?.id), {
    staleTime: 1000 * 60 * 10
  })

  if (ctx.req.url === '/metrics') {//On req.url there is a difference when the user navigates from another page and accesses it for the first time
    //this condition prevents unnecessary request to this routes. This way the requests below will 
    //not be performed when the user changes pages, for example.
    //This was a way I found to prevent requests from being made unnecessarily, 
    //as the data will possibly already be cached
    //Even if the data is not cached, requests will be made on the client side
    await queryClient.prefetchQuery('statement', () => getStatement(session?.id), {
      staleTime: 1000 * 60 * 10
    })
    await queryClient.prefetchQuery('categories', () => getCategories(session?.id), {
      staleTime: 1000 * 60 * 10
    })
    console.log('make requests at /metrics', ctx.req.url)
  }

  // ensureAuth middleware not working when this request is made
  // const initialStatementData = await getStatement(session?.id)


  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    }
  }
})