import { motion } from 'framer-motion';
import { Category } from '../../../@types/category';
import styles from './styles.module.scss';
import { FiTrash2, FiEdit } from 'react-icons/fi'

interface ListItemProps {
  item: Category;
}

export const ListItem = ({item}: ListItemProps) => {
  return (
    <li className={styles.container}>
      {item.data.title}
      <div className={styles.container__buttons_box}>
        <motion.button
          whileHover={{ scale: 1.10 }}
          whileTap={{ scale: 0.95 }}
          className={styles.container__buttons_box__button}
        >
          {<FiEdit size={18} color="#303030" />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.10 }}
          whileTap={{ scale: 0.95 }} 
          className={styles.container__buttons_box__button}
        >
          {<FiTrash2 size={18} color="#FFF" />}
        </motion.button>
      </div>
    </li>
  )
}