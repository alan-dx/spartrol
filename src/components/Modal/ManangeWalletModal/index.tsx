import { FiSliders } from 'react-icons/fi'
import { Modal } from "..";
import { Input } from '../../Input';
import { v4 as uuid } from 'uuid';

import { Form } from 'react-final-form'
import styles from './styles.module.scss'
import { MoreButton } from '../../MoreButton';
import {Wallet} from '../../../@types/Wallet'
import { WalletListItem } from './WalletListItem';

interface ManageWalletModalProps {
  isOpen: boolean;
  closeModal: () => void,
  updateWallet: (data: any) => void,
  wallets: Wallet[]
}

type FormData = {
  title?: string;
  value?: string;
}

export function ManageWalletModal({isOpen, closeModal, updateWallet, wallets}: ManageWalletModalProps) {

  const handleUpdateWallet = async (values: any) => {

    
    const data: Wallet = {...values, value: Number(values.value.replace(",", ".")), id: uuid()}
    updateWallet(data)
  }

  const formValidation = (values: FormData) => {
    const errors: FormData = {}

    if (!values.title) {
      errors.title = 'Campo obrigatório'
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

  const handleEditWallet = (id: string) => {
    console.log(id)
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} >
      <section className={styles.modalContentContainer}>
        <header className={styles.modalContentContainer__header}>
          <h3 className={styles.modalContentContainer__header__title}>Gerenciar carteiras</h3>
          <FiSliders size={20} color="#8AD7D7" />
        </header>
        <Form 
          onSubmit={handleUpdateWallet}
          validate={formValidation}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <>
              <form onSubmit={handleSubmit} className={styles.modalContentContainer__inputs_box}>
                <Input label="Título" type="text" name="title"/>
                <div className={styles.valueBox} >
                  <strong>R$</strong>
                  <Input parse={normalizeValue} label="Valor" type="tel" name="value" placeholder="0,00" />
                </div>
                <MoreButton type="submit" />
              </form>
              <div className={styles.modalContentContainer__list_wallets_box} >
                <h3 className={styles.modalContentContainer__list_wallets_box__title}>Suas carteiras</h3>
                <div className={styles.modalContentContainer__list_wallets_box__scroll}>
                  {
                    wallets?.map(wallet => (
                      <WalletListItem wallet={wallet} onClick={() => handleEditWallet(wallet.id)} />
                    ))
                  }
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
              </div>
            </>
          )}
        />
      </section>
    </Modal>
  )
}