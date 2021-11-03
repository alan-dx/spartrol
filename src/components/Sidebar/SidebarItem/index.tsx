import { motion, Variants } from 'framer-motion'
import { useRouter } from 'next/dist/client/router'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface SidebarItemProps {
  icon?: ReactNode,
  text: string,
  onClick: () => void,
  page?: string;
}

const variants: Variants = {
  open: {
    x: [-500,10,0],
    opacity: [0,1],
    transition: {
      x: { stiffness: 10, velocity: -100, bounce: 10 },
    }
  },
  closed: {
    x: [0, -500],
    opacity: [1,0],
    transition: {
      x: { stiffness: 1000, velocity: -100, bounce: 10 }
    },
  }
};

export function SidebarItem({ icon, text, onClick, page}: SidebarItemProps) {

  const router = useRouter()

  console.log(router.asPath)

  return (
    <motion.li
      className={`${styles.container} ${router.asPath === page ? styles.active : ''}`}
      onClick={onClick}
      variants={variants}
    >
      <motion.div
        whileHover={{ x: 10 }}
        whileTap={{ scale: 0.95, x: 0 }}
        transition={{duration: 0.2}}
      >
        {icon}
        <label>{text}</label>
      </motion.div>
    </motion.li>
  )
}