import { SelectHTMLAttributes } from "react";
import styles from './styles.module.scss'

import { Field, FieldProps, FieldRenderProps } from 'react-final-form'
import { Category } from "../../@types/category";

interface SelectProps extends FieldProps<string, FieldRenderProps<string, HTMLSelectElement>> {
  label?: string,
  id?: string,
  options: Category[]
}

export function Select({label, options, id,...rest}: SelectProps) {

  return (
    <Field {...rest}>
      {({input, meta}) => (
        <div className={styles.selectBox}>
          <label htmlFor={id}>{label}</label>
          <select id={id} {...input} >
            {options.map(option => (
              <option key={option.ref['@ref'].id} value={option.ref['@ref'].id}>{option.data.title}</option>
            ))}
          </select>
        </div>
      )}
    </Field>
  )
}