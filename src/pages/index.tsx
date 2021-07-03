import styles from './sign_in.module.scss'
import { LargeButton } from '../components/LargeButton'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/dist/client/router'

export default function signIn() {

  const router = useRouter()
    
  return (
    <div className={styles.container}>
      <h1>Seja bem-vindo(a)</h1>
      <img src={"/images/logo.svg"} alt="Logo" />
      <div className={styles.buttonBox} >
        <LargeButton onClick={() => router.push('/home')} >
          <FcGoogle size={22} />
          Fazer login com Google
        </LargeButton>
      </div>
    </div>
  )
}
