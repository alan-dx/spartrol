import styles from './styles.module.scss'

import { Categories } from '../../../@types/Categories'
import { TransactionData } from '../../../@types/TransactionData'

interface HistoricItem {
  item: TransactionData;
  categories: Categories
}

export function HistoricItem({ item, categories }: HistoricItem) {

  return (
    <li className={styles.container} >
      <div>
        <strong>{item.title}</strong>
        <span style={{color: item.type == 'spent' ? '#F03E35' : '#59D266'}} >
         {item.type === 'spent' ? '-' : '+'} { new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.value).replace(/\s/g, '')}
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
    </li>
  )
}