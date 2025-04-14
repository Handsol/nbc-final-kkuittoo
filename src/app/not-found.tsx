import LinkButton from '@/components/common/button/LinkButton';
import Text from '@/components/common/Text';
import Title from '@/components/common/Title';
import { IMAGE_ASSETS } from '@/constants/assets.contants';
import { LINKBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import Image from 'next/image';

const NotFoundPage = () => {
  return (
    <article className="w-screen h-screen flex flex-col justify-center items-center gap-5 bg-sub">
      <Image
        src={IMAGE_ASSETS.LOGO.DESKTOP}
        alt="Not-found page logo"
        width={300}
        height={200}
      />
      <article className="flex flex-col gap-1 items-center">
        <Title mode={TITLE_MODE.SECTION_TITLE}>NOT FOUND</Title>
        <Text>어라? 여긴 아무것도 없네요!</Text>
        <LinkButton mode={LINKBUTTON_MODE.COMMON} href={PATH.MYPAGE}>
          DASHBOARD로 돌아가기
        </LinkButton>
      </article>
    </article>
  );
};

export default NotFoundPage;
