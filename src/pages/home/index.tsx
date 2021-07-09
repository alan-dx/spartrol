import { Balance } from '../../components/Balance'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'

export default function Home() {

  return (
    <>
      <Header />
      <main className={styles.container}>
        <Balance />
        <label htmlFor="goal">Hoje, você gastou:</label>
        <strong>R$ 256,01</strong>
      </main>
    </>
  )
}