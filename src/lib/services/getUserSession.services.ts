'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../utils/auth';

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
