import { NextResponse } from 'next/server';
import { HTTP_STATUS } from '@/constants/http-status.constants';

export const successResponse = (
  data: unknown,
  status: number = HTTP_STATUS.SUCCESS,
) => {
  return NextResponse.json(data, { status });
};

export const errorResponse = (
  message: string,
  status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
) => {
  return NextResponse.json({ error: message }, { status });
};
