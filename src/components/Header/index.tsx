import styles from './styles.module.scss'
import { motion } from 'framer-motion'
import { FiMenu } from 'react-icons/fi'
import { useContext } from 'react'
import { SidebarContext } from '../../contexts/SidebarContext'
import { Head } from 'next/document'

export function Header() {
  
  const { toogleSideBar } = useContext(SidebarContext)

  return (
    <header className={styles.container}>
      <motion.button 
        onClick={toogleSideBar} 
        whileTap={{ scale: 0.95 }}
      >
        <FiMenu size={30} color="#4F4F4F" />
      </motion.button>
    </header>

  )
}