import { PrismaClient } from '@prisma/client';

// PrismaClient는 전역 스코프에서 한 번만 인스턴스화해야 함
// 개발 환경에서 핫 리로딩으로 인한 여러 인스턴스 생성 방지
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
