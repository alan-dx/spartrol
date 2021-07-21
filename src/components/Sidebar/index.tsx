import { motion, AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import { SidebarContext } from '../../contexts/SidebarContext'
import { Navigation } from './Navigation'

import { FiArrowLeft } from 'react-icons/fi'
import styles from './styles.module.scss'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/client'
import { useEffect } from 'react'

// interface SidebarProps {
//   session: Session
// }

export function Sidebar() {

  const {isOpen, toogleSideBar} = useContext(SidebarContext)
  const [session] = useSession()

  // useEffect(() => {
  //   console.log(session.user)
  // }, [session])

  return (
    <AnimatePresence>
      {
        isOpen && (
          <div className={styles.container}>
            <motion.nav
              initial={{
                x: '-100%',
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
              <motion.header>
                <button onClick={toogleSideBar}>
                  <FiArrowLeft size={30} color="#4F4F4F" />
                </button>
              </motion.header>
              <div className={styles.userInfo}>
                <motion.img 
                  whileHover={{ scale: 1.10 }}
                  whileTap={{ scale: 0.95 }}
                  src={`${session?.user.image}`} 
                  alt="User Photo" 
                />
                <strong>{session?.user.name}</strong>
              </div>
              <Navigation />
            </motion.nav>
            <motion.div
              className={styles.outsideMenu}
              onClick={toogleSideBar}
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.2
                }
              }}
              transition={{
                duration: 1.4
              }}
            />
          </div>
        )
      }
    </AnimatePresence>
  )
}