import { motion, HTMLMotionProps} from 'framer-motion'
import { FiPlus } from 'react-icons/fi'

import styles from './styles.module.scss'

export const MoreButton = ({...rest}: HTMLMotionProps<"button">) => {
  return (
    <motion.button
      {...rest}
      whileTap={{
        scale:
        0.95
      }}
      whileHover={{
        scale:
        1.05
      }}
      className={styles.container}
    >
      <FiPlus size={20} color="#FFF" />
    </motion.button>
  )
}