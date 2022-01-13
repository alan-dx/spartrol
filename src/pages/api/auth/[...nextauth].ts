import { api as apiClient } from './../../../services/api';
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  session: {
    maxAge: 60 * 60 * 24 * 3, //3 days
  },
  jwt: {//needed to getToken() on ensureAuth works correctly
    secret: process.env.SECRET,
    maxAge: 60 * 60 * 24 * 3
  },
  callbacks: {
    async signIn(user) {

      const { email, id } = user

      try {
        const api = apiClient()
        await api.post('/users', {
          email,
          id
        })
        
        return true
      } catch (error) {
        console.error(error)
        return false
      }

    },
    async session(session, token) {
      return {...session, id: token.sub}
    }
  }
})
