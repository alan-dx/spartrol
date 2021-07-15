import styles from './sign_in.module.scss'
import { LargeButton } from '../components/LargeButton'
import { FaGoogle } from 'react-icons/fa'
import { useRouter } from 'next/dist/client/router'

import { signIn } from 'next-auth/client'

export default function signInPage() {

  const router = useRouter()
    
  return (
    <div className={styles.container}>

      <div className={styles.artBox} >
        <img src="/images/wallet_art.svg" alt="Hero" />
      </div>

      <div className={styles.signInBox} >
        <h1>Seja bem-vindo(a)</h1>
        <h2>Está pronto para gerenciar melhor seu dinheiro?</h2>
        <img src={"/images/logo.svg"} alt="Logo" />
        <div className={styles.buttonBox} >
          <LargeButton onClick={() => signIn('google')} >
            <FaGoogle size={22} color="#FFF" />
            Fazer login com Google
          </LargeButton>
        </div>
      </div>
    </div>
  )
}
