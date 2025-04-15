'use server';
import { PATH } from '@/constants/path.constants';
import { revalidatePath } from 'next/cache';

export async function revalidateMyPage() {
  revalidatePath(PATH.MYPAGE);
}
