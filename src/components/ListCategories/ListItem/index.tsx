import { motion } from 'framer-motion';
import { Category } from '../../../@types/category';
import styles from './styles.module.scss';
import { FiTrash2, FiEdit, FiX } from 'react-icons/fi'

interface ListItemProps {
  item: Category;
  editMode: boolean;
  onClick: (category: Category) => void;
  cancelEditMode: () => void;
}

export const ListItem = ({item, editMode, onClick, cancelEditMode}: ListItemProps) => {
  return (
    <li className={styles.container}>
      <span className={styles.container__title}>
        {item.data.title}
      </span>
      <div className={styles.container__buttons_box}>
      {
          editMode
          ?
            <motion.button
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }} 
            className={styles.container__buttons_box__button}
            onClick={cancelEditMode}
            data-editMode={true}
            >
              {<FiX size={18} color="#FFFFFF" />}
            </motion.button>
          :
            <motion.button
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }} 
              className={styles.container__buttons_box__button}
              onClick={() => onClick(item)}
            >
              {<FiEdit size={18} color="#303030" />}
            </motion.button>
        }
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }} 
          className={styles.container__buttons_box__button}
        >
          {<FiTrash2 size={15} color="#FFF" />}
        </motion.button> */}
      </div>
    </li>
  )
}