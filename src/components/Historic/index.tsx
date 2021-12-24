import React from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'

import { HistoricItem } from './HistoricItem'
import { TransactionData } from '../../@types/TransactionData'
import { Categories } from '../../@types/Categories'

interface HistoricProps {
  data: TransactionData[];
  categories: Categories;
}

const listVariants: Variants = {
  visible: {
    transition: { staggerChildren: 0.2 }
  },
  hidden: {
    transition: { staggerChildren: 0.05 }
  }
}

function Historic({data, categories}: HistoricProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>
          Histórico
        </h3>
        <Link href="/historic">Ver tudo</Link>
      </div>
      {
        data && //A div animada só deve ser renderizada quando os dados (data) estiverem carregados, caso contrário a animação não funcionará corretamente
        <motion.ol initial="hidden" animate="visible" variants={listVariants} >
          {data.map(item => (
            <HistoricItem key={item.id} item={item} categories={categories}/>
          ))}
        </motion.ol>
      }
    </div>
  )
}

export const HistoricMemoized = React.memo(Historic) //prevents unnecessary render, now this component just will re-render when his props changes