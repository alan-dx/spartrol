import NextAuth from 'next-auth'
import { session } from 'next-auth/client'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  callbacks: {
    async redirect() {
      return "/home"
    },
    async session(session) {
      return session
    }
  }
})
