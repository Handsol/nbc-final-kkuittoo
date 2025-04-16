'use client';

import { PATH } from '@/constants/path.constants';
import Link from 'next/link';
import Title from '../common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';

const ToDashboardButton = () => {
  return (
    <Link href={PATH.MYPAGE}>
      <button className="flex flex-row justify-center items-center text-center w-[250px] h-[55px] rounded-full bg-white gap-[10px]">
        <div className="pt-1">
          <Title mode={TITLE_MODE.SECTION_SUBTITLE}>대시보드로 이동</Title>
        </div>
      </button>
    </Link>
  );
};

export default ToDashboardButton;
