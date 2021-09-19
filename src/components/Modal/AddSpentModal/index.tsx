import { FiMinusCircle } from 'react-icons/fi'
import { Modal } from "..";
import { Input } from '../../Input';
import { Select } from '../../Select';
import styles from './styles.module.scss'

import { Form } from 'react-final-form'
import { Category } from '../../../@types/category';
import { TransactionData } from '../../../@types/TransactionData';

interface AddSpentModalProps {
  isOpen: boolean;
  categories: Category[]
  closeModal: () => void;
  createSpent: (statement: TransactionData) => void;
}

type FormData = {
  title?: string;
  category_ref?: string;
  value?: string;
}

export function AddSpentModal({isOpen, categories, closeModal, createSpent}: AddSpentModalProps) {

  const handleCreateSpent = async (values: any) => {

    let data = {...values, type: "spent", id: Date.now()};//imutabilty
    
    // if (values.value.indexOf(",") == -1 && values.value.indexOf(".") == -1) {//format: 12
    //   data.value = `${data.value}.00`
    // }

    data.value = Number(data.value.replace(",", "."))
    // data.categories = {title: values.categories, category_ref_ref: categories.find(item => item.data.title === values.categories).ref['@ref'].id}
    
    createSpent(data)
    // closeModal()
  }

  const formValidation = (values: FormData) => {
    const errors: FormData = {}

    if (!values.title) {
      errors.title = 'Campo obrigatório'
    }

    if (!values.category_ref) {
      errors.category_ref = 'Campo obrigatório'
    }

    if (!values.value) {
      errors.value = 'Campo obrigatório'
    } else if (!Number(values?.value.replace(",","."))) {//avoid NaN
      errors.value = "Formato inadequado!"
    }

    return errors
  }

  const normalizeValue = (value: string) => {
    if (!value) return value
    const onlyNums = value.replace(/[^0-9.,]/g, "")
    return onlyNums
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} >
      <section className={styles.modalContentContainer}>
        <header>
          <h1>Adicionar despesa</h1>
          <FiMinusCircle size={20} color="#F03E35" />
        </header>
        <Form 
          onSubmit={handleCreateSpent}
          validate={formValidation}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Input label="Título" type="text" name="title" />
                <Select options={categories} label="Categorias" id="cat" name="category_ref" initialValue={categories[0]?.ref['@ref'].id} />
                <div className={styles.valueBox} >
                  <strong>R$</strong>
                  <Input parse={normalizeValue} label="Valor" type="tel" name="value" placeholder="0,00" />
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
                <button type="submit" disabled={submitting}>{!submitting ? 'Confirmar' : 'Aguarde...'}</button>
              </div>
            </form>
          )}
        />
      </section>
    </Modal>
  )
}