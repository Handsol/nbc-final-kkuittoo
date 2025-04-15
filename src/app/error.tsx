'use client';

import ActionButton from '@/components/common/button/ActionButton';
import LinkButton from '@/components/common/button/LinkButton';
import Text from '@/components/common/Text';
import Title from '@/components/common/Title';
import ErrorPageText from '@/components/loading-error-page/ErrorPageText';
import { IMAGE_ASSETS } from '@/constants/assets.contants';
import {
  ACTIONBUTTON_MODE,
  LINKBUTTON_MODE,
  TITLE_MODE,
} from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import Image from 'next/image';

const GlobalErrorPage = () => {
  const GlobalErrorContents = {
    title: 'ERROR',
    text: '문제가 발생했어요. 잠시 후에 다시 도전해볼까요?',
    href: PATH.MYPAGE,
    linkButtonText: 'DASHBOARD로 돌아가기',
  };
  return (
    <article className="w-screen h-screen flex flex-col justify-center items-center gap-5 bg-sub">
      <Image
        src={IMAGE_ASSETS.LOGO.DESKTOP}
        alt="Not-found page logo"
        width={300}
        height={200}
      />
      <ErrorPageText contents={GlobalErrorContents} />
    </article>
  );
};

export default GlobalErrorPage;
