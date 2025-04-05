import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { PATH } from '@/constants/path';
import { USER_VALIDATION } from '@/constants/validation.constants';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },

    async signIn({ user, profile }) {
      if (profile?.name) {
        user.name = profile.name.slice(0, USER_VALIDATION.NAME.MAX);
      }
      return true;
    },
  },

  pages: {
    signIn: PATH.MYPAGE,
  },
};
