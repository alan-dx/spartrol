import {motion} from 'framer-motion'
import { Form } from 'react-final-form'
import { Input } from '../Input'
import { OptionButton } from '../OptionButton'
import styles from './styles.module.scss'
import {FiPlus, FiMinusCircle, FiPlusCircle} from 'react-icons/fi'

type FormData = {
  title?: string;
  type?: "spent" | "gain";
}

export const AddCategory = () => {

  const handleCreateCategory = async (values: any) => {
    console.log(values)
    //Salvar o valor monetário em type number
  }

  const formValidation = (values: FormData) => {
    const errors: FormData = {}

    if (!values.title) {
      errors.title = 'Nomeie a categoria!'
    }

    return errors
  }

  return (
    <div className={styles.container}>
      <Form
        onSubmit={handleCreateCategory}
        validate={formValidation}
        initialValues={{
          title: "",
          type: "gain"
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className={styles.container__form}>
            <Input label="Nova categoria" type="text" name="title" />
            <div className={styles.container__form__buttons_box} >
              <OptionButton name="type" type="radio" value="gain" label="Ganho" icon={<FiPlusCircle size={20} color="#59D266" />} />
              <OptionButton name="type" type="radio" value="spent" label="Despesa" icon={<FiMinusCircle size={20} color="#F03E35" />}/>
              {/* <OptionButton name="type" value="Despesa" type="button" /> */}
              {/* <button>Ganho</button> */}
              <motion.button whileTap={{ scale: 0.90 }} type="submit" className={styles.container__form__buttons_box__create}>
                <FiPlus size={20} color="#FFF" />
              </motion.button>
            </div>
          </form>
        )}
      />
    </div>
  )
}

