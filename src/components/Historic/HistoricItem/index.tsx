import { TransactionData } from '../../../@types/TransactionData'
import styles from './styles.module.scss'

interface HistoricItem {
  item: TransactionData
}

export function HistoricItem({ item }: HistoricItem) {
  return (
    <li className={styles.container} >
      <div>
        <strong>{item.title}</strong>
        <span style={{color: item.type == 'spent' ? '#F03E35' : '#59D266'}} >
         {item.type === 'spent' ? '-' : '+'} { new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.value).replace(/\s/g, '')}
          {/* R$ {item.type == 'spent' ? `-${item.value}` : `${item.value}` } */}
        </span>
      </div>
      <small>{item.category_ref}</small>
    </li>
  )
}