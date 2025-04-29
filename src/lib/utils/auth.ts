import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { USER_VALIDATION } from '@/constants/validation.constants';
import { PATH } from '@/constants/path.constants';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 테스트 계정 로그인 처리
        if (
          credentials.email === 'test@test.com' &&
          credentials.password === 'test'
        ) {
          // 테스트 계정이 없으면 생성
          const testUser = await prisma.user.upsert({
            where: { email: 'test@test.com' },
            update: {},
            create: {
              email: 'test@test.com',
              name: '테스트 계정',
            },
          });

          // 테스트 계정의 Account 생성
          const account = await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: 'credentials',
                providerAccountId: 'test@test.com',
              },
            },
            update: {},
            create: {
              userId: testUser.id,
              type: 'credentials',
              provider: 'credentials',
              providerAccountId: 'test@test.com',
            },
          });

          return {
            id: testUser.id,
            name: testUser.name,
            email: testUser.email,
            image: testUser.image,
          };
        }

        // 일반 계정 로그인 처리
        const account = await prisma.account.findFirst({
          where: {
            provider: 'credentials',
            providerAccountId: credentials.email,
          },
          include: {
            user: true,
          },
        });

        if (account?.user) {
          return {
            id: account.user.id,
            name: account.user.name,
            email: account.user.email,
            image: account.user.image,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
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
    signIn: PATH.DASHBOARD,
  },
};
