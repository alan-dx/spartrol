import { FiMinusCircle } from 'react-icons/fi'
import { Modal } from "..";
import { Input } from '../../Input';
import { Select } from '../../Select';
import styles from './styles.module.scss'

import { Form } from 'react-final-form'

interface AddSpentModalProps {
  isOpen: boolean;
  closeModal: () => void
}

type FormData = {
  title?: string;
  categories?: string;
  value?: string;
}

export function AddSpentModal({isOpen, closeModal}: AddSpentModalProps) {

  const handleCreateSpent = async (values: any) => {
    console.log(values)
  }

  const formValidation = (values: FormData) => {
    const errors: FormData = {}

    if (!values.title) {
      errors.title = 'Campo obrigatório'
    }

    if (!values.categories) {
      errors.categories = 'Campo obrigatório'
    }

    if (!values.value) {
      errors.value = 'Campo obrigatório'
    }

    return errors
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} >
      <div className={styles.modalContentContainer}>
        <header>
          <h1>Adicionar despesa</h1>
          <FiMinusCircle size={20} color="#F03E35" />
        </header>
        <Form 
          onSubmit={handleCreateSpent}
          validate={formValidation}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <main>
                <Input label="Título" type="text" name="title" />
                <Select label="Categorias" id="cat" name="categories" initialValue="Contas" />
                <div className={styles.valueBox} >
                  <strong>R$</strong>
                  <Input label="Valor" type="number" name="value" placeholder="0,00" />
                </div>
              </main>
              <footer>
                <button 
                  onClick={() => {
                    form.reset()
                    closeModal()
                  }}
                  disabled={submitting}
                >
                  Cancelar
                </button>
                <button type="submit" disabled={submitting}>Confirmar</button>
              </footer>
            </form>
          )}
        />
      </div>
    </Modal>
  )
}