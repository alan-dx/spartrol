import { motion, HTMLMotionProps} from 'framer-motion'
import { FiPlus, FiEdit } from 'react-icons/fi'

import styles from './styles.module.scss'

interface MoreButtonProps extends HTMLMotionProps<"button"> {
  editMode?: boolean
}

export const MoreButton = ({editMode = false,...rest}: MoreButtonProps) => {
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
      data-editmode={editMode}
    >
      {
        editMode
        ?
          <FiEdit size={20} color="#FFF" />
        :
          <FiPlus size={20} color="#FFF" />
      }
    </motion.button>
  )
}