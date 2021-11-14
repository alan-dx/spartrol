import { FiX, FiEdit } from 'react-icons/fi'
import { motion } from 'framer-motion'

import styles from './styles.module.scss'
import { Wallet } from '../../../../@types/Wallet'

interface WalletListItemProps {
  wallet: Wallet;
  onClick: () => void;
  editMode: boolean;
  cancelEditMode: () => void;
}

export const WalletListItem = ({ wallet, onClick, editMode, cancelEditMode }: WalletListItemProps) => {

  return (
    <div className={styles.wallet_list_item_container}>
      <div className={styles.wallet_list_item_container__info_box} >
        <strong className={styles.wallet_list_item_container__info_box__value}>
          {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(wallet.value)}
        </strong>
        <small className={styles.wallet_list_item_container__info_box__wallet}>{wallet.title}</small>
      </div>
      {
        editMode
        ?
          <motion.button
          whileHover={{ scale: 1.10 }}
          whileTap={{ scale: 0.95 }} 
          className={styles.wallet_list_item_container__button}
          onClick={cancelEditMode}
          data-editMode={true}
          >
            {<FiX size={18} color="#FFFFFF" />}
          </motion.button>
        :
          <motion.button
            whileHover={{ scale: 1.10 }}
            whileTap={{ scale: 0.95 }} 
            className={styles.wallet_list_item_container__button}
            onClick={onClick}
          >
            {<FiEdit size={18} color="#303030" />}
          </motion.button>
      }
    </div>
  )
}