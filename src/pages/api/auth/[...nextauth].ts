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
    async signIn(user) {

      const { email, id } = user

      try {
        await api.post('/users', {
          email,
          id
        }).then(res => console.log(res.data)).catch(err => alert(err))
        
        return true//MOVER PRA DENTRO DO CALL
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
