import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { PATH } from '@/constants/path';

// 구글에서 불러온 닉네임이 10자가 넘지 않도록 잘라주기
const MAX_NICKNAME_LENGTH = 10;

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
        user.name = profile.name.slice(0, MAX_NICKNAME_LENGTH);
      }
      return true;
    },
  },

  pages: {
    signIn: PATH.MYPAGE,
  },
};
