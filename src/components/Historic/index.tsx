import styles from './styles.module.scss'
import Link from 'next/link'
import { HistoricItem } from './HistoricItem'
import { TransactionData } from '../../@types/TransactionData'

const list = [
  {
    id: 1,
    title: 'Lanche no trampo',
    category: 'Alimentação',
    type: 'expense',
    value: '27,00'
  },
  {
    id: 2,
    title: 'Detergente, bucha, etc',
    category: 'Prod. Limpeza',
    type: 'expense',
    value: '7,58'
  },
  {
    id: 3,
    title: 'Caixinha Xiaomi',
    category: 'Vendas',
    type: 'profit',
    value: '39,00'
  },
  {
    id: 4,
    title: 'Conta de luz',
    category: 'Contas',
    type: 'expense',
    value: '111,79'
  },
  {
    id: 5,
    title: 'Conta de luz',
    category: 'Contas',
    type: 'expense',
    value: '111,79'
  },
  {
    id: 6,
    title: 'Conta de luz',
    category: 'Contas',
    type: 'expense',
    value: '111,79'
  },
  {
    id: 7,
    title: 'Conta de luz',
    category: 'Contas',
    type: 'expense',
    value: '111,79'
  },
]

interface HistoricProps {
  data: TransactionData[]
}

export function Historic({data}: HistoricProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header} >
        <h3>Histórico</h3>
        <Link href="/historic">Ver tudo</Link>
      </div>
      <ul>
        {data?.map(item => (
          <HistoricItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  )
}