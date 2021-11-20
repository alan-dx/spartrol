import { TransactionData } from './TransactionData';

export type HistoricDayMetricsData = {
  userId: string;
  historic: TransactionData[]
}