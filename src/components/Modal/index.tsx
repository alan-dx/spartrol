import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import styles from './styles.module.scss'

interface ModalProps {
  isOpen?: boolean;
  children?: ReactNode;
  closeModal?: () => void
}

export function Modal({ isOpen, children, closeModal }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.container}>
          <motion.div 
            initial={{
              scale: 0,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            exit={{
              scale: 0,
              opacity: 1
            }}
            className={styles.modalBody}
          >
            {children}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0,
            }}
            onClick={closeModal}
            className={styles.outsideModalBody}
          />
        </div>
      )}
    </AnimatePresence>
  )
}