import Credencials from "next-auth/providers/credentials"
import { NextAuthConfig } from "next-auth"

import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { LoginSchema } from "./schemas"
import { getUserByEmail } from "./data/user"


export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credencials({
    async authorize(credentials) {
      const validatedFields = await LoginSchema.safeParse(credentials)
      if (validatedFields.success) {
        const { email, password } = validatedFields.data
        const user = await getUserByEmail(email)
        if (!user || !user.password) return null
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (passwordMatch) return user;
        return null
      }
      return null
    }
  })],
} satisfies NextAuthConfig