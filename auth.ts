import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      if (!existingUser) return false;

      if (!existingUser.email) return false;

      if (!existingUser.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twofactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );
        if (!twofactorConfirmation) return false;
        if (twofactorConfirmation) {
          await db.twoFactorConfirmation.delete({
            where: {
              userId: existingUser.id,
            },
          });
        }
      }

      return true;
    },

    async session({ token, session }) {
      console.log("sessionToken", { token, session });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (token.twofactor && session.user) {
        session.user.twofactor = !!token.twofactor;
      }
      if (token.provider && session.user) {
        session.user.provider = token.provider as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      const account = await getAccountByUserId(token.sub);
      if (account) {
        token.provider = account.provider;
      }
      if (existingUser?.isTwoFactorEnabled) {
        token.twofactor = true;
      }
      if (!existingUser) return token;

      token.role = existingUser.role;
      token.twofactor = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
