import { SidebarItem } from '../SidebarItem';
import { FiHome, FiPieChart, FiList, FiAward, FiUser, FiLogOut } from 'react-icons/fi'
import styles from './styles.module.scss';
import { useRouter } from 'next/dist/client/router';
import { signOut } from 'next-auth/client';


export function Navigation() {

  const router = useRouter()

  return (
    <ul className={styles.container}>
      <SidebarItem onClick={() => router.push('home')} text="Home" icon={<FiHome size={30} color="#4F4F4F" />} />
      <SidebarItem onClick={() => router.push('metrics')} text="Relatórios" icon={<FiPieChart size={30} color="#4F4F4F" />} />
      <SidebarItem onClick={() => router.push('categories')} text="Categorias" icon={<FiList size={30} color="#4F4F4F" />} />
      <SidebarItem onClick={() => router.push('goals')} text="Metas" icon={<FiAward size={30} color="#4F4F4F" />} />
      <div className={styles.divider} />
      <SidebarItem onClick={() => router.push('user')} text="Meu perfil" icon={<FiUser size={30} color="#4F4F4F" />} />
      <SidebarItem onClick={() => signOut()}  text="Sair da conta" icon={<FiLogOut size={30} color="#4F4F4F" />} />
    </ul>
  )
}