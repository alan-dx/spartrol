export type TransactionData = {
  title: string;
  category_ref: string;
  value: number;
  type: "spent" | "gain";
  id?: number
}