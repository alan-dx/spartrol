import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { SidebarContextProvider } from '../contexts/SidebarContext'
import { Sidebar } from '../components/Sidebar'
import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session} >
      <SidebarContextProvider>
        <Sidebar />
        <Component {...pageProps} />
      </SidebarContextProvider>
    </Provider>
  )
}

export default MyApp
