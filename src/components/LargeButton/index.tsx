import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
}

export function LargeButton({ children, ...rest }: ButtonProps) {
  return (
    <button className={styles.container} {...rest}>
      {children}
    </button>
  )
}