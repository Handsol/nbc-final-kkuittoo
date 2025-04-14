import Text from '@/components/common/Text';
import Title from '@/components/common/Title';
import { LINKBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';
import React from 'react';
import LinkButton from './button/LinkButton';
import { PATH } from '@/constants/path.constants';
import Image from 'next/image';
import { IMAGE_ASSETS } from '@/constants/assets.contants';

const UnauthorizedPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5 bg-sub absolute top-0 left-0 z-50">
      <Image
        src={IMAGE_ASSETS.LOGO.DESKTOP}
        alt="Unauthorized page logo"
        width={300}
        height={200}
      />
      <Title mode={TITLE_MODE.SECTION_TITLE}>로그인이 필요합니다</Title>
      <Text>해당 페이지는 로그인 후 접근할 수 있어요!</Text>

      <LinkButton mode={LINKBUTTON_MODE.COMMON} href={PATH.HOME}>
        로그인 하러가기
      </LinkButton>
    </div>
  );
};

export default UnauthorizedPage;
