import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import '../styles/global.scss'

import { SidebarContextProvider } from '../contexts/SidebarContext'
import { Sidebar } from '../components/Sidebar'

import { QueryClientProvider } from 'react-query'
import { queryClient } from '../services/queryClient'
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider session={pageProps.session} >
        <SidebarContextProvider>
          <Sidebar />
          <Component {...pageProps} />
        </SidebarContextProvider>
      </Provider>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  )
}

export default MyApp
