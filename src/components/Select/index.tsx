import { SelectHTMLAttributes } from "react";
import styles from './styles.module.scss'

import { Field, FieldProps, FieldRenderProps } from 'react-final-form'
import { Category } from "../../@types/category";
import { Wallet } from "../../@types/Wallet";

interface SelectProps extends FieldProps<string, FieldRenderProps<string, HTMLSelectElement>> {
  label?: string,
  id?: string,
  options: Category[] | Wallet[]
}

export function Select({label, options, id, ...rest}: SelectProps) {

  return (
    <Field {...rest}>
      {({input, meta}) => (
        <div className={styles.selectBox}>
          <label htmlFor={id}>{label}</label>
          <select id={id} {...input} >
            {options.map(option => (
              <option
                key={ option.data ? option.ref['@ref'].id : option.id}
                value={ option.data ? option.ref['@ref'].id : option.id}
              >
                { option.data ? option.data.title : option.title}
              </option>
            ))}
          </select>
        </div>
      )}
    </Field>
  )
}