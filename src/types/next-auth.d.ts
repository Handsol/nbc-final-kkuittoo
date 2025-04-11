import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Session 타입 확장하여 user.id 추가
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}
