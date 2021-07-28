export type Category = {
  ref: {
    id: string
  };
  data: {
    userId: string;
    title: string;
    type: 'gain' | 'spent';
  }
}