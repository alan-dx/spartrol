import { FiPlusCircle } from 'react-icons/fi'
import { Modal } from "..";
import { Input } from '../../Input';
import { Select } from '../../Select';

import { Form } from 'react-final-form'
import styles from './styles.module.scss'
import { Category } from '../../../@types/category';
import { TransactionData } from '../../../@types/TransactionData';

interface AddGainModalProps {
  isOpen: boolean;
  closeModal: () => void
}

interface AddGainModalProps {
  isOpen: boolean;
  categories: Category[],
  closeModal: () => void,
  createGain: (statement: TransactionData) => void,
}

type FormData = {
  title?: string;
  category_ref?: string;
  value?: string;
}

export function AddGainModal({isOpen, categories, closeModal, createGain}: AddGainModalProps) {

  const handleCreateGain = async (values: any) => {
    let data = {...values, type: "gain", id: Date.now()};//imutabilty
    
    // if (values.value.indexOf(",") == -1 && values.value.indexOf(".") == -1) {//format: 12
    //   data.value = `${data.value}.00`
    // }

    data.value = Number(data.value.replace(",", "."))
    // data.categories = {title: values.categories, category_ref_ref: categories.find(item => item.data.title === values.categories).ref['@ref'].id}
    // console.log(data)
    createGain(data)
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
                <button type="submit" disabled={submitting} >{!submitting ? 'Confirmar' : 'Aguarde...'}</button>
              </div>
            </form>
          )}
        />
      </section>
    </Modal>
  )
}