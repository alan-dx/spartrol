import { SelectHTMLAttributes } from "react";
import styles from './styles.module.scss'

import { Field, FieldProps, FieldRenderProps } from 'react-final-form'

interface SelectProps extends FieldProps<string, FieldRenderProps<string, HTMLSelectElement>> {
  label?: string,
  id?: string
}

export function Select({label, id,...rest}: SelectProps) {
  return (
    <Field {...rest}>
      {({input, meta}) => (
        <div className={styles.selectBox}>
          <label htmlFor={id}>{label}</label>
          <select id={id} {...input} >
            <option value="Alimentação">Alimentação</option>
            <option value="Contas">Contas</option>
            <option value="Rolês">Rolês</option>
          </select>
        </div>
      )}
    </Field>
  )
}