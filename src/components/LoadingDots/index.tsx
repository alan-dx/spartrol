import React from 'react'
import { motion, Variants } from 'framer-motion'

import styles from './styles.module.scss'

const variants: Variants = {
  move: i => ({
    y: [0, -5, 0],
    transition: {
      repeat: Infinity,
      repeatType: 'loop',
      delay: i * 0.3,
      duration: 1
    }
  })
}

export function LoadingDots() {
  return (
    <motion.div className={styles.loading_dots_container} >
      <motion.div variants={variants} animate='move' custom={0} className={styles.loading_dots_container__dots} />
      <motion.div variants={variants} animate='move' custom={1}  className={styles.loading_dots_container__dots} />
      <motion.div variants={variants} animate='move' custom={2}  className={styles.loading_dots_container__dots} />
    </motion.div>
  )
}