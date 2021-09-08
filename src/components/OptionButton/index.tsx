import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { Field, FieldProps, FieldRenderProps } from 'react-final-form'
import styles from './styles.module.scss'

interface OptionButtonProps extends FieldProps<string, FieldRenderProps<string, HTMLInputElement>> {
  label?: string;
  icon?: ReactNode;
}

export const OptionButton = ({icon, label,...rest}: OptionButtonProps) => {
  return (
    <Field {...rest}>
      {({input, meta}) => { 
      return (
        <>
          <input {...input} id={label} className={styles.input} />
          <motion.label 
            whileTap={{scale: 0.95}} 
            htmlFor={label} 
            className={`${styles.label} ${input.checked ? input.value == 'gain' ? styles.label_checked_green : styles.label_checked_red : ""}`} 
          >
            {icon}{label}
          </motion.label>
        </>
      )}}
    </Field>
  )
}