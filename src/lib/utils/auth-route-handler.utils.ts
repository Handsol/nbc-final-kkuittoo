import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { NextResponse } from 'next/server';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { COMMON_ERROR_MESSAGES } from '@/constants/error-messages.constants';

export const checkAuth = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return {
      session: null,
      response: NextResponse.json(
        { error: COMMON_ERROR_MESSAGES.UNAUTHORIZED },
        { status: HTTP_STATUS.FORBIDDEN },
      ),
    };
  }
  return { session, response: null };
};
