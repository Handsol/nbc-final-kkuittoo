'use client';

import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import { useKakaoShare } from '@/lib/hooks/useKakaoShare';
import { RiKakaoTalkFill } from 'react-icons/ri';

// 글로벌 타입에 기존 Window 인터페이스에 Kakao 추가
// Kakao에 대한 타입이 공식문서에 없어서 any로 설정
declare global {
  interface Window {
    Kakao: any;
  }
}

type TeamLinkShareButtonProps = {
  id: string;
};

const TeamLinkShareButton = ({ id }: TeamLinkShareButtonProps) => {
  const { handleKakaoShare } = useKakaoShare(id);

  return (
    <ActionButton mode={ACTIONBUTTON_MODE.SECONDARY} onClick={handleKakaoShare}>
      <div className="flex gap-2 justify-center items-center">
        <RiKakaoTalkFill className="text-black text-body-xl" />
        카카오 공유하기
      </div>
    </ActionButton>
  );
};

export default TeamLinkShareButton;
