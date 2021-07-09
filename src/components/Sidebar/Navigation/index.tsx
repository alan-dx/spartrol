import { SidebarItem } from '../SidebarItem';
import { FiHome, FiPieChart, FiList, FiAward, FiUser, FiLogOut } from 'react-icons/fi'
import styles from './styles.module.scss';


export function Navigation() {
  return (
    <ul className={styles.container}>
      <SidebarItem href="home" text="Home" icon={<FiHome size={30} color="#4F4F4F" />} />
      <SidebarItem href="metrics" text="Relatórios" icon={<FiPieChart size={30} color="#4F4F4F" />} />
      <SidebarItem href="categories" text="Categorias" icon={<FiList size={30} color="#4F4F4F" />} />
      <SidebarItem href="goals" text="Metas" icon={<FiAward size={30} color="#4F4F4F" />} />
      <div className={styles.divider} />
      <SidebarItem href="user" text="Meu perfil" icon={<FiUser size={30} color="#4F4F4F" />} />
      <SidebarItem href="metrics" text="Sair da conta" icon={<FiLogOut size={30} color="#4F4F4F" />} />
    </ul>
  )
}