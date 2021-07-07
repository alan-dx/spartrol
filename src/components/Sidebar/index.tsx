import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/dist/client/router'
import { useContext } from 'react'
import { SidebarContext } from '../../contexts/SidebarContext'
import styles from './styles.module.scss'

export function Sidebar() {

  const {isOpen, toogleSideBar} = useContext(SidebarContext)
  const router = useRouter()

  return (
    <AnimatePresence>
      {
        isOpen && (
          <div className={styles.container}>
            <motion.div
              initial={{
                x: '-100%'
              }}
              animate={{
                x: 0
              }}
              exit={{
                x: '-100%'
              }}
              transition={{ type: "spring", bounce: 0, duration: 0.8 }}
              className={styles.menu}
            >
              <h1>Oi!</h1>
              <button onClick={() => router.push("/metrics")} >
                X
              </button>
            </motion.div>
            <motion.div 
              className={styles.outsideMenu}
              onClick={toogleSideBar}
            />
          </div>
        )
      }
    </AnimatePresence>
  )
}