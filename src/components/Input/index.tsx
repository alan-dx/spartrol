import styles from './styles.module.scss'
import { motion } from 'framer-motion'

import { Field, FieldProps, FieldRenderProps } from 'react-final-form'

interface InputProps extends FieldProps<string, FieldRenderProps<string, HTMLInputElement>> {
  label?: string;
  placeholder?: string;
  maxLength?: number
}

export function Input({ label, placeholder, maxLength, ...rest }: InputProps) {
  return (
    <Field {...rest} >
      {({ input, meta }) => (
        <div className={styles.inputBox}>
          <label htmlFor="input">{label}</label>
          <motion.input 
            {...input} 
            className={(meta.error && meta.touched) ? styles.input_error : undefined} 
            animate={
              (meta.error && meta.touched) && {
                x: [0, 5, 0, 5, 0]
              }
            }
            transition={{ type: "spring", duration: 0.3 }}
            placeholder={placeholder}
            maxLength={maxLength}
          />
        </div>
      )}
    </Field>
  )
}