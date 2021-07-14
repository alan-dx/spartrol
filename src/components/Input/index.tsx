import { InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, ...rest }: InputProps) {
  return (
    <div className={styles.inputBox}>
      <label htmlFor="input">{label}</label>
      <input {...rest} />
    </div>
  )
}