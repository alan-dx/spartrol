import { TransactionData } from "./TransactionData";

export type DayHistoric = {
  ref: {
    "@ref": {
      id: string
    }
  };
  data: {
    userId: string;
    historic: TransactionData[]
  };
  ts?: number
}