import axios from 'axios';
import { parseCookies, setCookie } from 'nookies';

// export const api = axios.create({
//   baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:3000/api' : 'https://spartrol.vercel.app/api'
// })

export function api(ctx = undefined) {
  const api = axios.create({
    baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:3000/api' : 'https://spartrol.vercel.app/api'
  })

  let cookie = parseCookies(ctx)

  // api.interceptors.request.use(request => {
  //   console.log()
  //   return request
  // })

  if (!process.browser) {
    //cookies httpOnly are not sent by default on requests made by the next server-side
    //so we need manually add the token in the headers to getToken() on 'ensureAuth' works correctly
    api.defaults.headers.Cookie = `next-auth.session-token=${cookie['next-auth.session-token']}`
  }

  return api
}
