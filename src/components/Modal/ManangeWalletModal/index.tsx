import React from 'react';

import { FiSliders } from 'react-icons/fi'
import { Input } from '../../Input';
import { v4 as uuid } from 'uuid';

import { Form } from 'react-final-form'
import styles from './styles.module.scss'
import { MoreButton } from '../../MoreButton';
import {Wallet} from '../../../@types/Wallet'
import { WalletListItem } from './WalletListItem';
import { AnimatePresence, motion } from 'framer-motion';

interface ManageWalletModalProps {
  isOpen: boolean;
  closeModal: () => void,
  updateWallet: (data: any) => Promise<void>,
  wallets: Wallet[];
  layoutId?: string
}

type FormData = {
  title?: string;
  value?: string;
}

export function ManageWalletModal({
  isOpen,
  closeModal,
  updateWallet,
  wallets,
  layoutId
}: ManageWalletModalProps) {

  const [walletInEditMode, setWalletInEditMode] = React.useState<Wallet>({} as Wallet)
  const [isFetching, setIsFetching] = React.useState(false)

  const handleUpdateWallet = async (values: any) => {

    // console.log(walletInEditMode)
    setIsFetching(true)

    const data: Wallet = {
      ...values,
      value: Number(values.value.replace(",", ".")), 
      id: walletInEditMode.id || uuid()
    }

    await updateWallet(data)
    setWalletInEditMode({} as Wallet)
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
    setWalletInEditMode(wallets.find(wallet => wallet.id === id))
  }

  const handleCancelEditWalletMode = () => {
    setWalletInEditMode({} as Wallet)
  }

  const handleCloseModal = () => {
    setWalletInEditMode({} as Wallet)
    closeModal()
  }

  return (
    <AnimatePresence>
      {
        isOpen && (
          <>
            <motion.div 
              className={styles.overlay}
              onClick={handleCloseModal}
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
            <div className={styles.modal_content_container} >
              <div className={styles.modal_content_container__wrapper}>
                <motion.section layout layoutId={layoutId} className={styles.modal_content_container__wrapper__content}>
                  <header className={styles.modal_content_container__wrapper__content__header}>
                    <h3 className={styles.modal_content_container__wrapper__content__header__title}>Gerenciar carteiras</h3>
                    <FiSliders size={20} color="#8AD7D7" />
                  </header>
                  <Form 
                    onSubmit={handleUpdateWallet}
                    validate={formValidation}
                    initialValues={walletInEditMode.id && {
                      title: walletInEditMode.title,
                      value: String(walletInEditMode.value)
                    }}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                      <>
                        <form
                          onSubmit={handleSubmit}
                          className={styles.modal_content_container__wrapper__content__inputs_box}
                        >
                          <Input
                            label="Título"
                            type="text"
                            name="title"
                          />
                          <div className={styles.valueBox} >
                            <strong>R$</strong>
                            <Input
                              parse={normalizeValue}
                              label="Valor"
                              type="tel"
                              name="value"
                              placeholder="0,00" 
                            />
                          </div>
                          <MoreButton type="submit" disabled={submitting} editMode={!!walletInEditMode.id} />
                        </form>
                        <div className={styles.modal_content_container__wrapper__content__list_wallets_box} >
                          <h3 className={styles.modal_content_container__wrapper__content__list_wallets_box__title}>Suas carteiras</h3>
                          <div className={styles.modal_content_container__wrapper__content__list_wallets_box__scroll}>
                            {
                              wallets?.map(wallet => (
                                <WalletListItem
                                  key={wallet.id}
                                  wallet={wallet}
                                  onClick={() => handleEditWallet(wallet.id)}
                                  editMode={!!(walletInEditMode.id === wallet.id)}
                                  cancelEditMode={handleCancelEditWalletMode}
                                />
                              ))
                            }
                          </div>
                        </div>
                        <div className={styles.modal_content_container__wrapper__content__footer}>
                          <button
                            onClick={handleCloseModal}
                            disabled={submitting}
                          >
                            Cancelar
                          </button>
                        </div>
                      </>
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