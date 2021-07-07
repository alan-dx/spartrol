import { Header } from '../../components/Header'
import styles from './styles.module.scss'

export default function Home() {

  return (
    <div className={styles.container} >
      <Header />
      <main>
        <div>
          R$ 2.200,35
        </div>
      </main>
    </div>
  )
}