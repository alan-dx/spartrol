import { FiPlusCircle } from 'react-icons/fi'
import { Modal } from "..";
import { Input } from '../../Input';
import styles from './styles.module.scss'

interface AddExpenseModalProps {
  isOpen: boolean;
  closeModal: () => void
}


export function AddGainModal({isOpen, closeModal}: AddExpenseModalProps) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal} >
      <div className={styles.modalContentContainer}>
        <header>
          <h1>Adicionar ganho</h1>
          <FiPlusCircle size={20} color="#59D266" />
        </header>
        <main>
          <Input label="Título" />
          <Input label="Categoria" />
          <div className={styles.valueBox} >
            <strong>R$</strong>
            <Input label="Valor" />
          </div>
        </main>
        <footer>
          <button onClick={closeModal}>Cancelar</button>
          <button>Confirmar</button>
        </footer>
      </div>
    </Modal>
  )
}