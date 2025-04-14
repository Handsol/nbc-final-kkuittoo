import { NextResponse } from 'next/server';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { COMMON_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { getUserSession } from '../services/getUserSession.services';

export const checkAuth = async () => {
  const session = await getUserSession();
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
