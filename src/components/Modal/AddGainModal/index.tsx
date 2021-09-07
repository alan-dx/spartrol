import { FiPlusCircle } from 'react-icons/fi'
import { Modal } from "..";
import { Input } from '../../Input';
import { Select } from '../../Select';

import { Form } from 'react-final-form'
import styles from './styles.module.scss'
import { Category } from '../../../@types/category';

interface AddGainModalProps {
  isOpen: boolean;
  closeModal: () => void
}

interface AddGainModalProps {
  isOpen: boolean;
  categories: Category[],
  closeModal: () => void
}

type FormData = {
  title?: string;
  categories?: string;
  value?: string;
}

export function AddGainModal({isOpen, categories ,closeModal}: AddGainModalProps) {

  const handleCreateGain = async (values: any) => {
    console.log(values)
    //Salvar o valor monetário em type number
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
      <section className={styles.modalContentContainer}>
        <header>
          <h1>Adicionar ganho</h1>
          <FiPlusCircle size={20} color="#59D266" />
        </header>
        <Form 
          onSubmit={handleCreateGain}
          validate={formValidation}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Input label="Título" type="text" name="title" />
                <Select options={categories} label="Categorias" id="cat" name="categories" initialValue={categories[0]?.data.title} />
                <div className={styles.valueBox} >
                  <strong>R$</strong>
                  <Input label="Valor" type="tel" name="value" placeholder="0,00" />
                </div>
              </div>
              <div className={styles.modalContentContainer__footer}>
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
              </div>
            </form>
          )}
        />
      </section>
    </Modal>
  )
}