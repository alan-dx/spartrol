import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000/api'
  //Talvez setar o Authorization token no header, vai depender se o http only funcionar corretamente
})