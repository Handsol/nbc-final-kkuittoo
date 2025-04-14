'use client';

import ActionButton from '@/components/common/button/ActionButton';
import LinkButton from '@/components/common/button/LinkButton';
import Text from '@/components/common/Text';
import Title from '@/components/common/Title';
import { IMAGE_ASSETS } from '@/constants/assets.contants';
import {
  ACTIONBUTTON_MODE,
  LINKBUTTON_MODE,
  TITLE_MODE,
} from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import Image from 'next/image';

type GlobalErrorProps = {
  error: Error;
};

const GlobalErrorPage = ({ error }: GlobalErrorProps) => {
  return (
    <article className="w-screen h-screen flex flex-col justify-center items-center gap-5 bg-sub">
      <Image
        src={IMAGE_ASSETS.LOGO.DESKTOP}
        alt="Not-found page logo"
        width={300}
        height={200}
      />
      <section className="flex flex-col gap-1 items-center">
        <Title mode={TITLE_MODE.SECTION_TITLE}>ERROR</Title>
        <Text>문제가 발생했어요. 잠시 후에 다시 도전해볼까요?</Text>
        <br />

        <LinkButton mode={LINKBUTTON_MODE.COMMON} href={PATH.MYPAGE}>
          DASHBOARD로 돌아가기
        </LinkButton>
      </section>
    </article>
  );
};

export default GlobalErrorPage;
