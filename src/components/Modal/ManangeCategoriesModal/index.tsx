import React from 'react';
import styles from './styles.module.scss';

import {FiMinusCircle, FiPlusCircle, FiList} from 'react-icons/fi';
import { Form } from 'react-final-form'
import { AnimatePresence, motion } from 'framer-motion';

import { MoreButton } from '../../MoreButton';
import { Input } from '../../Input';
import { ListCategories } from '../../ListCategories';
import { OptionButton } from '../../OptionButton';

import { Categories } from '../../../@types/Categories';
import { Category } from '../../../@types/category';
import { CreateCategoryFormData } from '../../../@types/CreateCategoryFormData';

interface ManageCategoriesProps {
  isOpen: boolean;
  closeModal: () => void,
  createCategory: (data: any) => Promise<void>,
  updateCategories: (category: Category) => Promise<void>,
  categories: Categories;
  layoutId?: string
}

export function ManageCategoriesModal({
  isOpen,
  closeModal,
  createCategory,
  updateCategories,
  categories,
  layoutId
}: ManageCategoriesProps) {

  const [editMode, setEditMode] = React.useState<Category>({} as Category)

  const handleCreateNewOrEditCategory = async (values: any) => {

    // console.log(walletInEditMode)

    if (!!editMode.ref) {
      const editCategory = {...editMode, data: {//maintain immutability,
        ...editMode.data,//data is also a object
        title: values.title,
        type: values.type
      }}

      await updateCategories(editCategory)
    } else {
      await createCategory(values)
    }

    handleCloseModal()
  }

  const formValidation = (values: CreateCategoryFormData) => {
    const errors: CreateCategoryFormData = {}

    if (!values.title) {
      errors.title = 'A categoria precisa de um nome'
    }

    return errors
  }

  const handleEditMode = (category: Category) => {
    setEditMode(category)
  }

  const handleCancelEditMode = () => {
    setEditMode({} as Category)
  }

  const handleCloseModal = () => {
    setEditMode({} as Category)
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
                    <h3 className={styles.modal_content_container__wrapper__content__header__title}>Gerenciar categorias</h3>
                    <FiList size={20} color="#D8CF5D" />
                  </header>
                  <Form 
                    onSubmit={handleCreateNewOrEditCategory}
                    validate={formValidation}
                    initialValues={editMode.data ? 
                    {
                      title: editMode.data.title,
                      type: editMode.data.type
                    } : {
                      title: "",
                      type: "gain"
                    }}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                      <>
                        <form
                          onSubmit={handleSubmit}
                          className={styles.modal_content_container__wrapper__content__inputs_box}
                        >
                          <Input label="Nova categoria" type="text" name="title" />
                          <div className={styles.modal_content_container__wrapper__content__inputs_box__buttons}>
                            <OptionButton name="type" type="radio" value="gain" label="Ganho" icon={<FiPlusCircle size={20} color="#59D266" />} />
                            <OptionButton name="type" type="radio" value="spent" label="Despesa" icon={<FiMinusCircle size={20} color="#F03E35" />}/>
                            <MoreButton type="submit" disabled={submitting} editMode={!!editMode.data} />
                          </div>
                        </form>
                        <div className={styles.modal_content_container__wrapper__content__list_wallets_box} >
                          <h3 className={styles.modal_content_container__wrapper__content__list_wallets_box__title}>Suas categorias</h3>
                          <div className={styles.modal_content_container__wrapper__content__list_wallets_box__scroll}>
                            <ListCategories 
                              icon={<FiPlusCircle size={15} color="#59D266" />} 
                              title="Ganhos" 
                              data={categories?.gain} 
                              onItemClick={(category) => handleEditMode(category)}
                              editMode={editMode}
                              cancelEditMode={handleCancelEditMode}
                            />
                            <ListCategories 
                              icon={<FiMinusCircle size={15} color="#F03E35" />} 
                              title="Despesas" 
                              data={categories?.spent} 
                              onItemClick={(category) => handleEditMode(category)}
                              cancelEditMode={handleCancelEditMode}
                              editMode={editMode}
                            />
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