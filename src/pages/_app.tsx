import React from 'react'
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client'
import '../styles/global.scss'
import Head from 'next/head';

import { SidebarContextProvider } from '../contexts/SidebarContext'

import { QueryClientProvider, QueryClient } from 'react-query'
import { Hydrate } from 'react-query/hydration';
import { queryClient as newQueryClient } from '../services/queryClient'
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps }: AppProps) {

  const [queryClient] = React.useState(() => newQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState} >
        <Provider session={pageProps.session} >
          <SidebarContextProvider>
            <Head>
              <title>Spartrol</title>
            </Head>
            <Component {...pageProps} />
          </SidebarContextProvider>
        </Provider>
      </Hydrate>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  )
}

export default MyApp
