import { AppProps } from 'next/app'
import { SidebarContextProvider } from '../contexts/SidebarContext'
import { Sidebar } from '../components/Sidebar'
import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SidebarContextProvider>
      <Sidebar />
      <Component {...pageProps} />
    </SidebarContextProvider>
  )
}

export default MyApp
