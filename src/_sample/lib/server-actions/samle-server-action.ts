'use server';

import { prisma } from '@/lib/prisma';

export const sampleServerAction = async () => {
  const res = await prisma.user.findMany();
  return res;
};
