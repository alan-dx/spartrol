import { motion } from 'framer-motion'
import { useRouter } from 'next/dist/client/router'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface SidebarItemProps {
  icon?: ReactNode,
  text: string,
  onClick: () => void,
  page?: string;
}

export function SidebarItem({ icon, text, onClick, page}: SidebarItemProps) {

  const router = useRouter()

  console.log(router.asPath)

  return (
    <li
      className={`${styles.container} ${router.asPath === page ? styles.active : ''}`}
      onClick={onClick}
    >
      <motion.div
        whileHover={{ x: 10 }}
        whileTap={{ scale: 0.95, x: 0 }}
        transition={{duration: 0.2}}
      >
        {icon}
        <label>{text}</label>
      </motion.div>
    </li>
  )
}