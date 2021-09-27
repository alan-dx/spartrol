import { Wallet } from "./Wallet";

export type FinancialStatementData = {
  equity?: number,
  wallets?: Wallet[],
  day_spent?: number,
  month_target?: number,
  month_spent?: number,
}