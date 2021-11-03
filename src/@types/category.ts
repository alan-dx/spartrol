export type Category = {
  ref: {
    "@ref": {
      id: string
    }
  };
  data: {
    userId: string;
    title: string;
    type: 'gain' | 'spent';
    month_financial: number;
    month_target: number
  }
}