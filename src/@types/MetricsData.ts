export type MetricsData = {
  gain_spent: {
    gain: number[],
    spent: number[]
  },
  categories: {
    gain: Array<[string, number][]>,//array with many 2d key-value arrays
    spent: any
  }
}
