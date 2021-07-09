import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface SidebarItemProps {
  icon?: ReactNode,
  text: string,
  href: string
}

export function SidebarItem({ icon, text , href}: SidebarItemProps) {

  const router = useRouter()

  return (
    <motion.li
      className={styles.container}
      whileHover={{ x: 10 }}
      whileTap={{ scale: 0.95, x: 0 }}
      transition={{duration: 0.2}}
      onClick={() => router.push(href)}
    >
      {icon}
      <label>{text}</label>
    </motion.li>
  )
}