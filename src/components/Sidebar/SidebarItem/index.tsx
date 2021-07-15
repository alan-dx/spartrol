import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface SidebarItemProps {
  icon?: ReactNode,
  text: string,
  onClick: () => void
}

export function SidebarItem({ icon, text, onClick}: SidebarItemProps) {

  return (
    <motion.li
      className={styles.container}
      whileHover={{ x: 10 }}
      whileTap={{ scale: 0.95, x: 0 }}
      transition={{duration: 0.2}}
      onClick={onClick}
    >
      {icon}
      <label>{text}</label>
    </motion.li>
  )
}