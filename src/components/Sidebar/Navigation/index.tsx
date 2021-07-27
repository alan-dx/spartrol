import { SidebarItem } from '../SidebarItem';
import { FiHome, FiPieChart, FiList, FiAward, FiUser, FiLogOut } from 'react-icons/fi'
import styles from './styles.module.scss';
import { useRouter } from 'next/dist/client/router';
import { signOut } from 'next-auth/client';
import { useContext } from 'react';
import { SidebarContext } from '../../../contexts/SidebarContext';


export function Navigation() {

  const {isOpen, toogleSideBar} = useContext(SidebarContext)
  const router = useRouter()

  return (
    <ul className={styles.container}>
      <SidebarItem onClick={() => {
        router.push('home')
        toogleSideBar()
      }} text="Home" icon={<FiHome size={30} color="#4F4F4F" />} />
      <SidebarItem onClick={() => {
        router.push('metrics')
        toogleSideBar()
      }} text="Relatórios" icon={<FiPieChart size={30} color="#4F4F4F" />} />
      <SidebarItem onClick={() => {
        router.push('categories')
        toogleSideBar()
      }} text="Categorias" icon={<FiList size={30} color="#4F4F4F" />} />
      <SidebarItem onClick={() => {
        router.push('goals')
        toogleSideBar()
      }} text="Metas" icon={<FiAward size={30} color="#4F4F4F" />} />
      <div className={styles.divider} />
      <SidebarItem onClick={() => {
        router.push('user')
        toogleSideBar()
      }} text="Meu perfil" icon={<FiUser size={30} color="#4F4F4F" />} />
      <SidebarItem onClick={() => {
        signOut()
      }}  text="Sair da conta" icon={<FiLogOut size={30} color="#4F4F4F" />} />
    </ul>
  )
}