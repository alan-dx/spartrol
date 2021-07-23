import { SelectHTMLAttributes } from "react";
import styles from './styles.module.scss'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string,
  id?: string
}

export function Select({label, id,...rest}: SelectProps) {
  return (
    <div className={styles.selectBox}>
      <label htmlFor={id}>{label}</label>
      <select name="categories" id={id} {...rest} >
        <option value="Alimentação">Alimentação</option>
        <option value="Contas">Contas</option>
        <option value="Rolês">Rolês</option>
      </select>
    </div>
  )
}