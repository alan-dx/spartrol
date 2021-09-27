import styles from './styles.module.scss'
import Link from 'next/link'
import { HistoricItem } from './HistoricItem'

import { TransactionData } from '../../@types/TransactionData'
import { Categories } from '../../@types/Categories'

interface HistoricProps {
  data: TransactionData[];
  categories: Categories;
}

export function Historic({data, categories}: HistoricProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header} >
        <h3>Histórico</h3>
        <Link href="/historic">Ver tudo</Link>
      </div>
      <ul>
        {data?.map(item => (
          <HistoricItem key={item.id} item={item} categories={categories}/>//prop drilling
        ))}
      </ul>
    </div>
  )
}