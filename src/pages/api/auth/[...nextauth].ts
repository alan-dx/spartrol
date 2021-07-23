import { api } from './../../../services/api';
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    })
  ],
  session: {
    maxAge: 60 * 60 * 24 * 3, //3 days
  },
  callbacks: {
    async redirect() {
      return "/home"
    },
    async signIn(user) {

      const { email, id } = user

      try {
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
