import { FiMinusCircle } from 'react-icons/fi'
import { Modal } from "..";
import { Input } from '../../Input';
import { Select } from '../../Select';
import { v4 as uuid } from 'uuid'
import { AnimatePresence, motion } from 'framer-motion';

import styles from './styles.module.scss'

import { Form } from 'react-final-form'
import { Category } from '../../../@types/category';
import { TransactionData } from '../../../@types/TransactionData';
import { Wallet } from '../../../@types/Wallet';

interface AddSpentModalProps {
  isOpen: boolean;
  categories: Category[];
  wallets: Wallet[];
  closeModal: () => void;
  createSpent: (statement: TransactionData) => Promise<void>;
  layoutId?: string;
}

type FormData = {
  title?: string;
  category_ref?: string;
  wallet_id?: string;
  value?: string;
}

export function AddSpentModal({
  isOpen, 
  categories, 
  wallets, 
  closeModal, 
  createSpent,
  layoutId
}: AddSpentModalProps) {

  const handleCreateSpent = async (values: any) => {

    let data = {...values, type: "spent", id: uuid()};
    
    data.value = Number(data.value.replace(",", "."))
    
    await createSpent(data)
  }

  const formValidation = (values: FormData) => {
    const errors: FormData = {}

    if (!values.title) {
      errors.title = 'Campo obrigatório'
    }

    if (!values.category_ref) {
      errors.category_ref = 'Selecione uma categoria'
    }

    if (!values.wallet_id) {
      errors.wallet_id = 'Selecione uma carteira'
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
    // <Modal isOpen={isOpen} closeModal={closeModal} layoutId={layoutId} >
    <AnimatePresence>
      {
        isOpen && (
          <>
            <motion.div 
              className={styles.overlay}
              onClick={closeModal}
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.3
                }
              }}
              exit={{
                opacity: 0
              }}
            />
            <div className={styles.modal_content_container}>
              <div className={styles.modal_content_container__wrapper}>
                <motion.section layout layoutId={layoutId} className={styles.modal_content_container__wrapper__content}>
                  <header>
                    <h1>Adicionar despesa</h1>
                    <FiMinusCircle size={20} color="#F03E35" />
                  </header>
                  <Form 
                    onSubmit={handleCreateSpent}
                    validate={formValidation}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                      <form onSubmit={handleSubmit}>
                        <div className={styles.modal_content_container__wrapper__content__inputs_box} >
                          <Input label="Título" type="text" name="title" />
                          <div className={styles.modal_content_container__wrapper__content__inputs_box__selects_box} >
                            <Select options={categories} label="Categoria" id="cat" name="category_ref" initialValue={categories[0]?.ref['@ref'].id} />
                            <Select options={wallets} label="Carteira" id="wal" name="wallet_id" initialValue={wallets[0]?.id} />
                          </div>
                          <div className={styles.modal_content_container__wrapper__content__inputs_box__value} >
                            <strong>R$</strong>
                            <Input parse={normalizeValue} label="Valor" type="tel" name="value" placeholder="0,00" />
                          </div>
                        </div>
                        <div className={styles.modal_content_container__wrapper__content__footer}>
                          <button 
                            onClick={() => {
                              form.reset()
                              closeModal()
                            }}
                            disabled={submitting}
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            disabled={submitting}>{!submitting ? 'Confirmar' : 'Criando...'}
                          </button>
                        </div>
                      </form>
                    )}
                  />
                </motion.section>
              </div>
            </div>
          </>
        )
      }
      
    </AnimatePresence>
  )
}