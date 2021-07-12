import styles from './styles.module.scss'

interface HistoricItem {
  item: {
    id: number,
    title: string,
    category: string,
    type: string,
    value: string
  }
}

export function HistoricItem({ item }: HistoricItem) {
  return (
    <li className={styles.container} >
      <div>
        <strong>{item.title}</strong>
        <strong style={{color: item.type == 'expense' ? '#F03E35' : '#59D266'}} >
          R$ {item.type == 'expense' ? `-${item.value}` : `${item.value}` }
        </strong>
      </div>
      <small>{item.category}</small>
    </li>
  )
}