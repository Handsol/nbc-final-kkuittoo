'use client';

import { useSession } from 'next-auth/react';

export const getUserClientSession = () => {
  const session = useSession();

  if (!session) return null;
  return session;
};
