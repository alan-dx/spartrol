import axios from 'axios'

export const api = axios.create({
  baseURL: `https://spartrol.vercel.app/api`
})