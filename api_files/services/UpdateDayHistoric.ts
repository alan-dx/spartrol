import { query as q } from 'faunadb'
import { fauna } from '../../src/services/faunadb'

import { TransactionData } from "../../src/@types/TransactionData";
import { DayHistoric } from '../../src/@types/DayHistoric';

interface IUpdateDayHistoric {
  id: string;
  transaction: TransactionData,
  old_historic: DayHistoric
}

class UpdateDayHistoric {
  async execute({id, transaction, old_historic}: IUpdateDayHistoric) {

    if (!transaction.title) {
      throw new Error("Transaction title not provided")
    }

    if (!transaction.value) {
      throw new Error("Transaction value not provided")
    }

    if (!transaction.category_ref) {
      throw new Error("Transaction category not provided")
    }

    if (!transaction.type) {
      throw new Error("Transaction type not provided")
    }

    if (!id) {
      throw new Error("User id not provided") 
    }

    const newHistoric = await fauna.query<DayHistoric>(
      q.Update(
        q.Ref(q.Collection("day_historic"), old_historic.ref['@ref'].id),
        {
          data: {
            historic: [...old_historic.data.historic, transaction]
          }
        }
      )
    )

    return newHistoric

  }
}

export {UpdateDayHistoric}