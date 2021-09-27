export type TransactionData = {
  title: string;
  category_ref: string;
  wallet_id: string;
  value: number;
  type: "spent" | "gain";
  id?: number
}