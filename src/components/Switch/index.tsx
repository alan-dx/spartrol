import React from 'react'

import { motion } from 'framer-motion'

import styles from './styles.module.scss'

export function Switch() {

  const [isOn, setIsOn] = React.useState(false)

  function toggleSwitch() {
    setIsOn(!isOn)
  }
 
  return(
    <div className={styles.container__switch} data-isOn={isOn} onClick={toggleSwitch}>
      <motion.div
        className={styles.container__switch__handle}
        layout
        whileHover={{
          scale: 1.05
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 50
        }}
      />
  </div>
  )
}