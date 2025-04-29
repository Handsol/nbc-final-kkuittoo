'use client';

import { useEffect } from 'react';
import { useToast } from './use-toast';
import { SHARE_TOAST_MESSAGES } from '@/constants/toast-messages.contants';
import { PATH, PROJECT_URL } from '@/constants/path.constants';
import { ID_SLICE } from '@/constants/magic-numbers.constants';
import { IMAGE_ASSETS } from '@/constants/assets.constants';

// 글로벌 타입에 기존 Window 인터페이스에 Kakao 추가
// Kakao에 대한 타입이 공식문서에 없어서 any로 설정
declare global {
  interface Window {
    Kakao: any;
  }
}

export const useKakaoShare = (id: string) => {
  const { toast } = useToast();
  const password = id.slice(ID_SLICE.TEAM);

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY!);
    }
  }, []);

  const handleKakaoShare = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      toast({
        title: SHARE_TOAST_MESSAGES.SDK_LOADING.TITLE,
        description: SHARE_TOAST_MESSAGES.SDK_LOADING.DESCRIPTION,
        variant: 'destructive',
      });
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'kkuitddo | 우리 팀에 가입할래요?',
        description: `팀 비밀번호 : ${password}`,
        imageUrl: `${PROJECT_URL}${IMAGE_ASSETS.SPRITE.PINK}`, // 반드시 https + 공개 이미지
        link: {
          mobileWebUrl: `${PROJECT_URL}${PATH.TEAM}/${id}`,
          webUrl: `${PROJECT_URL}${PATH.TEAM}/${id}`,
        },
      },
      buttons: [
        {
          title: '팀 가입하러 가기',
          link: {
            mobileWebUrl: `${PROJECT_URL}${PATH.TEAM}/${id}`,
            webUrl: `${PROJECT_URL}${PATH.TEAM}/${id}`,
          },
        },
      ],
    });
  };

  return { handleKakaoShare };
};
