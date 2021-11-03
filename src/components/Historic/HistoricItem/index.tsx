import styles from './styles.module.scss'
import { motion, Variants } from 'framer-motion'

import { Categories } from '../../../@types/Categories'
import { TransactionData } from '../../../@types/TransactionData'

interface HistoricItem {
  item: TransactionData;
  categories: Categories
}

const itemVariants: Variants = {
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  hidden: {
    x: -100,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
}

export function HistoricItem({ item, categories }: HistoricItem) {

  return (
    <motion.li variants={itemVariants} className={styles.container} >
      <div>
        <strong>{item.title}</strong>
        <span style={{color: item.type == 'spent' ? '#F03E35' : '#59D266'}} >
         {item.type === 'spent' ? '-' : '+'} { new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.value)}
        </span>
      </div>
      {/* <small>{item.category_ref}</small> */}
      <small>
      {
        item.type === 'gain' 
        ? 
          categories?.gain.find(category => item.category_ref === category.ref['@ref'].id).data.title
        :
          categories?.spent.find(category => item.category_ref === category.ref['@ref'].id).data.title
      }
      </small>
    </motion.li>
  )
}