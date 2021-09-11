import { ReactNode, useState } from 'react';
import { Category } from '../../@types/category';
import { ListItem } from './ListItem';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import styles from './styles.module.scss';

interface ListCategoriesProps {
  title: string;
  data: Category[];
  icon: ReactNode;
}

export const ListCategories = ({title, data, icon}:ListCategoriesProps) => {

  const [ showList, setShowList ] = useState(true)

  return (
    <div className={styles.container} >
      <button onClick={() => setShowList(oldState => !oldState)} className={styles.container__button_title}>
        {icon}
        <h3 className={styles.container__button_title__title}>{title}</h3>
        {
          showList ? (<FiChevronUp size={18} color="#8C8C8C" />) : (<FiChevronDown size={18} color="#8C8C8C" />)
        }
      </button>
      {
        showList &&
        <ul className={styles.container__list}>
          {data?.map(item => (<ListItem key={item.ref['@ref'].id} item={item} />))}
        </ul>
      }
    </div>
  )
}