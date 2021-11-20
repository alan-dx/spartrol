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

    console.log('update', transaction, old_historic)

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

    // const newHistoric = {
    //   ref: {
    //     "@ref": {
    //       id: '1'
    //     }
    //   },
    //   data: {
    //     userId: '1',
    //     historic: [{
    //       title: 'Teste',
    //       category_ref: "309222678243312196",
    //       wallet_id: "05ae4480-2645-4e9c-b6ba-57cfb604f7e5",
    //       value: 14,
    //       type: "gain",
    //       id: "6ad29288-7329-4cc2-89e8-81b8150a617c"
    //     }]
    //   },
    //   ts: 1637073035030000
    // }

    return newHistoric

  }
}

export {UpdateDayHistoric}