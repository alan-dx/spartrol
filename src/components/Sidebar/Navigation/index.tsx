import { SidebarItem } from '../SidebarItem';
import { FiHome, FiPieChart, FiList, FiAward, FiUser, FiLogOut } from 'react-icons/fi'
import { motion } from 'framer-motion'

import styles from './styles.module.scss';
import { useRouter } from 'next/dist/client/router';
import { signOut } from 'next-auth/client';
import { useContext } from 'react';
import { SidebarContext } from '../../../contexts/SidebarContext';


const variants = {
  open: {
    transition: { staggerChildren: 0.15 }
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 }
  }
};

export function Navigation() {

  const {isOpen, toogleSideBar} = useContext(SidebarContext)
  const router = useRouter()

  return (
    <motion.ul className={styles.container} animate={isOpen ? 'open' : 'closed'} variants={variants}>
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
      {/* <SidebarItem 
        onClick={() => {
          router.push('categories')
          toogleSideBar()
        }} 
        text="Categorias"
        page="/categories"
        icon={<FiList size={25} />} 
      /> */}
      <SidebarItem 
        onClick={() => {
          router.push('goals')
          toogleSideBar()
        }} 
        text="Objetivos"
        page="/goals"
        icon={<FiAward size={25} />} 
      />
  
      <motion.div  className={styles.divider} />
      <SidebarItem 
        onClick={() => {
          signOut()
        }}  
        text="Sair da conta" 
        icon={<FiLogOut 
        size={25} 
       />} 
      />
      </motion.ul>

    )
  }

