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
      <SidebarItem 
        onClick={() => {
          router.push('home')
          toogleSideBar()
        }} 
        text="Home"
        page="/home"
        icon={<FiHome size={25} />} 
      />
    
      <SidebarItem 
        onClick={() => {
          router.push('metrics')
          toogleSideBar()
        }} 
        text="Relatórios"
        page="/metrics" 
        icon={<FiPieChart size={25} />} 
      />
      <SidebarItem 
        onClick={() => {
          router.push('categories')
          toogleSideBar()
        }} 
        text="Categorias"
        page="/categories"
        icon={<FiList size={25} />} 
      />
      <SidebarItem 
        onClick={() => {
          router.push('goals')
          toogleSideBar()
        }} 
        text="Metas"
        page="/goals"
        icon={<FiAward size={25} />} 
      />
  
      <div className={styles.divider} />
      <SidebarItem 
        onClick={() => {
          router.push('user')
          toogleSideBar()
        }}
        page="/user"
        text="Meu perfil" 
        icon={<FiUser size={25} />} 
      />
      <SidebarItem 
        onClick={() => {
          signOut()
        }}  
        text="Sair da conta" 
        icon={<FiLogOut 
        size={25} 
       />} 
      />
      </ul>

    )
  }

