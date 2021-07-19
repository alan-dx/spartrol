import { api } from './../../../services/api';
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
  callbacks: {
    async redirect() {
      return "/home"
    },
    async signIn(user, account, profile) {

      const { email } = user

      try {
        await api.post('/users', {
          email
        })
        return true
      } catch (error) {
        console.error(error)
        return false
      }

    },
    async jwt(token, user, account, profile, isNewUser) {
      //TALVEZ, UTILIZAR ESTE CALLBACK PARA SETAR O DEAFULT HEADER
      // token.picture = undefined
      return token
    }
  }
})
