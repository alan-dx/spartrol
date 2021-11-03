import {motion, HTMLMotionProps} from 'framer-motion'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.scss'

interface ButtonProps extends HTMLMotionProps<"button"> {
  children?: ReactNode
}

export function LargeButton({ children, ...rest }: ButtonProps) {
  return (
    <motion.button
      className={styles.container}
      {...rest}
      whileTap={{
        scale: 0.90
      }}
    >
      {children}
    </motion.button>
  )
}