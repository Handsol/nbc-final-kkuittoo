
import { NextResponse } from 'next/server';
import { HTTP_STATUS } from '@/constants/http-status.constants';

export const errorResponse = (message: string, status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR) => {
  return NextResponse.json({ error: message }, { status });
};
